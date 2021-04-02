import * as React from "react"
import { HoldItem } from "react-native-hold-menu"
import {
  ViewStyle,
  ImageStyle,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  ImageSourcePropType,
} from "react-native"

interface IThumbnailProps {
  style?: ImageStyle
  source: ImageSourcePropType
  onPress?: (event: GestureResponderEvent) => void
  holdMenuItems?: {
    text: string
    icon?: () => React.ReactNode
    onPress: () => void
    isTitle?: boolean
    isDestructive?: boolean
    withSeperator?: boolean
  }[]
}

const Thumbnail = (props: IThumbnailProps) => {
  return (
    <TouchableOpacity style={THUMBNAIL} onPress={props.onPress}>
      <HoldItem items={props.holdMenuItems}>
        <Image style={IMAGE} source={props.source} />
      </HoldItem>
    </TouchableOpacity>
  )
}

Thumbnail.defaultProps = {
  holdMenuItems: [],
}

const THUMBNAIL: ViewStyle = {
  flexBasis: "32.3333%",
  marginTop: 2,
  marginLeft: 2,
}

const IMAGE: ImageStyle = {
  paddingTop: "100%",
  resizeMode: "cover",
}

export { Thumbnail }
