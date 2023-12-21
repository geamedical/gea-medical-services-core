import { test } from '@japa/runner'
import { login, login_validation } from './login.spec'
import logout from './logout.spec'
import profile_update from './profile-update.spec'
import profile from './profile.spec'

test.group('Authentications module', () => {
    login(),
    login_validation(),
    profile(),
    profile_update(),
    logout()
})
