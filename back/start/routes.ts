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
Route.post('auth/check-email', 'UsersController.checkIfEmailExists')

Route.get('posts', 'PostsController.findAll').middleware('auth')
Route.get('posts/:id', 'PostsController.findOne').middleware('auth')
Route.post('posts', 'PostsController.store').middleware('auth')
Route.post('posts/like/:id', 'PostsController.likePost').middleware('auth')
Route.post('posts/check-like/:id', 'PostsController.checkIfUserLikePost').middleware('auth')
Route.put('posts/:id', 'PostsController.update').middleware('auth')
Route.delete('posts/:id', 'PostsController.delete').middleware('auth')
