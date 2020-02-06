import React from 'react';
import ButtonGroupStory, {ButtonGroupStoryProps} from './ButtonGroupStory';

export interface ButtonGroupActionTypeRadioStoryProps
  extends ButtonGroupStoryProps {}

export default function ButtonGroupActionTypeRadioStory({
  ...props
}: ButtonGroupActionTypeRadioStoryProps) {
  return <ButtonGroupStory {...props} actionType="radio" />;
}
