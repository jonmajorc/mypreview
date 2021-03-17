import * as React from 'react'
import { ImageStyle, Image } from 'react-native'

const Preview = () => {
  return (
    <Image
      style={PREVIEW}
      source={{
        uri:
          'https://scontent-msp1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/161378934_204301864817040_2979915118463018514_n.jpg?tp=1&_nc_ht=scontent-msp1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=7Eh9CSxxBt4AX9PWRZs&ccb=7-4&oh=94401738775bd3244b816dd454512293&oe=607D853B&ig_cache_key=MjUzMTQzOTEwMjIxNTk5NTQ5OQ%3D%3D.2-ccb7-4',
      }}
    />
  )
}

const PREVIEW: ImageStyle = {
  marginTop: 2,
  marginLeft: 2,
  flexBasis: '32.3333%',
  paddingTop: '32.3333%',
  resizeMode: 'cover',
}

export { Preview }
