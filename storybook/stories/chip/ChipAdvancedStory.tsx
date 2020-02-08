import React from 'react';
import ChipStory, {ChipStoryProps} from './ChipStory';
import {StyleSheet} from 'react-native';

export interface ChipAdvancedStoryProps extends ChipStoryProps {
  rare?: string[];
  invalid?: string[];
}

export default function ChipAdvancedStory({
  rare = ['Ackee', 'Cherimoya', 'Durian'],
  invalid = ['Dragon', 'Elephant'],
  chips = [
    'Apple',
    'Ackee',
    'Melon',
    'Dragon',
    'Pear',
    'Elephant',
    'Banana',
    'Cherimoya',
    'Grape',
    'Peach',
    'Durian',
    'Orange',
  ],
  actionType = 'checkbox',
  chipContainerStyle,
  selectedChipContainerStyle,
  rightIconAction,
  leftIconAction,
  ...props
}: ChipAdvancedStoryProps) {
  return (
    <ChipStory
      {...props}
      chips={chips}
      actionType={actionType}
      chipContainerStyle={id =>
        StyleSheet.flatten([
          styles.chipContainer,
          typeof chipContainerStyle === 'function'
            ? chipContainerStyle(id)
            : chipContainerStyle,
          rare.includes(id) && styles.rareChipContainer,
          invalid.includes(id) && styles.invalidChipContainer,
        ])
      }
      selectedChipContainerStyle={id =>
        StyleSheet.flatten([
          styles.selectedContainer,
          typeof selectedChipContainerStyle === 'function'
            ? selectedChipContainerStyle(id)
            : selectedChipContainerStyle,
        ])
      }
      rightIconAction={
        rightIconAction !== undefined
          ? rightIconAction
          : (id, isSelected) =>
              invalid.includes(id) && !isSelected ? 'delete' : undefined
      }
      leftIconAction={
        leftIconAction !== undefined ? leftIconAction : () => 'check'
      }
    />
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    width: '30%',
  },
  rareChipContainer: {
    backgroundColor: 'gold',
  },
  invalidChipContainer: {
    borderColor: 'red',
    borderWidth: 1,
  },
  selectedContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});
