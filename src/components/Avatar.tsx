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
  Alert,
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
  onPressEditButton = () => Alert.alert('Test'),
  style,
  source,
  ...props
}: AvatarProps) {
  return (
    <View style={containerStyle}>
      <Image
        {...props}
        style={StyleSheet.flatten([
          style,
          {height: size, width: size},
          rounded ? {borderRadius: size / 2} : {},
        ])}
        source={source}
      />
      {editButtonEnabled && (
        <TouchableHighlight onPress={onPressEditButton}>
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
  );
}

const styles = StyleSheet.create({
  editButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: -2,
    backgroundColor: '#9a9a9a',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#9a9a9a',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  editButtonDefault: {
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
