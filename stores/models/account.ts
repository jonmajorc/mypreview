import { types } from 'mobx-state-tree'

export const Account = types.model('Account', {
  id: types.identifier,
  name: types.string,
})