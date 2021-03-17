import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Feed } from '../screens/feed'

export type PrimaryParamList = {
  'Yo Feed': undefined
}

const Stack = createStackNavigator<PrimaryParamList>()

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Yo Feed">
        <Stack.Screen name="Yo Feed" component={Feed} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { MainNavigator }
