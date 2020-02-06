import React from 'react';
import {Alert} from 'react-native';
import ButtonStory, {ButtonStoryProps} from './ButtonStory';

export interface ButtonTypeOutlineStoryProps extends ButtonStoryProps {}

export default function ButtonTypeOutlineStory({
  ...props
}: ButtonTypeOutlineStoryProps) {
  return (
    <ButtonStory
      {...props}
      type="outline"
      onPress={() => Alert.alert('Clicked')}
    />
  );
}
