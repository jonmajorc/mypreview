import * as React from 'react'
import {
  View,
  TextInput,
  Text,
  ViewStyle,
  ScrollView,
  SafeAreaView,
  TextStyle,
  Image,
  ImageStyle,
} from 'react-native'
import { Thumbnail } from '../components/thumbnail'

const Preview = ({ route, ...props }) => {
  return (
    <SafeAreaView>
      <ScrollView style={PREVIEW}>
        <View style={CAPTION}>
          <Thumbnail
            style={IMAGE}
            source={{
              uri: route.params.source,
            }}
          />
          <TextInput style={TEXT_AREA} editable multiline />
        </View>
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
}

const TEXT_AREA: TextStyle = {
  height: 200,
  flex: 1,
  padding: 15,
  backgroundColor: 'transparent',
}

const IMAGE: ImageStyle = {
  width: '33.3333%',
  paddingTop: '33.3333%',
  resizeMode: 'cover',
  alignSelf: 'flex-start',
}

export { Preview }
