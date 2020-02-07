import React from 'react';
import SliderStory, {SliderStoryProps} from './SliderStory';

export interface SliderIndicatorStoryProps extends SliderStoryProps {}

export default function SliderIndicatorStory({
  ...props
}: SliderIndicatorStoryProps) {
  return <SliderStory {...props} indicator />;
}
