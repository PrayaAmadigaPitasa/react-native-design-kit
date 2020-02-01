import React from 'react';
import {
  View,
  Image,
  ImageProps,
  ViewStyle,
  StyleSheet,
  Platform,
  TouchableHighlight,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface AvatarProps extends ImageProps {
  containerStyle?: ViewStyle;
  rounded?: boolean;
  size?: number;
  editButton?: JSX.Element;
  editButtonEnabled?: boolean;
  editButtonSize?: number;
  editButtonContainerStyle?: ViewStyle;
  onPress?(event: GestureResponderEvent): void;
  onPressEditButton?(event: GestureResponderEvent): void;
}

export default function Avatar({
  containerStyle,
  rounded = true,
  size = 48,
  editButton,
  editButtonEnabled = true,
  editButtonSize = 20,
  editButtonContainerStyle,
  onPress,
  onPressEditButton,
  style,
  source,
  ...props
}: AvatarProps) {
  return (
    <TouchableHighlight disabled={onPress !== undefined} onPress={onPress}>
      <View style={containerStyle}>
        <Image
          {...props}
          style={StyleSheet.flatten([
            {height: size, width: size},
            rounded ? {borderRadius: size / 2} : {},
            style,
          ])}
          source={source}
        />
        {editButtonEnabled && (
          <TouchableHighlight
            disabled={onPressEditButton !== undefined}
            onPress={onPressEditButton}>
            <View
              style={StyleSheet.flatten([
                styles.editButtonContainer,
                editButtonContainerStyle,
                {
                  width: editButtonSize,
                  height: editButtonSize,
                  borderRadius: editButtonSize / 2,
                },
              ])}>
              {editButton || (
                <Icon
                  style={styles.editButtonDefault}
                  name="pencil"
                  size={editButtonSize * 0.75}
                />
              )}
            </View>
          </TouchableHighlight>
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  editButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'darkgray',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: 'darkgray',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  editButtonDefault: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
