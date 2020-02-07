import React from 'react';
import InputStory, {InputStoryProps} from './InputStory';

const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface InputAdvanceStoryProps extends InputStoryProps {}

export default function InputAdvanceStory({
  label = 'Email',
  rightIconAction = 'delete',
  ...props
}: InputAdvanceStoryProps) {
  return (
    <InputStory
      {...props}
      label={label}
      error={{
        regex: REGEX_EMAIL,
        error:
          'Please enter your email address in format: yourname@example.com',
      }}
      rightIconAction={rightIconAction}
    />
  );
}
