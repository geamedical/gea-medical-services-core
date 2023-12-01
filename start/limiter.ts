/*
|--------------------------------------------------------------------------
| Define HTTP rate limiters
|--------------------------------------------------------------------------
|
| The "Limiter.define" method callback receives an instance of the HTTP
| context you can use to customize the allowed requests and duration
| based upon the user of the request.
|
*/

import { Limiter } from '@adonisjs/limiter/build/services'

// export const { httpLimiters } = Limiter.define('global', () => {
//   return Limiter.allowRequests(100).every('1 min')
// })

export const { httpLimiters } = Limiter
  .define('global', function ({ auth }) {
    if (auth.user) {
      return Limiter
        .allowRequests(5000)
        .every('1 min')
        .usingKey(auth.user?.nik)
    }

    // Defaults to IP address
    return Limiter
      .allowRequests(1000)
      .every('1 min')
  })

