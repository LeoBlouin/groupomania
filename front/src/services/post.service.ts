import { request } from './private-fetcher'

export default class PostService {
  public async getAllPosts() {
    return await request('get', '/posts')
  }
}
