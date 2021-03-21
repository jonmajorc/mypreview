import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MainNavigator } from './navigators/main'
import { RootStoreProvider } from './stores'

export default function App() {
  return (
    <RootStoreProvider>
      <View style={styles.container}>
        <MainNavigator />
        <StatusBar style="auto" />
      </View>
    </RootStoreProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
