import React from 'react';
import {Alert} from 'react-native';
import ButtonStory, {ButtonStoryProps} from './ButtonStory';

export interface ButtonTypeTextStoryProps extends ButtonStoryProps {}

export default function ButtonTypeTextStory({
  ...props
}: ButtonTypeTextStoryProps) {
  return (
    <ButtonStory
      {...props}
      type="text"
      onPress={() => Alert.alert('type: text')}
    />
  );
}
