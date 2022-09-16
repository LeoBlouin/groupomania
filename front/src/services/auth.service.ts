import { post } from './fetcher'

export default class AuthService {
  public async login(email: string, password: string) {
    return await post('/auth/login', { email, password })
  }

  public async register(firstname: string, lastname: string, email: string, password: string) {
    return await post('/auth/register', { firstname, lastname, email, password })
  }

  public async checkIfEmailExists(email: string) {
    return await post('/auth/check-email', { email })
  }
}
