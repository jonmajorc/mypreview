import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Button, TouchableOpacity, Text, Alert } from "react-native"
import { Screen, Thumbnail, Modal, usePortal } from "../../components"
import { useNavigation } from "@react-navigation/native"
import CheckBox from "@react-native-community/checkbox"
import { useStores, Post as IPost } from "../../models"
import { color } from "../../theme"

const HeaderTitle = observer(() => {
  const { feedStore } = useStores()
  const { dispatch } = usePortal()

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          dispatch({
            type: "open",
            component: <SwitchUser />,
          })
        }}
      >
        <Text>{feedStore.user.name}</Text>
      </TouchableOpacity>
    </View>
  )
})

const SwitchUser = observer(() => {
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)
  const { feedStore } = useStores()
  const { dispatch } = usePortal()
  return (
    <Modal
      onClickAway={() =>
        dispatch({
          type: "close",
          component: undefined,
        })
      }
    >
      {feedStore.users.map((user) => {
        return (
          <View key={user.name}>
            <CheckBox
              disabled={false}
              value={feedStore.user.name === user.name && toggleCheckBox}
              onValueChange={(newValue) => {
                setToggleCheckBox(newValue)
                feedStore.switchUser(user.id)
              }}
            />
            <Text>{user.name}</Text>
          </View>
        )
      })}
    </Modal>
  )
})

export const FeedScreenOptions = {
  // eslint-disable-next-line react/display-name
  headerTitle: () => <HeaderTitle />,
}

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
