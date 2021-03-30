import React from "react"
import {
  View,
  ViewStyle,
  ScrollView,
  SafeAreaView,
  TextStyle,
  ImageStyle,
  Text,
} from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Thumbnail, TextArea, Pill } from "../../components"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  flex: 1,
}

export const PreviewScreenOptions = {}

export const PreviewScreen = observer(function PreviewScreen() {
  const { feedStore } = useStores()
  const [hashtag, onSetHashtag] = React.useState("")

  const hashtagsCopied = React.useMemo(() => {
    return `.\n.\n.\n.\n.\n${feedStore.selectedPost.hashtags.map(({ name }) => name).join(" ")}`
  }, [feedStore.selectedPost.hashtags.length])

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
        <View style={INPUT_VIEW}>
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
        <View style={INPUT_VIEW}>
          <TextArea
            copypaste
            copypasteValue={hashtagsCopied}
            style={HASHTAG_INPUT}
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
        <View style={HASHTAGS}>
          {feedStore.selectedPost.hashtags.length ? (
            feedStore.selectedPost.hashtags.map((hashtag) => {
              return (
                <Pill
                  icon="close"
                  onPressIcon={() => feedStore.selectedPost.onRemoveHashTag(hashtag)}
                  key={hashtag.name}
                  text={hashtag.name}
                />
              )
            })
          ) : (
            <Text>Hashtags appear here 👋</Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  )
})

const PREVIEW: ViewStyle = {}

const INPUT_VIEW: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "#fff",
  padding: 15,
  marginBottom: 25,
  flexWrap: "wrap",
}

const HASHTAGS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
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

const HASHTAG_INPUT: TextStyle = {
  height: 25,
  flex: 1,
}
