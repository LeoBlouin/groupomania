import { request } from './private-fetcher'

export default class PostService {
  public async getAllPosts() {
    return await request('get', '/posts')
  }

  public async likePost(postId: number): Promise<boolean> {
    return await request('post', '/posts/like/' + postId.toString())
  }

  public async checkLike(postId: number): Promise<boolean> {
    return await request('post', '/posts/check-like/' + postId.toString())
  }

  public async addNewPost(post: { title: string; content: string; filename: string }) {
    return await request('post', '/posts', { ...post })
  }

  public async deletePost(postId: number) {
    return await request('delete', '/posts/' + postId.toString())
  }

  public async editPost(
    postId: number,
    post: { title: string; content: string; filename: string },
  ) {
    return await request('put', '/posts/' + postId.toString(), { ...post })
  }
}
