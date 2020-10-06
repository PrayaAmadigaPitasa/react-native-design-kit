import {Platform, ViewStyle} from 'react-native';

export function getStyleShadow(): ViewStyle {
  return {
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
  };
}
