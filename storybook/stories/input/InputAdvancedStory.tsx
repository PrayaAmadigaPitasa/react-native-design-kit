import React from 'react';
import InputStory, {InputStoryProps} from './InputStory';

const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface InputAdvancedStoryProps extends InputStoryProps {}

export default function InputAdvancedStory({
  label = 'Email',
  rightIconAction = 'delete',
  error = {
    regex: REGEX_EMAIL,
    error: 'Please enter your email address in format: yourname@example.com',
  },
  ...props
}: InputAdvancedStoryProps) {
  return (
    <InputStory
      {...props}
      clearErrorOnFocus
      label={label}
      error={error}
      rightIconAction={rightIconAction}
    />
  );
}
