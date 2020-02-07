import React from 'react';
import InputStory, {InputStoryProps} from './InputStory';

export interface InputErrorStoryProps extends InputStoryProps {}

export default function InputErrorStory({
  error = 'Please enter your email address in format: yourname@example.com',
  ...props
}: InputErrorStoryProps) {
  return <InputStory {...props} error={error} />;
}
