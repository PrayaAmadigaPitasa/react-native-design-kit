import React, {useState, useMemo, useCallback, ReactNode} from 'react';
import {View, ViewStyle, GestureResponderEvent} from 'react-native';
import RadioItem, {RadioBaseProps} from './RadioItem';

export interface RadioInfo {
  id: string;
  isSelected: boolean;
}

export interface RadioProps extends RadioBaseProps {
  containerStyle?: ViewStyle;
  radioIds: string[];
  radioComponent?(info: RadioInfo): ReactNode;
  defaultId?: string;
  onSelect(id: string): void;
}

export default function Radio({
  containerStyle,
  radioIds,
  radioComponent,
  defaultId,
  onSelect,
  onPress,
  ...props
}: RadioProps) {
  const [selected, setSelected] = useState(defaultId);

  const handlePressRadioItem = useCallback(
    (id: string, event: GestureResponderEvent) => {
      onPress && onPress(event);
      onSelect(id);
      setSelected(id);
    },
    [onPress, onSelect],
  );

  const handleRenderRadioItem = useCallback(
    (id: string) => {
      const isSelected = selected === id;
      const component = radioComponent && radioComponent({id, isSelected});
      const title =
        typeof component === 'string'
          ? component
          : component === undefined
          ? id
          : undefined;

      return (
        <RadioItem
          {...props}
          testID="radio-item"
          key={id}
          title={title}
          isSelected={isSelected}
          onPress={event => handlePressRadioItem(id, event)}>
          {component !== undefined &&
            typeof component !== 'string' &&
            component}
        </RadioItem>
      );
    },
    [props, selected, radioComponent, handlePressRadioItem],
  );

  const handleRenderListRadioItem = useMemo(
    () => radioIds.map(value => handleRenderRadioItem(value)),
    [radioIds, handleRenderRadioItem],
  );

  return <View style={containerStyle}>{handleRenderListRadioItem}</View>;
}
