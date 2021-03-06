import * as React from 'react'
import { View, ViewStyle, ScrollView, SafeAreaView, Button } from 'react-native'
import { Post } from '../components/post'
import { observer } from 'mobx-react-lite'
import { useStores } from '../stores'

/** TODO (JMC) use a virutalized list or try flat list */
const Feed = observer(() => {
  let { feedStore } = useStores()

  if (!feedStore.userFeed.length) {
    return (
      <View style={ADD_PHOTO}>
        <Button onPress={feedStore.addPost} title="Add photos"></Button>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={FEED}>
          {feedStore.userFeed.map((post, index) => {
            return <Post key={index} data={post} />
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})

const FEED: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingTop: 2,
  paddingLeft: 2,
}

const ADD_PHOTO: ViewStyle = {
  flex: 1,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}

export { Feed }
