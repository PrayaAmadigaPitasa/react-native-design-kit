import React from 'react';
import ButtonGroupStory, {ButtonGroupStoryProps} from './ButtonGroupStory';
import {Alert} from 'react-native';

export interface ButtonGroupTypeOutlineStoryProps
  extends ButtonGroupStoryProps {}

export default function ButtonGroupTypeOutlineStory({
  ...props
}: ButtonGroupTypeOutlineStoryProps) {
  return (
    <ButtonGroupStory
      {...props}
      type="outline"
      buttonIds={['Apple', 'Melon', 'Banana', 'Pear', 'Grape']}
      onSelect={id => Alert.alert(`id: ${id}`)}
    />
  );
}
