import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class PostsController {
  public async findAll({ auth }: HttpContextContract) {
    const posts = await Post.all()
    const postsResult: any[] = []

    for (const post of posts) {
      const user = await User.find(post.userId)
      const author = `${user?.firstname} ${user?.lastname}`
      const postSerialize = post.serialize()
      postSerialize.author = author
      if (auth.user?.role === 'ADMIN')
        postSerialize.canEditOrDelete = true
      else
        postSerialize.canEditOrDelete = auth.user?.id === post.userId
      postsResult.push(postSerialize)
    }
    return postsResult
  }

  public async findOne({ request }: HttpContextContract) {
    return await Post.find(request.params().id)
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = auth.user
    if (!user) return

    return await user.related('posts').create({
      title: request.body().title,
      content: request.body().content,
      filename: request.body().filename
    })
  }

  public async update({ auth, request }: HttpContextContract) {
    const postId = request.param('id')
    const post = await Post.findOrFail(postId)    
    
    const user = auth.user
    if (!user || (user.id !== post.userId && user.role !== 'ADMIN')) return

    return await post.merge({ ...request.body() }).save()
  }

  public async delete({ auth, request }: HttpContextContract) {
    const postId = request.param('id')
    const post = await Post.findOrFail(postId)    
    
    const user = auth.user
    if (!user || (user.id !== post.userId && user.role !== 'ADMIN')) return

    return await post.delete()
  }

  public async likePost({ auth, request }: HttpContextContract) {
    const postId = request.param('id')
    const post = await Post.findOrFail(postId)

    const user = auth.user
    if (!user) return

    let postLikes = JSON.parse(post?.likes)
    
    if (postLikes.includes(user.id)) {
      postLikes = postLikes.filter(userId => userId !== user.id)
      await post.merge({ likes: JSON.stringify(postLikes) }).save()
      return false
    } else {
      postLikes.push(user.id)
      await post.merge({ likes: JSON.stringify(postLikes) }).save()
      return true
    }
  }

  async checkIfUserLikePost({ auth, request }) {
    const postId = request.param('id')
    const post = await Post.findOrFail(postId)

    const user = auth.user
    if (!user) return

    const postLikes = JSON.parse(post?.likes)
    return postLikes.includes(user.id)
  }
}
