import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ExpansionPanel} from '../../../src/components';

export interface ExpansionPanelStory {
  panels?: string[];
}

export default function ExpansionPanelStory({
  panels = ['General', 'Profile', 'Language'],
}: ExpansionPanelStory) {
  const [select, setSelect] = useState<string>();

  const handlePress = useCallback(
    (type: string) => {
      setSelect(type === select ? undefined : type);
    },
    [select],
  );

  const handleRenderPanel = useCallback(
    (panel: string) => (
      <ExpansionPanel
        key={panel}
        visible={select === panel}
        title={`${panel} Settings`}
        subtitle="Nisi id ex dolor"
        onPress={() => handlePress(panel)}>
        <Text>
          Et pariatur ut labore culpa nisi fugiat Lorem cupidatat nulla. Aliquip
          voluptate ut laboris ex dolore laborum excepteur ullamco in velit
          velit. Non enim enim sit proident duis voluptate officia labore sunt
          anim excepteur aliqua adipisicing. Aliquip ipsum quis quis consequat
          tempor adipisicing cupidatat nulla officia.
        </Text>
      </ExpansionPanel>
    ),
    [select],
  );

  return (
    <View style={styles.container}>
      {panels.map(panel => handleRenderPanel(panel))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
