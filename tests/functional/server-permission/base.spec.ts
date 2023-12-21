import { test } from '@japa/runner'
import { store, store_validation } from './store.spec'
import { update, update_validation } from './update.spec'
import list from './index.spec'
import show from './show.spec'
import destroy from './delete.spec'

test.group('Server Permission module', () => {
    list('list data success', 'server-permission'),
    store('store data success', 'server-permission'),
    store_validation('store data validations success', 'server-permission'),
    show('show data success', 'server-permission'),
    update('update data success', 'server-permission')
    update_validation('update data validations success', 'server-permission')
    destroy('delete data success', 'server-permission')
})
