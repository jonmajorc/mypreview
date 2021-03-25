import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Button, Alert } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

const FEED: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  paddingTop: 2,
  paddingLeft: 2,
}

const ADD_PHOTO: ViewStyle = {
  flex: 1,
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
}

export const FeedScreen = observer(function FeedScreen() {
  // Pull in one of our MST stores
  const { feedStore } = useStores()

  if (!feedStore.posts.length) {
    return (
      <View style={ADD_PHOTO}>
        <Button onPress={() => Alert.alert("click!")} title="Add photos"></Button>
      </View>
    )
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed" statusBar="dark-content" unsafe>
      <View style={FEED}>
        {feedStore.posts.map((post, index) => {
          return <Post key={index} data={post} />
        })}
      </View>
    </Screen>
  )
})
