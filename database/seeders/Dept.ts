import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dept from 'App/Models/Master-data/Dept'

export default class DeptSeeder extends BaseSeeder {
  public async run() {
    const datadepartements = [
      {
        company: "RMP",
        code: '1',
        deptname: "BOD Management"
      },
      {
        company: "RMP",
        code: '2',
        deptname: "Sales and Marketing"
      },
      {
        company: "RMP",
        code: '3',
        deptname: "HRGA"
      },
      {
        company: "RMP",
        code: '4',
        deptname: "HR"
      },
      {
        company: "RMP",
        code: '5',
        deptname: "GA"
      },
      {
        company: "RMP",
        code: '6',
        deptname: "Internal Audit"
      },
      {
        company: "RMP",
        code: '7',
        deptname: "Admin Sales"
      },
      {
        company: "RMP",
        code: '8',
        deptname: "Admin Pajak"
      },
      {
        company: "RMP",
        code: '9',
        deptname: "Purchasing Lokal"
      },
      {
        company: "RMP",
        code: '10',
        deptname: "Purchasing Import"
      },
      {
        company: "RMP",
        code: '11',
        deptname: "Import"
      },
      {
        company: "RMP",
        code: '12',
        deptname: "Accounting & Pajak"
      },
      {
        company: "RMP",
        code: '13',
        deptname: "Accounting"
      },
      {
        company: "RMP",
        code: '14',
        deptname: "Pajak"
      },
      {
        company: "RMP",
        code: '15',
        deptname: "Finance AP"
      },
      {
        company: "RMP",
        code: '16',
        deptname: "Finance AR"
      },
      {
        company: "RMP",
        code: '17',
        deptname: "Marketing Komunikasi"
      },
      {
        company: "RMP",
        code: '18',
        deptname: "Design Grafis"
      },
      {
        company: "RMP",
        code: '19',
        deptname: "Research and Development"
      },
      {
        company: "RMP",
        code: "GD",
        deptname: "Gudang B1 CBC"
      },
      {
        company: "RMP",
        code: "WH",
        deptname: "Warehouse Cikupa"
      },
      {
        company: "RMP",
        code: '20',
        deptname: "Legal, Compliance & Regulatory"
      },
      {
        company: "RMP",
        code: '21',
        deptname: "Legal"
      },
      {
        company: "RMP",
        code: '22',
        deptname: "Compliance"
      },
      {
        company: "RMP",
        code: '23',
        deptname: "Regulatory"
      },
      {
        company: "RMP",
        code: '24',
        deptname: "Service Centre Pluit"
      },
      {
        company: "RMP",
        code: '25',
        deptname: "IT"
      },
      {
        company: "RMP",
        code: '26',
        deptname: "IT Support"
      },
      {
        company: "RMP",
        code: '27',
        deptname: "IT Programmer"
      },
      {
        company: "RMP",
        code: '28',
        deptname: "Secretary"
      },
      {
        company: "RMP",
        code: '29',
        deptname: "Sosial Media"
      },
      {
        company: "RMP",
        code: '30',
        deptname: "Autocheck"
      },
      {
        company: "RMP",
        code: '31',
        deptname: "Progress"
      },
      {
        company: "MPM",
        code: '33',
        deptname: "Operational"
      },
      {
        company: "MPM",
        code: '32',
        deptname: "Teknik"
      },
      {
        company: "MPM",
        code: '34',
        deptname: "Warehouse AMPM"
      },
      {
        company: "RMP",
        code: "POS",
        deptname: "position"
      },
      {
        company: "RMP",
        code: '35',
        deptname: "PT KAS"
      },
      {
        company: "RMP",
        code: '36',
        deptname: "PT MUKTI"
      }
    ]
    await Dept.createMany(datadepartements)
  }
}
