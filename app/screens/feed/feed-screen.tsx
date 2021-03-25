import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Button, Alert } from "react-native"
import { Screen, Thumbnail } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores, Post as IPost } from "../../models"
import { color } from "../../theme"

export const FeedScreen = observer(function FeedScreen() {
  const { feedStore } = useStores()
  const navigation = useNavigation()

  if (!feedStore.posts.length) {
    return (
      <View style={ADD_PHOTO}>
        <Button onPress={feedStore.addPost} title="Add photos" />
      </View>
    )
  }

  return (
    <Screen style={ROOT} preset="fixed" statusBar="dark-content" unsafe>
      <View style={FEED}>
        {feedStore.posts.map((post: IPost, index) => {
          return (
            <Thumbnail
              key={index}
              source={{
                uri: post.source,
              }}
              onPress={() => navigation.navigate("Preview", { ...post })}
            />
          )
        })}
      </View>
    </Screen>
  )
})

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
