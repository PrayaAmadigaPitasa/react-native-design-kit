import React from 'react';
import ChipStory, {ChipStoryProps} from './ChipStory';

export interface ChipActionTypeRadioStoryProps extends ChipStoryProps {}

export default function ChipActionTypeRadioStory({
  ...props
}: ChipActionTypeRadioStoryProps) {
  return <ChipStory {...props} actionType="radio" />;
}
