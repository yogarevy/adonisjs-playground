'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
}).middleware(['auth'])

//Authentication
Route.group(() => {
  Route.post('auth/register', 'AuthController.register').as('register').validator('RegisterValidation')
  Route.post('auth/login', 'AuthController.login').as('login').validator('LoginValidation')
}).prefix('api/v1').namespace('Api')

//Users
Route.group(() => {
  Route.get('users', 'Api/UserController.index').as('users.index')
  Route.get('users/show/:id', 'Api/UserController.show').as('users.show')
  Route.post('users/update/:id', 'Api/UserController.update').as('users.update').validator('UserUpdateValidation')
  Route.delete('users/delete/:id', 'Api/UserController.destroy').as('users.destroy')
}).prefix('api/v1').middleware(['auth'])

//Shopping
Route.group(() => {
  Route.get('shoppings', 'Api/ShoppingController.index').as('shoppings.index')
  Route.get('shoppings/show/:id', 'Api/ShoppingController.show').as('shoppings.show')
  Route.post('shoppings/create', 'Api/ShoppingController.store').as('shoppings.store').validator('ShoppingStoreValidation')
  Route.post('shoppings/update/:id', 'Api/ShoppingController.update').as('shoppings.update').validator('ShoppingUpdateValidation')
  Route.delete('shoppings/delete/:id', 'Api/ShoppingController.destroy').as('shoppings.destroy')
}).prefix('api/v1').middleware(['auth'])
