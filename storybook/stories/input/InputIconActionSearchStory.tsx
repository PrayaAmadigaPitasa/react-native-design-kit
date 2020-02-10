import React from 'react';
import InputStory, {InputStoryProps} from './InputStory';

export interface InputIconActionSearchStoryProps extends InputStoryProps {
  blocked?: string[];
}

export default function InputIconActionSearchStory({
  blocked = ['Aludra', 'Freya', 'Dimura', 'Celdric'],
  ...props
}: InputIconActionSearchStoryProps) {
  async function check(
    text: string,
    setState: (text: string, allowed: boolean) => void,
  ) {
    setTimeout(() => {
      try {
        if (blocked.includes(text)) {
          setState(text, false);
        } else {
          setState(text, true);
        }
      } catch (error) {}
    }, 3000);
  }
  return (
    <InputStory
      {...props}
      onSearch={(text, setState) => check(text, setState)}
    />
  );
}
