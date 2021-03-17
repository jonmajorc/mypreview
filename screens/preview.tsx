import * as React from 'react'
import { View, Text, ViewStyle, ScrollView, SafeAreaView } from 'react-native'

/** TODO (JMC) use a virutalized list or try flat list */
const Preview = ({ route, ...props }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={FEED}>
          <Text>Test {route.params.temp_value}</Text>
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

export { Preview }
