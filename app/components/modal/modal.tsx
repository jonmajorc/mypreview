import * as React from "react"
import { observer } from "mobx-react-lite"
import Icon from "react-native-vector-icons/AntDesign"
import {
  View,
  ViewStyle,
  Modal as ReactModal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native"

export interface ModalProps {
  style?: ViewStyle
  children: React.ReactNode
  onClickAway?: (value: boolean) => void
}

export const Modal = observer(function Modal(props: ModalProps) {
  const { style } = props

  return (
    <ReactModal animationType="slide" transparent={true} visible={true}>
      <TouchableOpacity
        style={[CONTAINER, style]}
        activeOpacity={1}
        onPressOut={() => {
          props.onClickAway(false)
        }}
      >
        <ScrollView directionalLockEnabled={true} contentContainerStyle={[CONTAINER, style]}>
          <TouchableWithoutFeedback>
            <View>
              <View style={CONTENT}>
                <Icon
                  name="close"
                  size={25}
                  style={CLOSE_ICON}
                  onPress={() => props.onClickAway(false)}
                />
                {props.children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </TouchableOpacity>
    </ReactModal>
  )
})

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const CONTENT: ViewStyle = {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 60,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  position: "relative",
}

const CLOSE_ICON: ViewStyle = {
  position: "absolute",
  padding: 20,
  right: 0,
}
