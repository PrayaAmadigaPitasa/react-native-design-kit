import React, {useState, ReactNode, useCallback} from 'react';
import {
  Modal as ModalRN,
  ModalProps as ModalRNProps,
  View,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import {useDidUpdate} from '../../utilities';
import {Touchable} from '../touchable';

export interface ModalProps extends ModalRNProps {
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

  const handlePressBackdrop = useCallback(
    (event: GestureResponderEvent) => {
      onPressBackdrop && onPressBackdrop(event);
      setToggle(!toggle);
    },
    [toggle, onPressBackdrop],
  );

  useDidUpdate(() => {
    setToggle(visible);
  }, [visible]);

  return (
    <ModalRN {...props} transparent visible={toggle}>
      <View style={StyleSheet.flatten([styles.container, containerStyle])}>
        {hasBackdrop && (
          <Touchable touchableType="normal" onPress={handlePressBackdrop}>
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
          </Touchable>
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
