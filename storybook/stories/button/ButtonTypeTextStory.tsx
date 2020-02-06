import React from 'react';
import ButtonStory, {ButtonStoryProps} from './ButtonStory';

export interface ButtonTypeTextStoryProps extends ButtonStoryProps {}

export default function ButtonTypeTextStory({
  ...props
}: ButtonTypeTextStoryProps) {
  return <ButtonStory {...props} type="text" />;
}
