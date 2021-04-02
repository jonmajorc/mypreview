import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Button, TouchableOpacity, Text, TextStyle } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
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

  const previewPost = (post: IPost) => {
    feedStore.selectPost(post.id)
    navigation.navigate("Preview", { id: post.id })
  }

  const userFeed = Array.isArray(feedStore.userFeed) ? feedStore.userFeed : []

  return (
    <Screen style={ROOT} preset="fixed" statusBar="dark-content" unsafe>
      {userFeed.length ? (
        <View style={FEED}>
          {userFeed.map((post: IPost, index) => {
            return (
              <Thumbnail
                key={index}
                source={{
                  uri: post.source,
                }}
                onPress={() => previewPost(post)}
                holdMenuItems={[
                  {
                    text: "Actions",
                    isTitle: true,
                    onPress: () => null,
                  },
                  {
                    text: "Preview",
                    withSeperator: true,
                    onPress: () => previewPost(post),
                  },

                  {
                    text: "Delete",
                    isDestructive: true,
                    onPress: post.destroy,
                  },
                ]}
              />
            )
          })}
        </View>
      ) : (
        <View style={ADD_PHOTO}>
          <Button onPress={feedStore.addPost} title="Add photos" />
        </View>
      )}
      <Portal>
        <Modal onClickAway={closePortal}>
          {feedStore.users.map((user, index) => {
            return (
              <TouchableOpacity
                style={[
                  USER_OPTION,
                  feedStore.users.length - 1 !== index && USER_OPTION_MARGIN_BOTTOM,
                ]}
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

const USER_OPTION_MARGIN_BOTTOM = { marginBottom: 10 }

const USER_OPTION: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const USER_NAME: TextStyle = {
  textAlign: "right",
  flexGrow: 1,
  paddingLeft: 15,
}
