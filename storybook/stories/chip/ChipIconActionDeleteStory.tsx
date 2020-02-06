import React from 'react';
import ChipStory, {ChipStoryProps} from './ChipStory';

export interface ChipIconActionDeleteStoryProps extends ChipStoryProps {}

export default function ChipIconActionDeleteStory({
  ...props
}: ChipIconActionDeleteStoryProps) {
  return <ChipStory {...props} rightIconAction={() => 'delete'} />;
}
