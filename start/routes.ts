/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'
import { ReadDirectory } from 'App/helper';


Route.get('dir', async ({ request }) => {
  return await ReadDirectory(request.input('directory'))
})
Route.group(() => {
  Route.get('images/:folder/:filename', async ({ params, response }) => {
    const folder = params.folder.split("&")
    if (folder.length > 1) {
      const filePath = Application.tmpPath(`uploads/${folder[0]}/${folder[1]}/${params.filename}`)
      return response.attachment(filePath)
    } else {
      const filePath = Application.tmpPath(`uploads/${folder[0]}/${params.filename}`)
      return response.attachment(filePath)
    }
  })
  Route.post("login", "WebApps/AuthController.login");
  Route.post("form-permintaan-nemp", "WebApps/Permintaan-akses/FormReqGasController.store");
  Route.get("attr_form", "WebApps/UsersController.attr_form",);
  Route.group(() => {
    Route.get("profile", "WebApps/AuthController.profile");
    Route.post("profile-update", "WebApps/AuthController.profileUpdate");
    Route.post("logout", "WebApps/AuthController.logout");
    Route.resource("notification", "WebApps/NotificationsController").apiOnly();
    // MASTER DATA::STARTED
    Route.resource("users", "WebApps/Master-data/UsersController").apiOnly();
    Route.resource("role", "WebApps/Master-data/RolesController").apiOnly();
    Route.resource("permission", "WebApps/Master-data/PermissionsController").apiOnly();
    Route.resource("dept", "WebApps/Master-data/DeptsController").apiOnly();
    Route.resource("role-permission", "WebApps/Master-data/SetRolePermissionsController").apiOnly();
    Route.resource("documentation", "WebApps/Master-data/DocumentationsController").apiOnly();
    // MASTER DATA::ENDED

    // PERMISSION::STARTED
    Route.resource("server-permission", "WebApps/Permission/ServerPermissionsController").apiOnly();
    Route.resource("nas-permission", "WebApps/Permission/NasDirPermissionsController").apiOnly();
    // PERMISSION::ENDED

    // PERMINTAAN AKSES::STARTED
    Route.resource("form-permintaan", "WebApps/Permintaan-akses/FormReqGasController").apiOnly();
    Route.post("form-permintaan/validate-pin", "WebApps/Permintaan-akses/FormReqGasController.ValidatePin");
    Route.post("form-permintaan/formset", "WebApps/Permintaan-akses/FormReqGasController.formset");
    Route.resource("permintaan-akses-server", "WebApps/Permintaan-akses/AksesServersController").apiOnly();
    Route.resource("permintaan-akses-folder-nas-server", "WebApps/Permintaan-akses/AksesFolderNasServersController").apiOnly();
    // PERMINTAAN AKSES::ENDED
  }).middleware("auth:api").middleware('throttle:global');
}).prefix("api");
