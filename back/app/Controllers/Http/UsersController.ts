import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async login({ auth, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    return await auth.use('api').attempt(email, password)
  }

  public async register({ request }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)
    return await User.create(payload)
  }

  public async checkIfEmailExists({ request }: HttpContextContract) {
    const email = request.input('email')
    const user = await User.findBy('email', email)
    if (user) return true
    else return false
  }
}
