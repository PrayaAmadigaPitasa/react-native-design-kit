import React from 'react';
import ButtonGroupStory, {ButtonGroupStoryProps} from './ButtonGroupStory';

export interface ButtonGroupTypeTextStoryProps extends ButtonGroupStoryProps {}

export default function ButtonGroupTypeTextStory({
  ...props
}: ButtonGroupTypeTextStoryProps) {
  return <ButtonGroupStory {...props} type="text" />;
}
