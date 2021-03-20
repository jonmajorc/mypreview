import { types } from 'mobx-state-tree'

export const Hashtag = types.model('Hashtag', {
  id: types.identifier,
  name: types.string,
  group: types.optional(types.string, '')
})