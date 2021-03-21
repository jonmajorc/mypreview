import React from 'react'
import { NavigationContainer, ParamListBase } from '@react-navigation/native'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { TransitionSpec } from '@react-navigation/stack/src/types'
import { Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { Feed } from '../screens/feed'
import { Preview } from '../screens/preview'
import { Settings } from '../screens/settings'
import * as ImagePicker from 'expo-image-picker'
import { useStores } from '../stores'
import { observer } from 'mobx-react-lite'

const config: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 100,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}

type screens = 'Feed' | 'Preview' | 'Settings'

export type PrimaryParamList = {
  Feed: undefined
  Preview: undefined
  Settings: undefined
}

const Stack = createStackNavigator<PrimaryParamList>()

const MainNavigator = observer(() => {
  const navigationRef = React.useRef(null)
  const isReadyRef = React.useRef(null)

  let addPhoto = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    console.log(pickerResult)
  }

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    }
  }, [])

  let handleNavigation = React.useCallback(
    (screen: screens, params?: ParamListBase) => {
      if (isReadyRef.current && navigationRef.current)
        navigationRef.current.navigate(screen, params)
    },
    [isReadyRef.current, navigationRef.current]
  )

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true
      }}
    >
      <Stack.Navigator
        initialRouteName="Feed"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
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
                <Icon onPress={addPhoto} type="antdesign" name="appstore-o" />
              )
            },
            headerLeft: () => {
              return (
                <Icon
                  onPress={() => handleNavigation('Settings')}
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
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
            transitionSpec: {
              open: config,
              close: config,
            },
            headerTitleAlign: 'center',
            headerLeftContainerStyle: {
              margin: 10,
            },
            headerRightContainerStyle: {
              marginRight: 10,
            },
            headerTitle: 'Preview', // TODO (JMC) update with state of user account name
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
            transitionSpec: {
              open: config,
              close: config,
            },
            headerTitleAlign: 'center',
            headerLeftContainerStyle: {
              margin: 10,
            },
            headerRightContainerStyle: {
              marginRight: 10,
            },
            headerTitle: 'Settings', // TODO (JMC) update with state of user account name
            headerRight: () => {
              return (
                <Icon
                  onPress={() => Alert.alert('button press!')}
                  type="antdesign"
                  name="appstore-o"
                />
              )
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
})

export { MainNavigator }
