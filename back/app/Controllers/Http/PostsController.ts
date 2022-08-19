import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async findAll() {
    return await Post.all()
  }

  public async findOne({ request }: HttpContextContract) {
    return await Post.find(request.params().id)
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = auth.user

    if (!user) return

    const post = new Post()
    post.title = request.body().title
    post.content = request.body().content

    await post.related('authorId').save(user)
  }

  public async update({}: HttpContextContract) {}

  public async delete({}: HttpContextContract) {}
}
