import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class PostsController {
  public async findAll() {
    const posts = await Post.all()
    const postsWithAuthor: any[] = []

    for (const post of posts) {
      const user = await User.find(post.userId)
      const author = `${user?.firstname} ${user?.lastname}`
      const postSerialize = post.serialize()
      postSerialize.author = author
      postsWithAuthor.push(postSerialize)
    }
    return postsWithAuthor
  }

  public async findOne({ request }: HttpContextContract) {
    return await Post.find(request.params().id)
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = auth.user
    if (!user) return

    return await user.related('posts').create({
      title: request.body().title,
      content: request.body().content
    })
  }

  public async update({ auth, request }: HttpContextContract) {
    const postId = request.param('id')
    const post = await Post.findOrFail(postId)    
    
    const user = auth.user
    if (!user || user.id !== post.userId) return

    return await post.merge({ ...request.body() }).save()
  }

  public async delete({ auth, request }: HttpContextContract) {
    const postId = request.param('id')
    const post = await Post.findOrFail(postId)    
    
    const user = auth.user
    if (!user || user.id !== post.userId) return

    return await post.delete()
  }
}
