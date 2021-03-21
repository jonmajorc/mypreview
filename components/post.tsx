import * as React from 'react'
import { Thumbnail } from './thumbnail'
import { useNavigation } from '@react-navigation/native'
import { IPost } from '../stores/models'

interface IPostProps {
  data: IPost
}

const Post = (props: IPostProps) => {
  const navigation = useNavigation()

  return (
    <Thumbnail
      onPress={() => navigation.navigate('Preview', { ...props })}
      source={{
        uri: props.data.source,
      }}
    />
  )
}

export { Post }
