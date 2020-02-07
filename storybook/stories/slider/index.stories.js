import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {SliderStory, SliderButtonStory, SliderIndicatorStory} from '.';

storiesOf('Slider', module)
  .add('slider', () => <SliderStory />)
  .add('slider button', () => <SliderButtonStory />)
  .add('slider indicator', () => <SliderIndicatorStory />);
