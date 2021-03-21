import React from 'react'
import { createContext, useContext } from 'react'
import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * stores import
 */
import { FeedStore } from './feed'

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  feedStore: types.optional(FeedStore, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

/**
 * Create a context we can use to
 * - Provide access to our stores from our root component
 * - Consume stores in our screens (or other components, though it's
 *   preferable to just connect screens)
 */
const RootStoreContext = createContext<RootStore>({} as RootStore)

/**
 * The provider our root component will use to expose the root store
 */
export const RootStoreProvider = ({ children }) => {
  const [rootStore] = React.useState<RootStore | undefined>(() =>
    RootStoreModel.create({
      feedStore: feedStoreData,
    })
  )

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  )
}

/**
 * A hook that screens can use to gain access to our stores, with
 * `const { someStore, someOtherStore } = useStores()`,
 * or less likely: `const rootStore = useStores()`
 */
export const useStores = () => useContext(RootStoreContext)

const feedStoreData = {
  user: 0,
  users: [
    {
      id: '0',
      name: 'jonmajorc',
    },
    {
      id: '1',
      name: 'jonmajorcmedia',
    },
  ],
  posts: [],
}
