import React, { useState, useEffect } from 'react';
import Button from './Button';
import { StyleSheet, View, FlatList, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export function ChipItem({ rounded = true, titleStyle, containerStyle, children, ...props }) {
    const [borderRadius, setBorderRadius] = useState(0);
    return (React.createElement(Button, Object.assign({}, props, { onLayout: event => {
            const { height, width } = event.nativeEvent.layout;
            setBorderRadius(Math.min(height, width) / 2);
        }, containerStyle: StyleSheet.flatten([
            styles.chipContainer,
            containerStyle,
            rounded ? { borderRadius: borderRadius } : {},
        ]), titleStyle: StyleSheet.flatten([styles.chipTitle, titleStyle]), titleContainerStyle: styles.chipTitleContainer, leftIconContainerStyle: styles.chipLeftIconContainer, rightIconContainerStyle: styles.chipRightIconContainer }), children));
}
export default function Chip({ actionType = 'chip', rounded, containerStyle, chips, chipContainerStyle, chipComponent, chipTitleStyle, selectedChipContainerStyle, selectedChipTitleStyle, horizontal, horizontalScrollIndicator = false, horizontalScrollEnabled = true, selectedId, leftIcon, leftIconAction, rightIcon, rightIconAction, onSelect, onPress, activeOpacity = 0.5, ...props }) {
    const [chipIds, setChipIds] = useState(chips);
    const [layout, setLayout] = useState();
    const [size, setSize] = useState();
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [scrollRef, setScrollRef] = useState(null);
    const [selected, setSelected] = useState(selectedId !== undefined ? filterId(selectedId, true) : []);
    useEffect(() => {
        setChipIds(chips);
    }, [chips]);
    useEffect(() => {
        setSelected(selectedId !== undefined ? filterId(selectedId, true) : []);
    }, [selectedId]);
    function checkId(id) {
        return chipIds.indexOf(id) >= 0;
    }
    function isSelected(id) {
        return selected.indexOf(id) >= 0;
    }
    function filterId(id, checkType) {
        const selection = [];
        if (Array.isArray(id)) {
            for (let indexId = 0; indexId < id.length; indexId++) {
                const check = id[indexId];
                if (checkId(check)) {
                    selection.push(check);
                    if (checkType && actionType === 'radio') {
                        return selection;
                    }
                }
            }
        }
        else {
            if (checkId(id)) {
                selection.push(id);
            }
        }
        return selection;
    }
    function allowScrollLeft() {
        return offset !== undefined && offset.x > 0;
    }
    function allowScrollRight() {
        const difSize = getDifSize();
        return difSize !== undefined && offset.x < difSize;
    }
    function getDifSize() {
        return layout !== undefined && size !== undefined
            ? size.x - layout.width
            : undefined;
    }
    function getIcon(id, iconFunction, iconActionFunction) {
        if (iconFunction !== undefined) {
            return iconFunction({ id: id, isSelected: isSelected(id) });
        }
        if (iconActionFunction !== undefined) {
            const action = iconActionFunction(id, isSelected(id));
            if (action === 'delete') {
                return React.createElement(Icon, { style: styles.deleteIcon, name: "times-circle" });
            }
        }
        return undefined;
    }
    function getIconAction(id, iconActionFunction) {
        if (iconActionFunction !== undefined) {
            const action = iconActionFunction(id, isSelected(id));
            if (action === 'delete') {
                return () => removeIconId(id);
            }
            return action;
        }
        return undefined;
    }
    function removeIconId(id) {
        const list = [];
        for (let index = 0; index < chipIds.length; index++) {
            const chipId = chipIds[index];
            if (chipId !== id) {
                list.push(chipId);
            }
        }
        setChipIds(list);
    }
    function getChipItem(id) {
        const component = chipComponent && chipComponent({ id: id, isSelected: isSelected(id) });
        const title = typeof component === 'string'
            ? component
            : component === undefined
                ? id
                : undefined;
        return (React.createElement(ChipItem, Object.assign({}, props, { key: id, containerStyle: StyleSheet.flatten([
                chipContainerStyle,
                isSelected(id)
                    ? StyleSheet.flatten([
                        styles.selectedChipContainer,
                        selectedChipContainerStyle,
                    ])
                    : {},
            ]), title: title, titleStyle: StyleSheet.flatten([
                chipTitleStyle,
                isSelected(id)
                    ? StyleSheet.flatten([
                        styles.selectedChipTitle,
                        selectedChipTitleStyle,
                    ])
                    : {},
            ]), rounded: rounded, leftIcon: getIcon(id, leftIcon, leftIconAction), leftIconAction: getIconAction(id, leftIconAction), rightIcon: getIcon(id, rightIcon, rightIconAction), rightIconAction: getIconAction(id, rightIconAction), onPress: event => {
                onPress !== undefined && onPress(event);
                if (actionType !== 'chip') {
                    if (actionType === 'checkbox') {
                        const selection = [...selected];
                        if (isSelected(id)) {
                            selection.splice(selection.indexOf(id), 1);
                        }
                        else {
                            selection.push(id);
                        }
                        setSelected(selection);
                        onSelect(id, selection);
                    }
                    else {
                        const selection = [id];
                        setSelected([id]);
                        onSelect(id, selection);
                    }
                }
                else {
                    onSelect(id, selected);
                }
            } }), component !== undefined && typeof component !== 'string' && component));
    }
    function getListChipItem() {
        const list = [];
        for (let index = 0; index < chipIds.length; index++) {
            const id = chipIds[index];
            const chip = getChipItem(id);
            list.push(chip);
        }
        return list;
    }
    return horizontal ? (React.createElement(View, { style: StyleSheet.flatten([containerStyle, styles.containerNoWrap]) },
        React.createElement(TouchableOpacity, { activeOpacity: activeOpacity, disabled: !allowScrollLeft(), onPress: () => {
                if (scrollRef !== null) {
                    scrollRef.scrollToOffset({
                        offset: Math.max(0, offset.x - 125),
                        animated: true,
                    });
                }
            } },
            React.createElement(View, { style: StyleSheet.flatten([
                    styles.scrollContainer,
                    styles.scrollLeftIconContainer,
                    !allowScrollLeft() ? styles.scrollContainerDisabled : {},
                ]) },
                React.createElement(Icon, { name: "chevron-left" }))),
        React.createElement(FlatList, { ref: instance => setScrollRef(instance), onLayout: event => setLayout(event.nativeEvent.layout), data: chipIds, horizontal: true, scrollEnabled: horizontalScrollEnabled, onContentSizeChange: (w, h) => setSize({ x: w, y: h }), onScroll: event => {
                setOffset(event.nativeEvent.contentOffset);
            }, contentContainerStyle: styles.sectionWrap, showsHorizontalScrollIndicator: horizontalScrollIndicator, keyExtractor: item => item, renderItem: ({ item }) => getChipItem(item) }),
        React.createElement(TouchableOpacity, { activeOpacity: activeOpacity, disabled: !allowScrollRight(), onPress: () => {
                const difSize = getDifSize();
                if (scrollRef !== null && difSize !== undefined) {
                    scrollRef.scrollToOffset({
                        offset: Math.min(difSize, offset.x + 125),
                        animated: true,
                    });
                }
            } },
            React.createElement(View, { style: StyleSheet.flatten([
                    styles.scrollContainer,
                    styles.scrollRightIconContainer,
                    !allowScrollRight() ? styles.scrollContainerDisabled : {},
                ]) },
                React.createElement(Icon, { name: "chevron-right" }))))) : (React.createElement(View, { style: StyleSheet.flatten([containerStyle, styles.containerWrap]) }, getListChipItem()));
}
const styles = StyleSheet.create({
    containerWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    containerNoWrap: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    chipContainer: {
        padding: 7.5,
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: '#dcdcdc',
    },
    chipTitle: {
        fontWeight: 'normal',
        color: '#000',
    },
    chipTitleContainer: {
        marginHorizontal: 5,
    },
    chipLeftIconContainer: {
        marginRight: 0,
    },
    chipRightIconContainer: {
        marginLeft: 0,
    },
    scrollContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#efefef',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainerDisabled: {
        opacity: 0.2,
    },
    scrollLeftIconContainer: {
        marginRight: 5,
    },
    scrollRightIconContainer: {
        marginLeft: 5,
    },
    selectedChipContainer: {
        backgroundColor: '#598bff',
    },
    selectedChipTitle: {
        color: '#222b45',
    },
    sectionWrap: {
        alignItems: 'center',
    },
    deleteIcon: {
        fontSize: 20,
        color: '#696969',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
