import React from 'react';
import {
  View,
  Image,
  ImageProps,
  ViewStyle,
  StyleSheet,
  Platform,
  GestureResponderEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface AvatarProps extends ImageProps {
  containerStyle?: ViewStyle;
  rounded?: boolean;
  size?: number;
  icon?: JSX.Element | 'edit';
  iconSize?: number;
  iconContainerStyle?: ViewStyle;
  onPress?(event: GestureResponderEvent): void;
  onPressIcon?(event: GestureResponderEvent): void;
}

export default function Avatar({
  containerStyle,
  rounded,
  size = 48,
  icon,
  iconSize,
  iconContainerStyle,
  onPress,
  onPressIcon,
  style,
  source,
  ...props
}: AvatarProps) {
  const iconSizeComponent = iconSize !== undefined ? iconSize : (size * 5) / 15;

  function getIcon() {
    if (icon !== undefined) {
      if (typeof icon === 'string') {
        if (icon === 'edit') {
          return (
            <Icon
              style={styles.editButtonDefault}
              name="pencil"
              size={iconSizeComponent}
            />
          );
        }
      }

      return icon;
    }

    return undefined;
  }

  return (
    <View style={containerStyle}>
      <TouchableWithoutFeedback
        disabled={onPress === undefined}
        onPress={onPress}>
        <Image
          {...props}
          style={StyleSheet.flatten([
            {height: size, width: size},
            rounded ? {borderRadius: size / 2} : {},
            style,
          ])}
          source={source}
        />
      </TouchableWithoutFeedback>
      {icon !== undefined && (
        <TouchableWithoutFeedback
          disabled={onPressIcon === undefined}
          onPress={onPressIcon}>
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              iconContainerStyle,
              styles.sectionIcon,
              {
                width: iconSizeComponent,
                height: iconSizeComponent,
                borderRadius: iconSizeComponent / 2,
              },
            ])}>
            {getIcon()}
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    bottom: 0,
    right: 0,
    backgroundColor: 'darkgray',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
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
  sectionIcon: {
    position: 'absolute',
  },
  editButtonDefault: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
