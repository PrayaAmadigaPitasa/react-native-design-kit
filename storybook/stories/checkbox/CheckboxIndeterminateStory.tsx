import React from 'react';
import CheckboxStory, {CheckboxStoryProps} from './CheckboxStory';

export interface CheckboxIndeterminateStoryProps extends CheckboxStoryProps {}

export default function CheckboxIndeterminateStory({
  checkboxIds = [
    {
      title: 'Fruits',
      checkboxIds: [
        'Banana',
        'Melon',
        'Apple',
        'Orange',
        {title: 'Rare', checkboxIds: ['Durian', 'Rambutan']},
      ],
    },
  ],
  ...props
}: CheckboxIndeterminateStoryProps) {
  return <CheckboxStory {...props} checkboxIds={checkboxIds} />;
}
