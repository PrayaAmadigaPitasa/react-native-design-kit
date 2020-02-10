import React from 'react';
import InputStory, {InputStoryProps} from './InputStory';

export interface InputIconActionSearchStoryProps extends InputStoryProps {
  blocked?: string[];
  latency?: number;
}

export default function InputIconActionSearchStory({
  blocked = ['Aludra', 'Freya', 'Dimura', 'Celdric'],
  latency = 250,
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
    }, latency);
  }
  return (
    <InputStory
      {...props}
      onSearch={(text, setState) => check(text, setState)}
      rightIconAction="search"
    />
  );
}
