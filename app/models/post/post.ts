import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AccountModel } from "../account/account"
import { HashtagModel } from "../hashtag/hashtag"
import { UserModel } from "../user/user"

/**
 * Model description here for TypeScript hints.
 */
export const PostModel = types
  .model("Post")
  .props({
    source: types.string,
    caption: types.optional(types.string, ""),
    hashtags: types.optional(types.array(HashtagModel), []),
    tagged: types.optional(types.array(AccountModel), []),
    user: types.reference(UserModel),
  })
  .views((post) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((post) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type PostType = Instance<typeof PostModel>
export interface Post extends PostType {}
type PostSnapshotType = SnapshotOut<typeof PostModel>
export interface PostSnapshot extends PostSnapshotType {}
export const createPostDefaultModel = () => types.optional(PostModel, {})
