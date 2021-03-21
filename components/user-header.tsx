import React from 'react'
import { observer } from 'mobx-react-lite'
import { TouchableOpacity, Text, View } from 'react-native'
import { Button, RadioButton, Dialog, Portal } from 'react-native-paper'
import { useStores } from '../stores'

const HeaderTitle = observer(() => {
  const { feedStore } = useStores()
  const [visible, setVisible] = React.useState(false)
  const [checked, setChecked] = React.useState(feedStore.user.id)

  React.useEffect(() => {
    if (visible) {
      setChecked(feedStore.user.id)
    }
  }, [visible])

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>{feedStore.user.name}</Text>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Users</Dialog.Title>
          <Dialog.Content>
            {feedStore.users.map((user) => {
              return (
                <RadioButton.Item
                  key={user.id}
                  label={user.name}
                  value="first"
                  status={checked === user.id ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(user.id)}
                />
              )
            })}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                feedStore.switchUser(checked)
                setVisible(false)
              }}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
})

export { HeaderTitle }
