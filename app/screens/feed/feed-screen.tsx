import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Button, TouchableOpacity, Text } from "react-native"
import { Screen, Thumbnail, Modal, usePortal, Portal } from "../../components"
import { useNavigation } from "@react-navigation/native"
import CheckBox from "@react-native-community/checkbox"
import { useStores, Post as IPost } from "../../models"
import { color } from "../../theme"

const HeaderTitle = observer(() => {
  const { feedStore } = useStores()
  const { openPortal } = usePortal()

  return (
    <View>
      <TouchableOpacity onPress={openPortal}>
        <Text>{feedStore.user.name}</Text>
      </TouchableOpacity>
    </View>
  )
})

export const FeedScreenOptions = {
  // eslint-disable-next-line react/display-name
  headerTitle: () => <HeaderTitle />,
}

export const FeedScreen = observer(function FeedScreen() {
  const { feedStore } = useStores()
  const navigation = useNavigation()
  const { closePortal } = usePortal()

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
        {feedStore.userFeed.map((post: IPost, index) => {
          return (
            <Thumbnail
              key={index}
              source={{
                uri: post.source,
              }}
              onPress={() => {
                feedStore.selectPost(post.id)
                navigation.navigate("Preview", { id: post.id })
              }}
            />
          )
        })}
      </View>
      <Portal>
        <Modal onClickAway={closePortal}>
          {feedStore.users.map((user) => {
            return (
              <View key={user.id}>
                <CheckBox
                  disabled={false}
                  value={feedStore.user.id === user.id}
                  onValueChange={() => {
                    if (feedStore.user.id === user.id) return
                    feedStore.switchUser(user.id)
                  }}
                />
                <Text>{user.name}</Text>
              </View>
            )
          })}
        </Modal>
      </Portal>
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
