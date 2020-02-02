import React, {useState, useEffect, ReactNode} from 'react';
import {
  Modal as ModalRN,
  ModalProps as ModalPropsRN,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';

export interface ModalProps extends ModalPropsRN {
  backdropContainerStyle?: ViewStyle;
  children: ReactNode;
  onPressBackdrop?(event: GestureResponderEvent): void;
}

export default function Modal({
  backdropContainerStyle,
  onPressBackdrop,
  visible = false,
  transparent,
  children,
  ...props
}: ModalProps) {
  const [toggle, setToggle] = useState(visible);

  useEffect(() => {
    setToggle(visible);
  }, [visible]);

  return (
    <ModalRN {...props} transparent visible={toggle}>
      <TouchableWithoutFeedback
        onPress={event => {
          onPressBackdrop !== undefined && onPressBackdrop(event);
          setToggle(!toggle);
        }}>
        <View
          style={StyleSheet.flatten([
            !transparent && backdropContainerStyle,
            styles.sectionBackdrop,
          ])}
        />
      </TouchableWithoutFeedback>
      {children}
    </ModalRN>
  );
}

const styles = StyleSheet.create({
  sectionBackdrop: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
