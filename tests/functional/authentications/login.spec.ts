import { test } from '@japa/runner'

test.group('Authentication module', () => {
    test('login test', async ({ client }) => {
        const res = await client
            .post('/api/login')
            .form({
                username: 'superadmin',
                password: '1234'
            })
        res.assertStatus(200)
        res.assertBodyContains({
            status: true,
            data: {
                type: 'bearer',
                token: res.body().data.token,
                expires_at: res.body().data.expires_at
            },
            msg: 'login success',
        })
    })

    test('login validation test', async ({ client }) => {
        const res = await client
            .post('/api/login')
            .form({
                username: '',
                password: ''
            })
        res.assertStatus(400)
        res.assertBodyContains({
            status: false,
            data: {
                errors: res.body().data.errors
            },
            msg: 'login error',
        })
    })
})
