import { test } from '@japa/runner'
import list from './index.spec'
import show from './show.spec'
import destroy from './delete.spec'
import { store, store_validation } from './store.spec'
import { update, update_validation } from './update.spec'
import validatepin from './validatepin.spec'
import { setStatus_feedback_approved, setStatus_primary_approved, setStatus_secondary_approved } from './setStatus.spec'
import formset from './formset.spec'

test.group('Form Permintaan module', () => {
    list()
    store()
    store_validation()
    show()
    update()
    update_validation()
    setStatus_primary_approved()
    setStatus_secondary_approved()
    setStatus_feedback_approved()
    formset()
    validatepin()
    destroy()
})
