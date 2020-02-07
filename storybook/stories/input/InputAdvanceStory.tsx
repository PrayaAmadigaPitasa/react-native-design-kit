import React, {useState, useEffect} from 'react';
import InputStory, {InputStoryProps} from './InputStory';

const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface InputAdvanceStoryProps extends InputStoryProps {}

export default function InputAdvanceStory({
  label = 'Email',
  rightIconAction = 'delete',
  error,
  onFocus,
  onSubmitEditing,
  ...props
}: InputAdvanceStoryProps) {
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  return (
    <InputStory
      {...props}
      label={label}
      error={errorMessage}
      rightIconAction={rightIconAction}
      onFocus={event => {
        onFocus && onFocus(event);
        setErrorMessage(undefined);
      }}
      onSubmitEditing={event => {
        const text = event.nativeEvent.text;

        onSubmitEditing && onSubmitEditing(event);
        text.length > 0 &&
          !REGEX_EMAIL.test(event.nativeEvent.text) &&
          setErrorMessage(
            'Please enter your email address in format: yourname@example.com',
          );
      }}
    />
  );
}
