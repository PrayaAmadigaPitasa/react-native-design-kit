import React from 'react';
import ChipStory, {ChipStoryProps} from './ChipStory';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface ChipAdvancedStoryProps extends ChipStoryProps {}

export default function ChipAdvancedStory({...props}: ChipAdvancedStoryProps) {
  const rare = ['Ackee', 'Cherimoya', 'Durian'];
  const invalid = ['Dragon', 'Elephant'];

  return (
    <ChipStory
      {...props}
      actionType="checkbox"
      chipContainerStyle={id =>
        StyleSheet.flatten([
          styles.chipContainer,
          rare.includes(id) && styles.rareChipContainer,
          invalid.includes(id) && styles.invalidChipContainer,
        ])
      }
      selectedChipContainerStyle={styles.selectedContainer}
      rightIconAction={(id, isSelected) =>
        invalid.includes(id) && !isSelected ? 'delete' : undefined
      }
      leftIcon={info => (info.isSelected ? <Icon name="check" /> : <></>)}
      chips={[
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
      ]}
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
