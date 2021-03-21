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
  user: '0',
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
  posts: [
    {
      id: '0',
      source:
        'https://scontent-msp1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/161378934_204301864817040_2979915118463018514_n.jpg?tp=1&_nc_ht=scontent-msp1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=7Eh9CSxxBt4AX9PWRZs&ccb=7-4&oh=94401738775bd3244b816dd454512293&oe=607D853B&ig_cache_key=MjUzMTQzOTEwMjIxNTk5NTQ5OQ%3D%3D.2-ccb7-4',
      caption: 'I like long walks on the beach!',
      user: 0,
      hashtags: [
        {
          id: '0',
          name: '#sandy',
        },
        {
          id: '1',
          name: '#longwalks',
        },
      ],
    },
    {
      id: '1',
      source:
        'https://scontent-msp1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/161378934_204301864817040_2979915118463018514_n.jpg?tp=1&_nc_ht=scontent-msp1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=7Eh9CSxxBt4AX9PWRZs&ccb=7-4&oh=94401738775bd3244b816dd454512293&oe=607D853B&ig_cache_key=MjUzMTQzOTEwMjIxNTk5NTQ5OQ%3D%3D.2-ccb7-4',
      caption: 'hell',
      user: 1,
      hashtags: [
        {
          id: '0',
          name: '#sandy',
        },
        {
          id: '1',
          name: '#longwalks',
        },
      ],
    },
    {
      id: '2',
      source:
        'https://scontent-msp1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/161378934_204301864817040_2979915118463018514_n.jpg?tp=1&_nc_ht=scontent-msp1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=7Eh9CSxxBt4AX9PWRZs&ccb=7-4&oh=94401738775bd3244b816dd454512293&oe=607D853B&ig_cache_key=MjUzMTQzOTEwMjIxNTk5NTQ5OQ%3D%3D.2-ccb7-4',
      caption: 'I like long walks on the beach!',
      user: 0,
      hashtags: [
        {
          id: '0',
          name: '#sandy',
        },
        {
          id: '1',
          name: '#longwalks',
        },
      ],
    },
  ],
}
