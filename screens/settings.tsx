import * as React from 'react'
import { Text, ViewStyle, ScrollView, SafeAreaView } from 'react-native'

const Settings = () => {
  return (
    <SafeAreaView>
      <ScrollView style={Setting}>
        <Text>Settings</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const Setting: ViewStyle = {
  padding: 2,
}

export { Settings }
