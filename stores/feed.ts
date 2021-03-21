import { types, flow } from 'mobx-state-tree'
import { Post, User } from './models' 
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export const FeedStore = types.model('FeedStore', {
  user: types.optional(types.reference(User), 0),
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
    

    let pickerResult = yield ImagePicker.launchImageLibraryAsync()
    feedStore.posts.push({ id: '0', user: 0, source: pickerResult.uri}) 
  })
}))
