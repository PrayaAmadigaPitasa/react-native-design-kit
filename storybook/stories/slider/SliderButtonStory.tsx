import React from 'react';
import SliderStory, {SliderStoryProps} from './SliderStory';

export interface SliderButtonStoryProps extends SliderStoryProps {}

export default function SliderButtonStory({...props}: SliderButtonStoryProps) {
  return <SliderStory {...props} button />;
}
