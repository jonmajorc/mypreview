import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const HashtagModel = types
  .model("Hashtag")
  .props({
    name: types.string,
    group: types.optional(types.string, ""),
  })
  .views((hashtag) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((hashtag) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type HashtagType = Instance<typeof HashtagModel>
export interface Hashtag extends HashtagType {}
type HashtagSnapshotType = SnapshotOut<typeof HashtagModel>
export interface HashtagSnapshot extends HashtagSnapshotType {}
export const createHashtagDefaultModel = () => types.optional(HashtagModel, {})
