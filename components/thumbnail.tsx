import * as React from 'react'
import {
  ViewStyle,
  ImageStyle,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native'

interface IThumbnailProps {
  style: ImageStyle
  source: ImageSourcePropType
  onPress?: (event: GestureResponderEvent) => void
}

const Thumbnail = (props: IThumbnailProps) => {
  return (
    <TouchableOpacity style={THUMBNAIL} onPress={props.onPress}>
      <Image style={IMAGE} source={props.source} />
    </TouchableOpacity>
  )
}

const THUMBNAIL: ViewStyle = {
  flexBasis: '32.3333%',
  marginTop: 2,
  marginLeft: 2,
}

const IMAGE: ImageStyle = {
  paddingTop: '100%',
  resizeMode: 'cover',
}

export { Thumbnail }
