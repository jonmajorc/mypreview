import * as React from 'react'
import {
  View,
  TextInput,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInputProps,
} from 'react-native'
import Clipboard from 'expo-clipboard'
import { Icon } from 'react-native-elements'

interface ITextArea extends TextInputProps {
  copypaste?: boolean
  style?: ViewStyle
  placeholder?: string
}

const TextArea = (props: ITextArea) => {
  const { style, ...textAreaProps } = props
  let [caption, onChangeCaption] = React.useState('')

  let copyToClipboard = () => {
    Clipboard.setString(caption)
  }

  return (
    <View style={{ ...TEXT_AREA, ...props.style }}>
      <TextInput
        style={TEXT_INPUT}
        editable
        multiline
        value={caption}
        onChangeText={onChangeCaption}
        placeholder={props.placeholder}
        {...textAreaProps}
      />
      {props.copypaste && (
        <TouchableOpacity style={COPY} onPress={() => copyToClipboard()}>
          <Icon type="antdesign" name="copy1" />
        </TouchableOpacity>
      )}
    </View>
  )
}

const TEXT_AREA: ViewStyle = {
  height: 100,
  flex: 1,
  paddingLeft: 15,
  paddingRight: 28,
  position: 'relative',
  backgroundColor: 'transparent',
}

const TEXT_INPUT: TextStyle = {
  flex: 1,
  height: '100%',
  textAlignVertical: 'top',
  backgroundColor: 'transparent',
}

const COPY: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  alignSelf: 'flex-end',
}

export { TextArea }
