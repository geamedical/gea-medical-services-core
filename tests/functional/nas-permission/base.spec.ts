import { test } from '@japa/runner'
import { store, store_validation } from './store.spec'
import { update, update_validation } from './update.spec'
import list from './index.spec'
import show from './show.spec'
import destroy from './delete.spec'

test.group('NAS Server Permission module', () => {
    list('list data success', 'nas-permission'),
    store('store data success', 'nas-permission'),
    store_validation('store data validations success', 'nas-permission'),
    show('show data success', 'nas-permission'),
    update('update data success', 'nas-permission')
    update_validation('update data validations success', 'nas-permission')
    destroy('delete data success', 'nas-permission')
})
