import { test } from '@japa/runner'
import { store, store_validation } from './store.spec'
import { update, update_validation } from './update.spec'
import list from './index.spec'
import show from './show.spec'
import destroy from './delete.spec'

test.group('Roles module', () => {
    list('list data success', 'role'),
    store('store data success', 'role'),
    store_validation('store data validations success', 'role'),
    show('show data success', 'role'),
    update('update data success', 'role')
    update_validation('update data validations success', 'role')
    destroy('delete data success', 'role')
})
