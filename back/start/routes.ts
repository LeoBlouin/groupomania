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

Route.post('auth/login', 'UsersController.login')
Route.post('auth/register', 'UsersController.register')

Route.get('posts', 'PostsController.findAll')
Route.get('posts/:id', 'PostsController.findOne')
Route.post('posts', 'PostsController.store').middleware('auth')
Route.put('posts/:id', 'PostsController.update')
Route.delete('posts/:id', 'PostsController.delete')
