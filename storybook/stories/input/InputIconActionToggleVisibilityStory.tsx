import React from 'react';
import InputStory, {InputStoryProps} from './InputStory';

export interface InputIconActionToggleVisibilityStoryProps
  extends InputStoryProps {}

export default function InputIconActionToggleVisibilityStory({
  ...props
}: InputIconActionToggleVisibilityStoryProps) {
  return <InputStory {...props} rightIconAction="toggle-visibility" />;
}
