import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'

export const Hashtag = types.model('Hashtag', {
  id: types.identifier,
  name: types.string,
  group: types.optional(types.string, '')
})

export interface IHashtag extends Instance<typeof Hashtag> {} 
export interface IHashtagSnapshotIn extends SnapshotIn<typeof Hashtag> {} 
export interface IHashtagSnapshotOut extends SnapshotOut<typeof Hashtag> {} 