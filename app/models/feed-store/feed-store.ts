import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
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
  })
  .extend(withEnvironment)
  .views((feedStore) => ({
    get userFeed() {
      return feedStore.posts.filter((post) => post.user.name === feedStore.user.name)
    },
  }))
  .actions((feedStore) => ({
    addPost: flow(function* () {
      const images = yield ImagePicker.openPicker({
        multiple: true,
      })

      images.map((image) =>
        feedStore.posts.push({ user: feedStore.user.id, source: image.sourceURL }),
      )
    }),
    switchUser(userId: string) {
      feedStore.user = feedStore.users.filter((user) => user.id === userId)[0]
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
