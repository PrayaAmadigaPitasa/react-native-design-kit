import React from 'react';
import ChipStory, {ChipStoryProps} from './ChipStory';

export interface ChipActionTypeCheckboxStoryProps extends ChipStoryProps {}

export default function ChipActionTypeCheckboxStory({
  ...props
}: ChipActionTypeCheckboxStoryProps) {
  return <ChipStory {...props} actionType="checkbox" />;
}
