import { types } from 'mobx-state-tree'
import { Post, User } from './models' 

export const FeedStore = types.model('FeedStore', {
  posts: types.optional(types.array(Post), []),
})
