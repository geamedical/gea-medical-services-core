import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Role from 'App/Models/Master-data/Role'
import Dept from 'App/Models/Master-data/Dept'
import { DateTime } from 'luxon'

export default Factory.define(User, async ({ faker }) => {
  const roledata: number[] = []
  const getRole = await Role.all()
  getRole.forEach(e => {
    roledata.push(e.id)
  });
  const deptdata: number[] = []
  const getDept = await Dept.all()
  getDept.forEach(e => {
    deptdata.push(e.id)
  });
  const gender = ['Male', 'Female', 'Other']
  const marital = ['Married', 'Unmarried', 'Other']
  return {
    role_id: roledata[Math.floor(Math.random() * roledata.length)],
    dept_id: deptdata[Math.floor(Math.random() * deptdata.length)],
    name: faker.internet.userName(),
    nik: faker.string.numeric({ length: 5 }),
    pin: '1234',
    email: faker.internet.email(),
    username: faker.internet.userName(),
    birthdate: DateTime.local(),
    gender: gender[Math.floor(Math.random() * gender.length)],
    marital: marital[Math.floor(Math.random() * marital.length)],
    npwp: `${faker.string.numeric({ length: 2 })}.${faker.string.numeric({ length: 3 })}.${faker.string.numeric({ length: 3 })}.${faker.string.numeric({ length: 1 })}-${faker.string.numeric({ length: 3 })}.000`,
    noktp: `${faker.string.numeric({ length: 16 })}`,
    address: faker.location.streetAddress(),
    telp: faker.string.numeric({ length: { min: 12, max: 13 } }),
    password: '1234',
    activation: 'invalid',
    islogin: 'n',
  }
}).build()
