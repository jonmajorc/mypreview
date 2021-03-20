import * as React from 'react'
import { ImageStyle, Image, TouchableOpacity, ViewStyle } from 'react-native'
import { Thumbnail } from './thumbnail'
import { useNavigation } from '@react-navigation/native'

interface IPostProps {
  source: string
  temp_value: any // TODO (JMC) delete
}

const Post = (props: IPostProps) => {
  const navigation = useNavigation()

  return (
    <Thumbnail
      onPress={() => navigation.navigate('Preview', { ...props })}
      source={{
        uri: props.source,
      }}
    />
  )
}

export { Post }
