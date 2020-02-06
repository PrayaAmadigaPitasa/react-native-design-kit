import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {
  ButtonGroupStory,
  ButtonGroupTypeOutlineStory,
  ButtonGroupTypeTextStory,
  ButtonGroupActionTypeCheckboxStory,
  ButtonGroupActionTypeRadioStory,
} from '.';

storiesOf('ButtonGroup', module)
  .add('button group', () => <ButtonGroupStory />)
  .add('button group type outline', () => <ButtonGroupTypeOutlineStory />)
  .add('button group type text', () => <ButtonGroupTypeTextStory />)
  .add('button group action type checkbox', () => (
    <ButtonGroupActionTypeCheckboxStory />
  ))
  .add('button group action type radio', () => (
    <ButtonGroupActionTypeRadioStory />
  ));
