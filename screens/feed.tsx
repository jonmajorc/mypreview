import * as React from 'react'
import { View, ViewStyle, ScrollView, SafeAreaView } from 'react-native'
import { Preview } from '../components/preview'

/** TODO (JMC) use a virutalized list or try flat list */
const Feed = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={FEED}>
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const FEED: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingTop: 2,
  paddingLeft: 2,
}

export { Feed }
