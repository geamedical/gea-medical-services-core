import { test } from '@japa/runner'
import { store, store_validation } from './store.spec'
import { update, update_validation } from './update.spec'
import list from './index.spec'
import show from './show.spec'
import destroy from './delete.spec'

test.group('Roles Permission module', () => {
    list('list data success', 'role-permission'),
    store('store data success', 'role-permission'),
    store_validation('store data validations success', 'role-permission')
    show('show data success', 'role-permission'),
    update('update data success', 'role-permission'),
    update_validation('update data validations success', 'role-permission'),
    destroy('delete data success', 'role-permission')
})
