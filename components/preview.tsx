import * as React from 'react'
import { ImageStyle, Image, TouchableOpacity, ViewStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface IPreviewProps {
  source: string
  temp_value: any // TODO (JMC) delete
}

const Preview = (props: IPreviewProps) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={PREVIEW}
      onPress={() => navigation.navigate('Preview', { ...props })}
    >
      <Image
        style={IMAGE}
        source={{
          uri: props.source,
        }}
      />
    </TouchableOpacity>
  )
}

const PREVIEW: ViewStyle = {
  flexBasis: '32.3333%',
  marginTop: 2,
  marginLeft: 2,
}

const IMAGE: ImageStyle = {
  paddingTop: '100%',
  resizeMode: 'cover',
}

export { Preview }
