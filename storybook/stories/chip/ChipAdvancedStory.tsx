import React from 'react';
import ChipStory, {ChipStoryProps} from './ChipStory';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface ChipAdvancedStoryProps extends ChipStoryProps {}

export default function ChipAdvancedStory({...props}: ChipAdvancedStoryProps) {
  const rare = ['Ackee', 'Cherimoya', 'Durian'];
  const invalid = ['Dragon', 'Bear'];

  return (
    <ChipStory
      {...props}
      actionType="checkbox"
      chipContainerStyle={id =>
        StyleSheet.flatten([
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
        'Bear',
        'Banana',
        'Cherimoya',
        'Grape',
        'Peach',
        'Durian',
        'Orange',
        'Apricot',
      ]}
    />
  );
}

const styles = StyleSheet.create({
  rareChipContainer: {
    backgroundColor: 'gold',
  },
  invalidChipContainer: {
    backgroundColor: 'crimson',
  },
  selectedContainer: {
    backgroundColor: 'transparent',
  },
});
