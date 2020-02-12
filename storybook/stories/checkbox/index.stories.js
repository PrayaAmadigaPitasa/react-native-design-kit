import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {CheckboxStory, CheckboxNestedStory} from '.';

storiesOf('Checkbox', module)
  .add('checkbox', () => <CheckboxStory />)
  .add('checkbox nested', () => <CheckboxNestedStory />);
