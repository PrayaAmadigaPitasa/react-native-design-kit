import React from 'react';
import InputStory, {InputStoryProps} from './InputStory';

export interface InputLabelPositionBorderStoryProps extends InputStoryProps {}

export default function InputLabelPositionBorderStory({
  ...props
}: InputLabelPositionBorderStoryProps) {
  return <InputStory {...props} labelPosition="border" />;
}
