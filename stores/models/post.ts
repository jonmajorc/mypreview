import { types } from 'mobx-state-tree'
import { Hashtag } from './hashtag'
import { Account} from './account'
import { User} from './user'

export const Post = types.model('Post', {
  id: types.identifier,
  source: types.string,
  caption: types.optional(types.string, ''),
  hashtags: types.optional(types.array(Hashtag), []),
  tagged: types.optional(types.array(Account), []),
  user: User
})