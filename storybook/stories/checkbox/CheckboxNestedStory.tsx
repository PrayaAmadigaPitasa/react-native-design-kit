import React from 'react';
import CheckboxStory, {CheckboxStoryProps} from './CheckboxStory';

export interface CheckboxNestedStoryProps extends CheckboxStoryProps {}

export default function CheckboxNestedStory({
  checkboxIds = [
    {
      title: 'Fruits',
      checkboxIds: [
        'Banana',
        'Melon',
        'Apple',
        'Orange',
        {
          title: 'Rare',
          checkboxIds: [
            'Durian',
            'Rambutan',
            {title: 'Super Rare', checkboxIds: ['Super Fruit']},
          ],
        },
      ],
    },
  ],
  defaultIds = ['Melon', 'Rambutan'],
  ...props
}: CheckboxNestedStoryProps) {
  return (
    <CheckboxStory
      {...props}
      checkboxIds={checkboxIds}
      defaultIds={defaultIds}
    />
  );
}
