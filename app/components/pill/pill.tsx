import React from "react"
import { View, Text, ViewStyle, TextStyle } from "react-native"
import { color } from "../../theme"
import Icon from "react-native-vector-icons/AntDesign"

interface IPill {
  text: string
  icon: string
  onPressIcon: unknown
}

const Pill = ({ text, icon = "close", onPressIcon }: IPill) => {
  return (
    <View style={PILL}>
      <Icon.Button
        name={icon}
        size={15}
        borderRadius={15}
        backgroundColor={"#FE4365"}
        onPress={onPressIcon}
      >
        <Text style={TEXT}>{text}</Text>
      </Icon.Button>
    </View>
  )
}

const PILL: ViewStyle = {
  margin: 2,
}

const TEXT: TextStyle = {
  marginRight: 5,
  color: color.palette.white,
}

export { Pill }
