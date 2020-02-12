import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {CheckboxStory, CheckboxIndeterminateStory} from '.';

storiesOf('Checkbox', module)
  .add('checkbox', () => <CheckboxStory />)
  .add('checkbox indeterminate', () => <CheckboxIndeterminateStory />);
