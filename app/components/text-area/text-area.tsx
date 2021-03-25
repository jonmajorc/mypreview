import * as React from "react"
import {
  View,
  TextInput,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInputProps,
} from "react-native"
import Clipboard from "@react-native-clipboard/clipboard"
import Icon from "react-native-vector-icons/AntDesign"

interface ITextArea extends TextInputProps {
  copypaste?: boolean
  style?: ViewStyle
  placeholder?: string
}

const TextArea = (props: ITextArea) => {
  const { style, ...textAreaProps } = props
  const [caption, onChangeCaption] = React.useState("")

  const copyToClipboard = () => {
    Clipboard.setString(caption)
  }

  return (
    <View style={{ ...TEXT_AREA, ...style }}>
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
          <Icon name="copy1" size={25} />
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
  position: "relative",
  backgroundColor: "transparent",
}

const TEXT_INPUT: TextStyle = {
  flex: 1,
  height: "100%",
  textAlignVertical: "top",
  backgroundColor: "transparent",
}

const COPY: ViewStyle = {
  position: "absolute",
  bottom: 0,
  alignSelf: "flex-end",
}

export { TextArea }
