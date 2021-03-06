import React, {useMemo} from 'react';
import {
  View,
  Image,
  ImageProps,
  ViewStyle,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {AvatarIcon} from '../../types';
import {getStyleShadow} from '../../utilities';
import {Icon} from '../icon';
import {Touchable} from '../touchable';

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
  const iconSizeComponent = useMemo(
    () => (iconSize !== undefined ? iconSize : size / 3),
    [iconSize, size],
  );

  const renderIcon = useMemo(() => {
    if (typeof icon === 'string') {
      return icon === 'edit' ? (
        <Icon
          style={styles.iconEdit}
          name="pencil"
          size={iconSizeComponent / 1.25}
        />
      ) : (
        <View
          style={StyleSheet.flatten([
            styles.iconStatus,
            {
              backgroundColor:
                icon === 'status-online'
                  ? 'green'
                  : icon === 'status-offline'
                  ? 'red'
                  : 'gold',
            },
          ])}
        />
      );
    }

    return icon;
  }, [icon, iconSizeComponent]);

  const handleRenderImage = useMemo(
    () => (
      <Touchable
        touchableType="highlight"
        disabled={onPress === undefined}
        onPress={onPress}>
        <Image
          {...props}
          style={StyleSheet.flatten([
            {height: size, width: size},
            rounded && {borderRadius: size / 2},
            style,
          ])}
          source={source}
        />
      </Touchable>
    ),
    [size, style, rounded, source, onPress],
  );

  const handleRenderIcon = useMemo(
    () =>
      icon && (
        <Touchable disabled={onPressIcon === undefined} onPress={onPressIcon}>
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              iconContainerStyle,
              styles.sectionIcon,
              {
                width: iconSizeComponent,
                aspectRatio: 1,
                borderRadius: iconSizeComponent / 2,
              },
            ])}>
            {renderIcon}
          </View>
        </Touchable>
      ),
    [icon, iconContainerStyle, iconSizeComponent, renderIcon, onPressIcon],
  );

  return (
    <View style={containerStyle}>
      {handleRenderImage}
      {handleRenderIcon}
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
    ...getStyleShadow(),
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
