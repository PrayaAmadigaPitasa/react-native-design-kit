import React from 'react';
import ChipStory, {ChipStoryProps} from './ChipStory';

export interface ChipHorizontalStoryProps extends ChipStoryProps {}

export default function ChipHorizontalStory({
  ...props
}: ChipHorizontalStoryProps) {
  return <ChipStory {...props} horizontal />;
}
