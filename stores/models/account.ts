import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'

export const Account = types.model('Account', {
  id: types.identifier,
  name: types.string,
})

export interface IAccount extends Instance<typeof Account> {} 
export interface IAccountSnapshotIn extends SnapshotIn<typeof Account> {} 
export interface IAccountSnapshotOut extends SnapshotOut<typeof Account> {} 