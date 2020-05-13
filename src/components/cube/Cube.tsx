import React, {RefObject, createRef} from 'react';
import {StyleSheet, View} from 'react-native';

export interface CubeProps {
  size?: number;
}

export default function Cube({size = 200}: CubeProps) {
  const refFront = createRef<View>();

  function renderSide(ref: RefObject<View>, backgroundColor: string) {
    return (
      <View
        ref={ref}
        style={StyleSheet.flatten([
          styles.side,
          {height: size, width: size, backgroundColor},
        ])}
      />
    );
  }
  return <>{renderSide(refFront, 'red')}</>;
}

const styles = StyleSheet.create({
  side: {
    position: 'absolute',
  },
});
