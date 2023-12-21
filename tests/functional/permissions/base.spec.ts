import { test } from '@japa/runner'
import list from './index.spec'
import show from './show.spec'
import destroy from './delete.spec'
import { store, store_validation } from './store.spec'
import { update, update_validation } from './update.spec'

test.group('Permission module', () => {
    list(),
        store(),
        store_validation(),
        show(),
        update(),
        update_validation(),
        destroy()
})
