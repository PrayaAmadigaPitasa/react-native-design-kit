import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {
  ButtonGroupStory,
  ButtonGroupTypeOutlineStory,
  ButtonGroupTypeTextStory,
} from '.';

storiesOf('ButtonGroup', module)
  .add('button group', () => <ButtonGroupStory />)
  .add('button group type outline', () => <ButtonGroupTypeOutlineStory />)
  .add('button group type text', () => <ButtonGroupTypeTextStory />);
