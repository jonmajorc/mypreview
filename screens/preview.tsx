import * as React from 'react'
import {
  View,
  ViewStyle,
  ScrollView,
  SafeAreaView,
  TextStyle,
  ImageStyle,
  Text,
  Modal,
} from 'react-native'
import { Thumbnail } from '../components/thumbnail'
import { TextArea } from '../components/text-area'

const Preview = (props) => {
  const { route } = props
  return (
    <SafeAreaView>
      <ScrollView style={PREVIEW}>
        <View style={CAPTION}>
          <Thumbnail
            style={IMAGE}
            source={{
              uri: route.params.data.source,
            }}
          />
          <TextArea
            style={TEXT_AREA}
            copypaste
            placeholder="I like long walks on the beach..."
            value={route.params.data.caption}
          />
        </View>
        <View style={CAPTION}>
          <TextArea copypaste placeholder="#beach #sand #beachbody  " />
        </View>
        <Modal
          animationType="slide"
          visible={false}
          presentationStyle="pageSheet"
        >
          <SafeAreaView>
            <ScrollView>
              <View>
                <Text>hello</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  )
}

const PREVIEW: ViewStyle = {}

const CAPTION: ViewStyle = {
  borderBottomColor: '#000000',
  borderBottomWidth: 1,
  flexDirection: 'row',
  backgroundColor: '#fff',
  padding: 15,
  marginBottom: 25,
}

const TEXT_AREA: TextStyle = {
  height: 200,
}

const IMAGE: ImageStyle = {
  width: '33.3333%',
  paddingTop: '33.3333%',
  resizeMode: 'cover',
  alignSelf: 'flex-start',
}

const COPY: ViewStyle = {
  alignSelf: 'flex-end',
}

export { Preview }
