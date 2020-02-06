import React from 'react';
import ChipStory, {ChipStoryProps} from './ChipStory';

export interface ChipNotRoundedStoryProps extends ChipStoryProps {}

export default function ChipNotRoundedStory({
  ...props
}: ChipNotRoundedStoryProps) {
  return <ChipStory {...props} rounded={false} />;
}
