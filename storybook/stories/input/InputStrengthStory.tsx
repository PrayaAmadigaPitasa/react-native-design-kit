import React from 'react';
import InputStory, {InputStoryProps} from './InputStory';

export interface InputStrengthStoryProps extends InputStoryProps {}

export default function InputStrengthStory({
  label = 'Password',
  ...props
}: InputStrengthStoryProps) {
  return <InputStory {...props} strength label={label} />;
}
