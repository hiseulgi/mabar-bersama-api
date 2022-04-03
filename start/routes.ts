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

// Route.get('/venues', 'VenuesController.index').as('venues.index')
// Route.post('/venues', 'VenuesController.store').as('venues.store')
// Route.get('/venues/:id', 'VenuesController.show').as('venues.show')
// Route.put('/venues/:id', 'VenuesController.update').as('venues.update')
// Route.delete('/venues/:id', 'VenuesController.destroy').as('venues.destroy')

Route.resource('venues', 'VenuesController').apiOnly()
Route.resource('venues.fields', 'FieldsController').apiOnly()

Route.post('/bookings', 'BookingsController.store')
Route.post('/register', 'AuthController.register').as('auth.register')
Route.post('/login', 'AuthController.login').as('auth.login')
