import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {PlayingBarStory, PlayingBarAdvancedStory} from '.';

storiesOf('PlayingBar', module)
  .add('playing bar', () => <PlayingBarStory />)
  .add('playing bar advanced', () => <PlayingBarAdvancedStory />);
