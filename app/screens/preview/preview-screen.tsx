import React from "react"
import {
  View,
  ViewStyle,
  ScrollView,
  SafeAreaView,
  TextStyle,
  ImageStyle,
  Text,
  Modal,
} from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Thumbnail, TextArea } from "../../components"
import { color } from "../../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const ROOT: ViewStyle = {
  flex: 1,
}

export const PreviewScreen = observer(function PreviewScreen({ route, ...props }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  console.log(route, props)
  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <ScrollView style={PREVIEW}>
        <View style={CAPTION}>
          <Thumbnail
            style={IMAGE}
            source={{
              uri: route.params.source,
            }}
          />
          <TextArea style={TEXT_AREA} copypaste placeholder="I like long walks on the beach..." />
        </View>
        <View style={CAPTION}>
          <TextArea copypaste placeholder="#beach #sand #beachbody  " />
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
