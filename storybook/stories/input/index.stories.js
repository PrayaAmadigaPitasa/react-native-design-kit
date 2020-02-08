import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {
  InputStory,
  InputLabelPositionBorderStory,
  InputLabelPositionBoxStory,
  InputErrorStory,
  InputIconActionDeleteStory,
  InputIconActionToggleVisibilityStory,
  InputAdvancedStory,
} from '.';

storiesOf('Input', module)
  .add('input', () => <InputStory />)
  .add('input advanced', () => <InputAdvancedStory />)
  .add('input error', () => <InputErrorStory />)
  .add('input icon action delete', () => <InputIconActionDeleteStory />)
  .add('input icon action toggle visibility', () => (
    <InputIconActionToggleVisibilityStory />
  ))
  .add('input label position border', () => <InputLabelPositionBorderStory />)
  .add('input label position box', () => <InputLabelPositionBoxStory />);
