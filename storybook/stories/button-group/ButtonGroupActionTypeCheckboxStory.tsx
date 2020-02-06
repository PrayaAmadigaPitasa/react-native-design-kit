import React from 'react';
import ButtonGroupStory, {ButtonGroupStoryProps} from './ButtonGroupStory';

export interface ButtonGroupActionTypeCheckboxStoryProps
  extends ButtonGroupStoryProps {}

export default function ButtonGroupActionTypeCheckboxStory({
  ...props
}: ButtonGroupActionTypeCheckboxStoryProps) {
  return <ButtonGroupStory {...props} actionType="checkbox" />;
}
