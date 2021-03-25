import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { PostModel } from "../post/post"
import { UserModel } from "../user/user"

/**
 * Model description here for TypeScript hints.
 */
export const FeedStoreModel = types
  .model("FeedStore")
  .props({
    user: types.maybe(types.reference(UserModel)),
    posts: types.optional(types.array(PostModel), []),
    users: types.optional(types.array(UserModel), []),
  })
  .extend(withEnvironment)
  .views((feedStore) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((feedStore) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

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
