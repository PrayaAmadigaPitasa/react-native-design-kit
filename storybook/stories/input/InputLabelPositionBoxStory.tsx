import React from 'react';
import InputStory, {InputStoryProps} from './InputStory';

export interface InputLabelPositionBoxStoryProps extends InputStoryProps {}

export default function InputLabelPositionBoxStory({
  ...props
}: InputLabelPositionBoxStoryProps) {
  return <InputStory {...props} labelPosition="box" />;
}
