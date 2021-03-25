import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AccountModel = types
  .model("Account")
  .props({
    id: types.identifier,
    name: types.string,
  })
  .views((account) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((account) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type AccountType = Instance<typeof AccountModel>
export interface Account extends AccountType {}
type AccountSnapshotType = SnapshotOut<typeof AccountModel>
export interface AccountSnapshot extends AccountSnapshotType {}
export const createAccountDefaultModel = () => types.optional(AccountModel, {})
