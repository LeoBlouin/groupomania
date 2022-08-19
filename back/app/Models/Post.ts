import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => User)
  public authorId: HasOne<typeof User>

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public filename: string | null

  @column()
  public likes: number

  @column()
  public dislikes: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
