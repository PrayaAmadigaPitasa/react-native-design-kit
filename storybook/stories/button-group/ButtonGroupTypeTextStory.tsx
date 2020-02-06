import React from 'react';
import ButtonGroupStory, {ButtonGroupStoryProps} from './ButtonGroupStory';
import {Alert} from 'react-native';

export interface ButtonGroupTypeTextStoryProps extends ButtonGroupStoryProps {}

export default function ButtonGroupTypeTextStory({
  ...props
}: ButtonGroupTypeTextStoryProps) {
  return (
    <ButtonGroupStory
      {...props}
      type="text"
      buttonIds={['Apple', 'Melon', 'Banana', 'Pear', 'Grape']}
      onSelect={id => Alert.alert(`id: ${id}`)}
    />
  );
}
