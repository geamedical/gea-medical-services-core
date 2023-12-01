import Event from '@ioc:Adonis/Core/Event'

Event.on('auth-login:user', 'User.authLoginUser')
Event.on('auth-logout:user', 'User.authLogoutUser')
Event.on('form:permintaan', 'FormPermintaan.store')
Event.on('form:permintaan:setstatus', 'FormPermintaan.setstatus')
