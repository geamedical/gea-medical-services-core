import BaseRepository from "../BaseRepository";
import { response, responseErrors } from "App/helper";
import Event from "@ioc:Adonis/Core/Event";
import User from "App/Models/User";
import Database from "@ioc:Adonis/Lucid/Database";
import AccessServerRequest from "App/Models/Permintaan-akses/AccessServerRequest";
import AccessNasDirectoryRequest from "App/Models/Permintaan-akses/AccessNasDirectoryRequest";
import { string } from '@ioc:Adonis/Core/Helpers'
import Dept from "App/Models/Master-data/Dept";
import FormPermintaanAkses from "App/Models/Permintaan-akses/FormPermintaanAkses";
import Role from "App/Models/Master-data/Role";

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
  }) {
    try {
      const { sortBy, search, sortDesc, page, limit } = req;
      const count = await Database.from("Form_Permintaan_Akses_View").count("* as total");
      const q = await Database.query()
        .from("Form_Permintaan_Akses_View")
        .where(async (query) => {
          query
            .where("type", "LIKE", "%" + search + "%")
            .orWhere("detail", "LIKE", "%" + search + "%")
            .orWhere("notes", "LIKE", "%" + search + "%")
            .orWhere("yg_mengajukan", "LIKE", "%" + search + "%")
        })
        .orderBy([
          {
            column: sortBy !== "" ? sortBy : "id",
            order: sortDesc ? "desc" : "asc",
          },
        ])
        .paginate(page, limit < 5 ? count[0].total : limit);
      return response(200, q);
    } catch (error) {
      return responseErrors(error);
    }
  }
  async storeForm(req: any) {
    try {
      // // const data = {};
      const find_u = await User.query()
        .where((query) => {
          query
            .where("name", req.user.name)
            .andWhere("telp", req.user.telp)
        })
        .first();
      if (req.server.length > 0) {
        // simpan data permintaan akses server
        req.server.forEach(async (e: { id: number; authorization_id: number; }) => {
          const t = new AccessServerRequest();
          t.user_id = find_u!.id
          t.server_id = e.id
          t.authorization_id = e.authorization_id
          t.status = 'w'
          await t.save();
        });
      }
      if (req.directory !== undefined) {
        // simpan data permintaan folder server nas
        req.directory.forEach(async (e) => {
          const t = new AccessNasDirectoryRequest()
          t.user_id = find_u!.id
          t.nas_dir_permission_id = e.id
          t.authorization_primary_id = e.primary_authorization_id
          t.authorization_secondary_id = e.secondary_authorization_id
          await t.save()
        });
      }
      const dataakses: any[] = []
      req.request.forEach(el => {
        dataakses.push({
          user_id: find_u!.id,
          type: el.type,
          detail: el.detail,
          notes: el.notes,
          accept_primary_id: req.user_accepted.accept_primary_id,
          accept_secondary_id: req.user_accepted.accept_secondary_id,
          status_secondary: 'w',
          status_primary: 'w',
          status_feedback: 'w',
          feedback_message: '',
        })
      });
      if (await FormPermintaanAkses.createMany(dataakses)) {
        req['user_target'] = await Dept.query().whereIn('deptname', ['GA', 'IT', 'IT Support', 'IT Programmer']).preload('users')
        req['message'] = `INFORMASI PERMINTAAN AKSES: Seseorang atas nama ${string.capitalCase(req.user.name)} telah melakukan permohonan permintaan dan menunggu konfirmasi anda. Periksa sekarang!`
        Event.emit("notif:permintaan-akses", req);
      }
    } catch (error) {
      return responseErrors(error);
    } finally {
      return response(200, req);
    }
  }

  async setStatus(req) {
    try {
      const q = await FormPermintaanAkses.findOrFail(req.id)
      if (req.column === 'status_primary') {
        if (req.status === 'n') {
          q.status_secondary = req.status
        }
        q.status_primary = req.status
        req['user_target'] = await User.query().where('id', q.user_id)
        req['message'] = `INFORMASI PERMINTAAN AKSES: Salah satu permintaan akses telah mendapatkan penindakan, mungkin salah satunya adalah pengajuan permintaan akses milik anda. Periksa sekarang!`
        Event.emit("notif:permintaan-akses", req);
      }
      if (req.column === 'status_secondary') {
        q.status_secondary = req.status
        req['user_target'] = await User.query().where('id', q.user_id)
        req['message'] = `INFORMASI PERMINTAAN AKSES: Salah satu permintaan akses telah mendapatkan penindakan, mungkin salah satunya adalah pengajuan permintaan akses milik anda. Periksa sekarang!`
        Event.emit("notif:permintaan-akses", req);
      }
      if (req.column === 'status_feedback') {
        q.status_feedback = req.status
        q.feedback_message = req.msg
        req['user_target'] = await User.query().whereIn('id', [q.accept_primary_id, q.accept_secondary_id])
        req['message'] = `INFORMASI PERMINTAAN AKSES: Salah satu permintaan akses telah mendapatkan feedback. Periksa sekarang!`
        Event.emit("notif:permintaan-akses", req);
      }
      await q.save()
    } catch (error) {
      return responseErrors(error);
    } finally {
      return response(200, req);
    }
  }
  async findForm(id: number) {
    const data = {};
    try {
      const u = await User.query()
        .where("id", id)
        .preload("dept")
        .preload("roles")
        .first();
      const f = await FormPermintaanAkses.query().where("user_id", u!.id);
      data["user"] = u;
      const dataReq: any[] = [];
      f.forEach((e) => {
        dataReq.push({
          type: e.type,
          detail: e.detail,
          notes: e.notes,
          status: e.status_primary,
          created_at: e.createdAt,
          updated_at: e.updatedAt,
        });
      });
      data["request"] = dataReq;
    } catch (error) {
      return responseErrors(error);
    } finally {
      return response(200, data);
    }
  }

  async updateForm(id: number, request) {
    const data = {};
    try {
      request.request.forEach(
        async (e: { created_at: string; updated_at: string }) => {
          await FormPermintaanAkses.query()
            .where("user_id", id)
            .andWhere("created_at", e.created_at)
            .andWhere("updated_at", e.updated_at)
            .delete();
        }
      );
      const f = await User.findOrFail(id);
      if (f) {
        const dataakses: any[] = []
        request.request.forEach(el => {
          dataakses.push({
            user_id: f.id,
            type: el.type,
            detail: el.detail,
            notes: el.notes,
            accept_primary_id: request.user_accepted.accept_primary_id,
            accept_secondary_id: request.user_accepted.accept_secondary_id,
            status_secondary: 'w',
            status_primary: 'w',
            status_feedback: 'w',
            feedback_message: '',
          })
        });
        await f.related("formPermintaan").createMany(dataakses);
      }
      data["user"] = request.user;
      data["request"] = request.request;
    } catch (error) {
      return responseErrors(error);
    } finally {
      return response(200, data);
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
          userGa.push(e.users)
      });
      it.forEach(e => {
        if (e.users.length > 0)
          userIt.push(e.users)
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
  async deleteall(user_id) {
    const data = {};
    try {
      await FormPermintaanAkses.query().where('user_id', user_id).delete()
    } catch (error) {
      return responseErrors(error);
    } finally {
      return response(200, data);
    }
  }
}
