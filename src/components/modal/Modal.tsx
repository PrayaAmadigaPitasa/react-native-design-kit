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
  containerStyle?: ViewStyle;
  hasBackdrop?: boolean;
  backdropContainerStyle?: ViewStyle;
  children: ReactNode;
  onPressBackdrop?(event: GestureResponderEvent): void;
}

export default function Modal({
  containerStyle,
  hasBackdrop = true,
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
      <View style={StyleSheet.flatten([styles.container, containerStyle])}>
        {hasBackdrop && (
          <TouchableWithoutFeedback
            testID="button-container"
            onPress={event => {
              onPressBackdrop !== undefined && onPressBackdrop(event);
              setToggle(!toggle);
            }}>
            <View
              style={StyleSheet.flatten([
                !transparent &&
                  StyleSheet.flatten([
                    styles.backdropContainer,
                    backdropContainerStyle,
                  ]),
                styles.sectionBackdrop,
              ])}
            />
          </TouchableWithoutFeedback>
        )}
        {children}
      </View>
    </ModalRN>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdropContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sectionBackdrop: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
