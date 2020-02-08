import React from 'react';
import {BadgeProps, Badge} from '../../../src';

export interface BadgeStoryProps extends BadgeProps {}

export default function BadgeStory({...props}: BadgeStoryProps) {
  return <Badge {...props} />;
}
