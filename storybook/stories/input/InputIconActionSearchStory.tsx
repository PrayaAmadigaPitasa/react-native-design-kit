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
    search: string,
    setSearchStatus: (text: string, allowed: boolean) => void,
  ) {
    setTimeout(() => {
      try {
        if (blocked.includes(search)) {
          setSearchStatus(search, false);
        } else {
          setSearchStatus(search, true);
        }
      } catch (error) {}
    }, latency);
  }

  return (
    <InputStory
      {...props}
      onSearch={(search, setSearchStatus) => check(search, setSearchStatus)}
      rightIconAction="search"
    />
  );
}
