import React from 'react';
import ButtonGroupStory, {ButtonGroupStoryProps} from './ButtonGroupStory';

export interface ButtonGroupTypeOutlineStoryProps
  extends ButtonGroupStoryProps {}

export default function ButtonGroupTypeOutlineStory({
  ...props
}: ButtonGroupTypeOutlineStoryProps) {
  return <ButtonGroupStory {...props} type="outline" />;
}
