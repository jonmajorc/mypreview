import React from "react"
import {
  View,
  ViewStyle,
  ScrollView,
  SafeAreaView,
  TextStyle,
  ImageStyle,
  Text,
  TextInput,
  Modal,
} from "react-native"
import { observer } from "mobx-react-lite"
import { getSnapshot } from "mobx-state-tree"
import { Screen, Thumbnail, TextArea, Pill } from "../../components"
import { color } from "../../theme"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  flex: 1,
}

export const PreviewScreen = observer(function PreviewScreen() {
  const { feedStore } = useStores()
  const [hashtag, onSetHashtag] = React.useState("")

  React.useEffect(() => {
    if (hashtag.startsWith(" ")) onSetHashtag("")
    if (/^#?\w+\s$/.test(hashtag)) {
      feedStore.selectedPost.onChangeHashtags(hashtag.trim())
      onSetHashtag("")
    }
  }, [hashtag])

  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <ScrollView style={PREVIEW}>
        <View style={CAPTION}>
          <Thumbnail
            style={IMAGE}
            source={{
              uri: feedStore.selectedPost.source,
            }}
          />
          <TextArea
            style={TEXT_AREA}
            copypaste
            placeholder="I like long walks on the beach..."
            value={feedStore.selectedPost.caption}
            onChangeText={feedStore.selectedPost.onChangeCaption}
          />
        </View>
        <View style={CAPTION}>
          {feedStore.selectedPost.hashtags.map((hashtag) => {
            return <Pill key={hashtag.name} text={hashtag.name} />
          })}
          <TextInput
            onKeyPress={({ nativeEvent: { key: keyValue } }) => {
              if (keyValue === "Backspace" && !hashtag.length) {
                feedStore.selectedPost.onRemovePreviousHashtag()
              }
            }}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            placeholder="#beach"
            value={hashtag}
            onChangeText={(value) => {
              return onSetHashtag(value)
            }}
          />
        </View>
        <Modal animationType="slide" visible={false} presentationStyle="pageSheet">
          <SafeAreaView>
            <ScrollView>
              <View>
                <Text>hello</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </Screen>
  )
})

const PREVIEW: ViewStyle = {}

const CAPTION: ViewStyle = {
  borderBottomColor: "#000000",
  borderBottomWidth: 1,
  flexDirection: "row",
  backgroundColor: "#fff",
  padding: 15,
  marginBottom: 25,
  flexWrap: "wrap",
}

const TEXT_AREA: TextStyle = {
  height: 200,
}

const IMAGE: ImageStyle = {
  width: "33.3333%",
  paddingTop: "33.3333%",
  resizeMode: "cover",
  alignSelf: "flex-start",
}

const COPY: ViewStyle = {
  alignSelf: "flex-end",
}
