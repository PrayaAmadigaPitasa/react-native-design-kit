import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {
  InputStory,
  InputLabelPositionBorderStory,
  InputLabelPositionBoxStory,
  InputErrorStory,
  InputIconActionDeleteStory,
  InputIconActionToggleVisibilityStory,
  InputAdvanceStory,
} from '.';

storiesOf('Input', module)
  .add('input', () => <InputStory />)
  .add('input advance', () => <InputAdvanceStory />)
  .add('input error', () => <InputErrorStory />)
  .add('input icon action delete', () => <InputIconActionDeleteStory />)
  .add('input icon action toggle visibility', () => (
    <InputIconActionToggleVisibilityStory />
  ))
  .add('input label position border', () => <InputLabelPositionBorderStory />)
  .add('input label position box', () => <InputLabelPositionBoxStory />);
