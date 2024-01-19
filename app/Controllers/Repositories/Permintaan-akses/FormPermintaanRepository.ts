import BaseRepository from "../BaseRepository";
import { findOnArrayByObjectName, response, responseErrors } from "App/helper";
import Event from "@ioc:Adonis/Core/Event";
import User from "App/Models/User";
import Database from "@ioc:Adonis/Lucid/Database";
import AccessServerRequest from "App/Models/Permintaan-akses/AccessServerRequest";
import AccessNasDirectoryRequest from "App/Models/Permintaan-akses/AccessNasDirectoryRequest";
import { string } from '@ioc:Adonis/Core/Helpers'
import Dept from "App/Models/Master-data/Dept";
import FormPermintaanAkses from "App/Models/Permintaan-akses/FormPermintaanAkses";
import Role from "App/Models/Master-data/Role";
import ServerPermission from "App/Models/Permissiion/ServerPermission";
import NasDirPermission from "App/Models/Permissiion/NasDirPermission";
import GroupFormPermintaanAkses from "App/Models/Permintaan-akses/GroupFormPermintaanAkses";

export default class FormPermintaanRepository extends BaseRepository {
  constructor() {
    super(FormPermintaanAkses);
  }
  async paginateData(req: {
    sortBy: string;
    search: string;
    sortDesc: string;
    page: number;
    limit: number;
    start: string;
    finish: string;
  }) {
    try {
      const { sortBy, sortDesc, page, limit, start, finish } = req;
      const count = await Database.from("group_form_permintaan_akses").count("* as total");
      const qstart = await Database.rawQuery('select MIN(created_at) as created_at from group_form_permintaan_akses limit 1')
      const qfinish = await Database.rawQuery('select MAX(created_at) as created_at from group_form_permintaan_akses limit 1')
      const q = await GroupFormPermintaanAkses.query()
        .whereBetween('created_at', [
          start !== '' ? start : qstart[0][0].created_at,
          finish !== '' ? finish : qfinish[0][0].created_at,
        ])
        .orderBy([
          {
            column: sortBy !== "" ? sortBy : "id",
            order: sortDesc ? "desc" : "asc",
          },
        ])
        .preload('child_permintaan')
        .paginate(page, limit < 5 ? count[0].total : limit);
      return response(200, q);
    } catch (error) {
      return responseErrors(error);
    }
  }
  async storeForm(req: any) {
    try {
      const find_u = await User.query()
        .where((query) => {
          query
            .where("name", req.user.name)
            .andWhere("telp", req.user.telp)
        })
        .first();

      const parents = new GroupFormPermintaanAkses()
      parents.status_finish = 'w'
      const paren_save = await parents.save()
      if (paren_save) {
        req.request.forEach(async input => {
          const t1 = await parents.related('child_permintaan').create({
            user_id: find_u!.id,
            type: input.type,
            detail: input.detail,
            notes: input.notes,
            accept_primary_id: req.user_accepted.accept_primary_id,
            accept_secondary_id: req.user_accepted.accept_secondary_id,
            status_secondary: 'w',
            status_primary: 'w',
            status_feedback: 'w',
            feedback_message: '',
          })
          if (input.type === 'akses-server' && req.server.length > 0) {
            const cariServerNas = await ServerPermission.query().where('server', 'LIKE', '%Nas%').first()
            function findObjectByProperty(array, propertyName, propertyValue) {
              return array.find(obj => obj[propertyName] === propertyValue);
            }
            const foundObject = findObjectByProperty(req.server, 'server', cariServerNas!.server);
            if (foundObject && req.directory !== undefined) {
              // simpan data permintaan folder server nas
              req.directory.forEach(async (e) => {
                const t = new AccessNasDirectoryRequest()
                t.form_permintaan_akses_id = t1.id
                t.user_id = find_u!.id
                t.nas_dir_permission_id = e.id
                t.authorization_primary_id = e.primary_authorization_id
                t.authorization_secondary_id = e.secondary_authorization_id
                t.read = e.read
                t.write = e.write
                await t.save()
              });
            }
            req.server.forEach(async (e: { id: number; authorization_id: number; }) => {
              const t = new AccessServerRequest();
              t.user_id = find_u!.id
              t.form_permintaan_akses_id = t1.id
              t.server_id = e.id
              t.authorization_id = e.authorization_id
              t.status = 'w'
              await t.save();
            });
          }
        });
      }
    } catch (error) {
      return responseErrors(error);
    } finally {
      req['user_target'] = await Dept.query().whereIn('deptname', ['HRGA', 'GA', 'IT', 'IT Support']).preload('users')
      req['message'] = `INFORMASI PERMINTAAN AKSES: Seseorang atas nama ${string.capitalCase(req.user.name)} telah melakukan permohonan permintaan dan menunggu konfirmasi anda. Periksa sekarang!`
      Event.emit("notif:permintaan-akses", req);
      return response(200, req);
    }
  }

  async setStatus(req, auth) {
    try {
      const q = await FormPermintaanAkses.query().where('id', req.id).first()
      function findObjectByProperty(array, propertyName, propertyValue) {
        return array.find(obj => obj[propertyName] === propertyValue);
      }
      if (q?.type === 'akses-server') {
        const server = await AccessServerRequest.query().where('form_permintaan_akses_id', q!.id)
        const cariServerNas = await ServerPermission.query().where('server', 'LIKE', '%Nas%').first()
        const foundObject = findObjectByProperty(server, 'server_id', cariServerNas!.id);
        if (foundObject) {
          if (foundObject.status === 'y') {
            const cekPermintaanFolderNas = await AccessNasDirectoryRequest.query().where('user_id', q.user_id)
            const arrFolder: any[] = []
            cekPermintaanFolderNas.forEach(e => {
              arrFolder.push({ status: e.status })
            });
            const filteredObjects = arrFolder.filter(obj => obj['status'] === 'y');
            if (arrFolder.length === filteredObjects.length) {
              const cekAksesServer = await AccessServerRequest.query().where('user_id', q.user_id)
              const arrsrv: any[] = []
              cekAksesServer.forEach(e => {
                arrsrv.push({ status: e.status })
              });
              const countSvrOk = arrsrv.filter(obj => obj['status'] === 'y');
              if (arrsrv.length === countSvrOk.length) {
                return await this.execStatus(req, auth)
              } else {
                return response(400, `Permintaan akses server anda belum semua disetujui, silahkan konfirmasi pada yang bersangkutan!`);
              }
            } else {
              return response(400, `Permintaan akses folder pada server nas anda belum semua disetujui, silahkan konfirmasi pada yang bersangkutan!`);
            }
          } else {
            return response(400, `Permintaan akses server Nas anda ${foundObject.status === 'n' ? 'ditolak' : 'masih menunggu proses'}`);
          }
        } else {
          const cariServerSelainNas = await ServerPermission.query().whereNot('server', 'Server Nas')
          const arrserver: any[] = []
          cariServerSelainNas.forEach(e => {
            arrserver.push(e.id)
          });
          const cekAksesServer = await AccessServerRequest.query().whereIn('server_id', arrserver)
          const arrSrv: any[] = []
          cekAksesServer.forEach(e => {
            arrSrv.push({ status: e.status })
          });
          const filteredObjects = arrSrv.filter(obj => obj['status'] === 'y');
          if (filteredObjects.length === arrSrv.length) {
            return await this.execStatus(req, auth)
          } else {
            return response(400, `Permintaan akses server anda belum semua disetujui, silahkan konfirmasi pada yang bersangkutan!`);
          }
        }
      } else {
        return await this.execStatus(req, auth)
      }
    } catch (error) {
      return responseErrors(error)
    }
  }
  async execStatus(req, auth) {
    try {
      const q = await FormPermintaanAkses.query().where('id', req.id).preload('user').first()
      if (q) {
        if (req.column === 'status_primary') {
          if (req.status === 'n') {
            q.status_secondary = req.status
          }
          q.status_primary = req.status
          req['user_target'] = await User.query().where('id', q.user_id)
          req['message'] = `INFORMASI PERMINTAAN AKSES: Permintaan akses An. ${q.user.name}-${q.user.nik} telah mendapatkan penindakan persetujuan. Periksa sekarang!`
          Event.emit("notif:permintaan-akses", req);
        }
        if (req.column === 'status_secondary') {
          q.status_secondary = req.status
          req['user_target'] = await User.query().where('id', q.user_id)
          req['message'] = `INFORMASI PERMINTAAN AKSES: Permintaan akses An. ${q.user.name}-${q.user.nik} telah mendapatkan penindakan proses. Periksa sekarang!`
          Event.emit("notif:permintaan-akses", req);
        }
        if (req.column === 'status_feedback') {
          q.status_feedback = req.status
          q.feedback_message = req.msg
          req['user_target'] = await User.query().whereIn('id', [q.accept_primary_id, q.accept_secondary_id])
          req['message'] = `INFORMASI PERMINTAAN AKSES: Permintaan akses An. ${q.user.name}-${q.user.nik} telah mendapatkan feedback. Periksa sekarang!`
          Event.emit("notif:permintaan-akses", req);
        }
        q.user_last_exec = auth.id
        await q.save()
        const cek = await Database
          .from('form_permintaan_akses')
          .where('group_form_permintaan_akses_id', q!.group_form_permintaan_akses_id)
          .count('* as total')
        const cekstatus = await Database
          .from('form_permintaan_akses')
          .where('group_form_permintaan_akses_id', q!.group_form_permintaan_akses_id)
          .andWhere((q) => {
            q
              .where('status_secondary', 'y')
              .orWhere('status_secondary', 'n')
          })
          .count('* as total')
        if (cek[0].total === cekstatus[0].total) {
          const parent = await GroupFormPermintaanAkses.findOrFail(q!.group_form_permintaan_akses_id)
          parent.status_finish = 'y'
          await parent.save()
        }
        return response(200, req);
      }
      return response(404, req);
    } catch (error) {
      return responseErrors(error)
    }
  }
  async findForm(id: number) {
    const data = {};
    try {
      data['directory'] = []
      data['server'] = []
      data['request'] = []
      data['user'] = []
      data['user_accepted'] = []
      const find = await GroupFormPermintaanAkses
        .query()
        .where('id', id)
        .preload('child_permintaan')
        .first()
      find!.child_permintaan.forEach(el => {
        data['request'].push({
          type: el.type,
          detail: el.detail,
          notes: el.notes,
          status: el.status_primary,
        });
      });
      const fdir = findOnArrayByObjectName(find!.child_permintaan, 'type', 'akses-server')
      if (fdir) {
        fdir.akses_server_nas_folder.forEach(async dir => {
          data['directory'].push({
            "id": dir.nas_detail.id,
            "primary_authorization_id": dir.authorization_primary_id,
            "secondary_authorization_id": dir.authorization_secondary_id,
            "dirname": dir.nas_detail.dirname,
            "read": dir.read,
            "write": dir.write,
            "created_at": dir.nas_detail.createdAt,
            "updated_at": dir.nas_detail.updatedAt,
          })
        });
        fdir.akses_server.forEach(srv => {
          data['server'].push({
            "id": srv.server_detail.id,
            "authorization_id": srv.server_detail.authorization_id,
            "server": srv.server_detail.server,
            "created_at": srv.server_detail.createdAt,
            "updated_at": srv.server_detail.updatedAt,
          })
        })
      }
      data["user"] = {
        "id": find!.child_permintaan[0].user.id,
        "name": find!.child_permintaan[0].user.name,
        "telp": find!.child_permintaan[0].user.telp,
        "role_id": find!.child_permintaan[0].user.role_id,
        "dept_id": find!.child_permintaan[0].user.dept_id
      };
      data["user_accepted"] = {
        "accept_primary_id": find!.child_permintaan[0].accept_primary_id,
        "accept_secondary_id": find!.child_permintaan[0].accept_secondary_id
      };
    } catch (error) {
      return responseErrors(error);
    } finally {
      return response(200, data);
    }
  }

  async updateForm(id: number, req) {
    try {
      const cekServer = await FormPermintaanAkses.query()
        .where("group_form_permintaan_akses_id", id)
        .andWhere('type', 'akses-server')
      cekServer.forEach(async e => {
        await AccessNasDirectoryRequest.query()
          .where("form_permintaan_akses_id", e.id)
          .delete()
        await AccessServerRequest.query()
          .where("form_permintaan_akses_id", e.id)
          .delete()
      });
      const parent = await FormPermintaanAkses.query()
        .where("group_form_permintaan_akses_id", id)
        .delete()
      if (parent) {
        const find_u = await User.query()
          .where((query) => {
            query
              .where("name", req.user.name)
              .andWhere("telp", req.user.telp)
          })
          .first();
        const parents = await GroupFormPermintaanAkses.findOrFail(id)
        if (parents) {
          req.request.forEach(async input => {
            const t1 = await parents.related('child_permintaan').create({
              user_id: find_u!.id,
              type: input.type,
              detail: input.detail,
              notes: input.notes,
              accept_primary_id: req.user_accepted.accept_primary_id,
              accept_secondary_id: req.user_accepted.accept_secondary_id,
              status_secondary: 'w',
              status_primary: 'w',
              status_feedback: 'w',
              feedback_message: '',
            })
            if (input.type === 'akses-server' && req.server.length > 0) {
              const cariServerNas = await ServerPermission.query().where('server', 'LIKE', '%Nas%').first()
              function findObjectByProperty(array, propertyName, propertyValue) {
                return array.find(obj => obj[propertyName] === propertyValue);
              }
              const foundObject = findObjectByProperty(req.server, 'server', cariServerNas!.server);
              if (foundObject && req.directory !== undefined) {
                // simpan data permintaan folder server nas
                req.directory.forEach(async (e) => {
                  const t = new AccessNasDirectoryRequest()
                  t.form_permintaan_akses_id = t1.id
                  t.user_id = find_u!.id
                  t.nas_dir_permission_id = e.id
                  t.authorization_primary_id = e.primary_authorization_id
                  t.authorization_secondary_id = e.secondary_authorization_id
                  t.read = e.read
                  t.write = e.write
                  await t.save()
                });
              }
              req.server.forEach(async (e: { id: number; authorization_id: number; }) => {
                const t = new AccessServerRequest();
                t.user_id = find_u!.id
                t.form_permintaan_akses_id = t1.id
                t.server_id = e.id
                t.authorization_id = e.authorization_id
                t.status = 'w'
                await t.save();
              });
            }
          });
          return response(200, req);
        }
        return response(404, 'data not found');
      }
      return response(500, 'terjadi kesalahan saat menghapus');
    } catch (error) {
      console.log(error);

      return responseErrors(error);
    }
  }

  async validatePin(request) {
    const data = {};
    try {
      const input = request.pin;
      const u = await Database.from("users")
        .where("username", "!=", input["username"])
        .andWhere("pin", input["pin"])
        .andWhere("activation", "valid")
        .count("* as total");
      data["total"] = u[0].total;
    } catch (error) {
      return responseErrors(error);
    } finally {
      return response(200, data);
    }
  }
  async attrForm(user) {
    const data = {};
    try {
      const q = await User.query().where('dept_id', user.dept_id)
      const ga = await Dept.query().whereIn('deptname', ['GA', 'HRGA', 'HR']).preload('users')
      const it = await Dept.query().whereIn('deptname', ['IT', 'IT Programer', 'IT Support']).preload('users')
      const userGa: any[] = []
      const userIt: any[] = []
      ga.forEach(e => {
        if (e.users.length > 0)
          e.users.forEach(el => {
            userGa.push(el)
          });
      });
      it.forEach(e => {
        if (e.users.length > 0)
          e.users.forEach(el => {
            userIt.push(el)
          });
      });
      const role = await Role.all()
      const dept = await Dept.all()
      data['user'] = q
      data['userGa'] = userGa
      data['userIt'] = userIt
      data['role'] = role
      data['dept'] = dept
    } catch (error) {
      return responseErrors(error);
    } finally {
      return response(200, data);
    }
  }
  async deleteall(id) {
    const data = {};
    try {
      const del = await GroupFormPermintaanAkses.query().where('id', id).andWhere('status_finish', 'w').first()
      if (del) {
        await del.delete()
      }
      data['detail'] = del
    } catch (error) {
      return responseErrors(error);
    } finally {
      return response(200, data);
    }
  }
  async getSrvPermission() {
    try {
      const q = await ServerPermission.all()
      return response(200, q);
    } catch (error) {
      return responseErrors(error);
    }
  }
  async getDirPermission() {
    try {
      const q = await NasDirPermission.all()
      return response(200, q);
    } catch (error) {
      return responseErrors(error);
    }
  }
}
