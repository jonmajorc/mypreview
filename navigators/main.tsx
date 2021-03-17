import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { Feed } from '../screens/feed'
import { Preview } from '../screens/preview'

export type PrimaryParamList = {
  Feed: undefined
  Preview: undefined
}

const Stack = createStackNavigator<PrimaryParamList>()

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitleAlign: 'center',
            headerLeftContainerStyle: {
              margin: 10,
            },
            headerRightContainerStyle: {
              marginRight: 10,
            },
            headerTitle: 'jonmajorc', // TODO (JMC) update with state of user account name
            headerRight: () => {
              return (
                <Icon
                  onPress={() => Alert.alert('button press!')}
                  type="antdesign"
                  name="appstore-o"
                />
              )
            },
            headerLeft: () => {
              return (
                <Icon
                  onPress={() => Alert.alert('button press!')}
                  type="antdesign"
                  name="setting"
                />
              )
            },
          }}
        />
        <Stack.Screen
          name="Preview"
          component={Preview}
          options={{
            headerTitleAlign: 'center',
            headerLeftContainerStyle: {
              margin: 10,
            },
            headerRightContainerStyle: {
              marginRight: 10,
            },
            headerTitle: 'jonmajorc', // TODO (JMC) update with state of user account name
            headerRight: () => {
              return (
                <Icon
                  onPress={() => Alert.alert('button press!')}
                  type="antdesign"
                  name="appstore-o"
                />
              )
            },
            headerLeft: () => {
              return (
                <Icon
                  onPress={() => Alert.alert('button press!')}
                  type="antdesign"
                  name="setting"
                />
              )
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { MainNavigator }
