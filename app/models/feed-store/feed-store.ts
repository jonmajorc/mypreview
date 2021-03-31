import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Alert } from "react-native"
import ImagePicker from "react-native-image-crop-picker"
import { withEnvironment } from "../extensions/with-environment"
import { PostModel } from "../post/post"
import { UserModel } from "../user/user"

/**
 * Model to describe the feed store
 */
export const FeedStoreModel = types
  .model("FeedStore")
  .props({
    user: types.maybe(types.reference(UserModel)),
    posts: types.optional(types.array(PostModel), []),
    users: types.optional(types.array(UserModel), []),
    selectedPost: types.maybe(types.reference(PostModel)),
  })
  .extend(withEnvironment)
  .views((feedStore) => ({
    get userFeed() {
      return feedStore.posts.filter((post) => post.user.name === feedStore.user.name).reverse()
    },
  }))
  .actions((feedStore) => ({
    addPost: flow(function* () {
      try {
        const images = yield ImagePicker.openPicker({
          multiple: true,
        })

        images.forEach((image) => {
          if (feedStore.userFeed.filter((post) => post.id === image.filename).length) {
            return Alert.alert(`${image.filename} is present!`)
          }

          feedStore.posts.push({
            id: `${feedStore.user.id}-${image.filename}`,
            user: feedStore.user.id,
            source: image.sourceURL,
          })
        })
      } catch (error) {}
    }),
    switchUser(userId: string) {
      feedStore.user = feedStore.users.filter((user) => user.id === userId)[0]
    },
    selectPost(postId) {
      feedStore.selectedPost = postId
    },
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type FeedStoreType = Instance<typeof FeedStoreModel>
export interface FeedStore extends FeedStoreType {}
type FeedStoreSnapshotType = SnapshotOut<typeof FeedStoreModel>
export interface FeedStoreSnapshot extends FeedStoreSnapshotType {}
export const createFeedStoreDefaultModel = () => types.optional(FeedStoreModel, {})
