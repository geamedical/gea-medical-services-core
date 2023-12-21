import { test } from '@japa/runner'
import update from './update.spec'
import list from './index.spec'
import show from './show.spec'
import destroy from './delete.spec'

test.group('Permintaan akses server module', () => {
    list('list data success', 'permintaan-akses-server')
    show('show data success', 'permintaan-akses-server')
    update('update data success', 'permintaan-akses-server')
    destroy('delete data success', 'permintaan-akses-server')
})
