/// <reference types="react" />
import { FlatListProps, ViewStyle, TextStyle } from 'react-native';
export interface PickerDataSelection {
    key: string;
    title?: string;
}
export interface PickerProps<ItemT> extends FlatListProps<ItemT> {
    containerStyle?: ViewStyle;
    selected?: ItemT;
    selectedContainerStyle?: ViewStyle;
    selectedTitleStyle?: TextStyle;
    dropdownContainerStyle?: ViewStyle;
    dropdownItemContainerStyle?: ViewStyle;
    dropdownItemSelectedContainerStyle?: ViewStyle;
    placeholder?: string;
    placeholderColor?: string;
    titleExtractor(item: ItemT): string;
    onSelect(item: ItemT): void;
}
export default function Picker<ItemT>({ containerStyle, selected, selectedContainerStyle, selectedTitleStyle, dropdownContainerStyle, dropdownItemContainerStyle, dropdownItemSelectedContainerStyle, placeholder, placeholderColor, titleExtractor, onSelect, renderItem, ...props }: PickerProps<ItemT>): JSX.Element;
