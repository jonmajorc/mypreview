import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Button, TouchableOpacity, Text, TextStyle } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { Screen, Thumbnail, Modal, usePortal, Portal } from "../../components"
import { useNavigation } from "@react-navigation/native"
import CheckBox from "@react-native-community/checkbox"
import { useStores, Post as IPost } from "../../models"
import { TransitionSpec } from "@react-navigation/stack/src/types"
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

const HeaderRight = observer(() => {
  const { feedStore } = useStores()
  return <Icon onPress={feedStore.addPost} name="pluscircleo" size={20} />
})

export const FeedScreenOptions = {
  // eslint-disable-next-line react/display-name
  headerTitle: () => <HeaderTitle />,
  // eslint-disable-next-line react/display-name
  headerRight: () => <HeaderRight />,
  headerLeftContainerStyle: {
    margin: 10,
  },
  headerRightContainerStyle: {
    marginRight: 10,
  },
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
              <TouchableOpacity
                style={USER_OPTION}
                key={user.id}
                onPress={() => {
                  if (feedStore.user.id === user.id) return
                  feedStore.switchUser(user.id)
                }}
              >
                <CheckBox disabled={false} value={feedStore.user.id === user.id} />
                <Text style={USER_NAME}>{user.name}</Text>
              </TouchableOpacity>
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

const USER_OPTION: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
}

const USER_NAME: TextStyle = {
  textAlign: "right",
  flexGrow: 1,
  paddingLeft: 15,
}
