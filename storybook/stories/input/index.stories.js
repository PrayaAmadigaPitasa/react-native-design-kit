import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {
  InputStory,
  InputLabelPositionBorderStory,
  InputLabelPositionBoxStory,
  InputErrorStory,
} from '.';

storiesOf('Input', module)
  .add('input', () => <InputStory />)
  .add('input error', () => <InputErrorStory />)
  .add('input label position border', () => <InputLabelPositionBorderStory />)
  .add('input label position box', () => <InputLabelPositionBoxStory />);
