import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { AccountModel } from "../account/account"
import { HashtagModel } from "../hashtag/hashtag"
import { UserModel } from "../user/user"

/**
 * Model description here for TypeScript hints.
 */
export const PostModel = types
  .model("Post")
  .props({
    id: types.identifier,
    source: types.string,
    caption: types.optional(types.string, ""),
    hashtags: types.optional(types.array(HashtagModel), []),
    tagged: types.optional(types.array(AccountModel), []),
    user: types.reference(UserModel),
  })
  .views((post) => ({
    get hashtagsStr() {
      return post.hashtags.join(" ")
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((post) => ({
    onChangeCaption(value) {
      post.caption = value
    },
    onChangeHashtags(value) {
      const hashtag = !value.startsWith("#") ? `#${value}` : value
      if (post.hashtags.find((tag) => tag.name === hashtag)) {
        return Alert.alert(`Hashtag "${hashtag}" is already there!`)
      }
      post.hashtags.push({ name: hashtag })
    },
    onRemovePreviousHashtag() {
      post.hashtags.pop()
    },
    onRemoveHashTag(hashtag) {
      post.hashtags.remove(hashtag)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

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
