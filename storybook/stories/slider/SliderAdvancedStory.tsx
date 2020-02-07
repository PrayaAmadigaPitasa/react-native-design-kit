import React from 'react';
import SliderStory, {SliderStoryProps} from './SliderStory';

export interface SliderAdvancedStoryProps extends SliderStoryProps {}

export default function SliderAdvancedStory({
  button = true,
  indicator = true,
  minValue = 0,
  maxValue = 10,
  ...props
}: SliderAdvancedStoryProps) {
  return (
    <SliderStory
      {...props}
      button={button}
      indicator={indicator}
      minValue={minValue}
      maxValue={maxValue}
    />
  );
}
