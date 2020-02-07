import React from 'react';
import InputStory, {InputStoryProps} from './InputStory';

export interface InputIconActionDeleteStoryProps extends InputStoryProps {}

export default function InputIconActionDeleteStory({
  ...props
}: InputIconActionDeleteStoryProps) {
  return <InputStory {...props} rightIconAction="delete" />;
}
