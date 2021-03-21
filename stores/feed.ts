import { types, flow } from 'mobx-state-tree'
import { Post, User } from './models' 
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as ImagePickerTypes from 'expo-image-picker/src/ImagePicker.types'

export const FeedStore = types.model('FeedStore', {
  user: types.maybe(types.reference(User)),
  users: types.optional(types.array(User), []),
  posts: types.optional(types.array(Post), []),
}).views((feedStore) => ({
  get userFeed() {
    return feedStore.posts.filter(post => post.user.name === feedStore.user.name)
  }
})).actions((feedStore) => ({
  addPost: flow(function* () {
    let permissionResult = yield ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) return Alert.alert('Go into settings to enable gallery permissions')
    
    let { cancelled, uri}: ImagePicker.ImagePickerResult & ImagePickerTypes.ImageInfo = yield ImagePicker.launchImageLibraryAsync()
    if (cancelled) return
    feedStore.posts.push({ id: '0', user: feedStore.user.id, source: uri}) 
  }),
  switchUser(userId: string) {
    feedStore.user = feedStore.users.filter(user => user.id === userId)[0]
  }
}))
