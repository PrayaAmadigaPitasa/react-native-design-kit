import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {ButtonStory, ButtonTypeOutlineStory, ButtonTypeTextStory} from '.';

storiesOf('Button', module)
  .add('button', () => <ButtonStory />)
  .add('button type outline', () => <ButtonTypeOutlineStory />)
  .add('button type text', () => <ButtonTypeTextStory />);
