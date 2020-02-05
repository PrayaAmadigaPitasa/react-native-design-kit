import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {AvatarStory} from './avatar';
import {ButtonStory} from './button';
import {ButtonGroupStory} from './button-group';

storiesOf('Avatar', module).add('default', () => <AvatarStory />);
storiesOf('Button', module).add('default', () => <ButtonStory />);
storiesOf('ButtonGroup', module).add('default', () => <ButtonGroupStory />);
