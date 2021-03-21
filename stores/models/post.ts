import { types, Instance, SnapshotIn, SnapshotOut, flow } from 'mobx-state-tree'
import { Hashtag } from './hashtag'
import { Account} from './account'
import { User} from './user'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

export const Post = types.model('Post', {
  id: types.identifier,
  source: types.string,
  caption: types.optional(types.string, ''),
  hashtags: types.optional(types.array(Hashtag), []),
  tagged: types.optional(types.array(Account), []),
  user: types.reference(User)
}).actions((post) => ({
  updateSource: flow(function* () {
    let permissionResult = yield ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) return Alert.alert('Go into settings to enable gallery permissions')
    

    let pickerResult = yield ImagePicker.launchImageLibraryAsync()
    post.source = pickerResult.uri
  }),
}))

export interface IPost extends Instance<typeof Post> {} 
export interface IPostSnapshotIn extends SnapshotIn<typeof Post> {} 
export interface IPostSnapshotOut extends SnapshotOut<typeof Post> {} 