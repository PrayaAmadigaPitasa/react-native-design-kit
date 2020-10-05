import React, {useMemo} from 'react';
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

export type AvatarIcon =
  | JSX.Element
  | 'edit'
  | 'status-online'
  | 'status-offline'
  | 'status-standby';

export interface AvatarProps extends ImageProps {
  containerStyle?: ViewStyle;
  rounded?: boolean;
  size?: number;
  icon?: AvatarIcon;
  iconSize?: number;
  iconContainerStyle?: ViewStyle;
  onPress?(event: GestureResponderEvent): void;
  onPressIcon?(event: GestureResponderEvent): void;
}

export default function Avatar({
  containerStyle,
  rounded = true,
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
  const iconSizeComponent = iconSize !== undefined ? iconSize : size / 3;

  function getIcon() {
    if (typeof icon === 'string') {
      if (icon === 'edit') {
        return (
          <Icon
            style={styles.iconEdit}
            name="pencil"
            size={iconSizeComponent}
          />
        );
      }

      let statusColor;

      if (icon === 'status-online') {
        statusColor = 'green';
      } else if (icon === 'status-offline') {
        statusColor = 'red';
      } else {
        statusColor = 'gold';
      }

      return (
        <View
          style={StyleSheet.flatten([
            styles.iconStatus,
            {backgroundColor: statusColor},
          ])}
        />
      );
    }

    return icon;
  }

  const handleRenderImage = useMemo(
    () => (
      <TouchableWithoutFeedback
        disabled={onPress === undefined}
        onPress={onPress}>
        <Image
          {...props}
          testID="avatar-image-container"
          style={StyleSheet.flatten([
            {height: size, width: size},
            rounded && {borderRadius: size / 2},
            style,
          ])}
          source={source}
        />
      </TouchableWithoutFeedback>
    ),
    [size, rounded, source, onPress],
  );

  return (
    <View testID="avatar-container" style={containerStyle}>
      {handleRenderImage}
      {icon !== undefined && (
        <TouchableWithoutFeedback
          disabled={onPressIcon === undefined}
          onPress={onPressIcon}>
          <View
            testID="avatar-icon-container"
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
            {icon !== undefined && getIcon()}
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
    borderColor: 'white',
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
  iconEdit: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  iconStatus: {
    height: '100%',
    width: '100%',
  },
});
