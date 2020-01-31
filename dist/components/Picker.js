import React, { useState, useEffect } from 'react';
import { Text, Animated, StyleSheet, View, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
function isLayoutValid(layout) {
    const { x, y, width, height, pageX, pageY } = layout;
    return (x !== 0 ||
        y !== 0 ||
        width !== 0 ||
        height !== 0 ||
        pageX !== 0 ||
        pageY !== 0);
}
export default function Picker({ containerStyle, selected, selectedContainerStyle, selectedTitleStyle, dropdownContainerStyle, dropdownItemContainerStyle, dropdownItemSelectedContainerStyle, placeholder = 'Select Option', placeholderColor = '#a9a9a9', titleExtractor, onSelect, renderItem, ...props }) {
    const [selection, setSelected] = useState(selected);
    const [toggle, setToggle] = useState(false);
    const [layout, setLayout] = useState();
    const [buttonRef, setButtonRef] = useState();
    const animation = useState(new Animated.Value(0))[0];
    useEffect(() => {
        Animated.timing(animation, {
            toValue: toggle ? 1 : 0,
            duration: 250,
        }).start();
    }, [toggle]);
    useEffect(() => {
        setSelected(selected);
    }, [selected]);
    return (React.createElement(View, { style: styles.root },
        React.createElement(TouchableOpacity, { ref: instance => instance && setButtonRef(instance), onLayout: () => buttonRef?.measure((x, y, width, height, pageX, pageY) => setLayout({
                x: x,
                y: y,
                width: width,
                height: height,
                pageX: pageX,
                pageY: pageY,
            })), style: StyleSheet.flatten([
                styles.container,
                containerStyle,
                toggle ? [styles.selectedContainer, selectedContainerStyle] : {},
            ]), activeOpacity: 0.5, onPress: () => setToggle(!toggle) },
            React.createElement(Text, { style: StyleSheet.flatten([
                    styles.title,
                    selection !== undefined
                        ? selectedTitleStyle
                        : { color: placeholderColor },
                ]) }, selection !== undefined ? titleExtractor(selection) : placeholder),
            React.createElement(Animated.View, { style: StyleSheet.flatten([
                    styles.chevronContainer,
                    {
                        transform: [
                            {
                                rotateZ: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '-180deg'],
                                }),
                            },
                        ],
                    },
                ]) },
                React.createElement(Icon, { name: 'chevron-down' }))),
        layout !== undefined && isLayoutValid(layout) && (React.createElement(Modal, { visible: toggle, transparent: true },
            React.createElement(TouchableWithoutFeedback, { onPress: () => setToggle(!toggle) },
                React.createElement(View, { style: { height: '100%', width: '100%' } })),
            React.createElement(View, { style: StyleSheet.flatten([
                    styles.dropdownContainer,
                    dropdownContainerStyle,
                    {
                        position: 'absolute',
                        width: layout.width,
                        left: layout.pageX,
                        top: layout.pageY + layout.height,
                        zIndex: 1,
                    },
                ]) },
                React.createElement(FlatList, Object.assign({}, props, { renderItem: info => (React.createElement(TouchableOpacity, { activeOpacity: 0.5, style: StyleSheet.flatten([
                            styles.dropdownItemContainer,
                            dropdownItemContainerStyle,
                            selection !== undefined && selection === info.item
                                ? [
                                    styles.dropdownItemSelectedContainer,
                                    dropdownItemSelectedContainerStyle,
                                ]
                                : {},
                        ]), onPress: () => {
                            setSelected(info.item);
                            setToggle(false);
                            onSelect(info.item);
                        } }, renderItem(info))) })))))));
}
const styles = StyleSheet.create({
    root: {
        zIndex: 1,
    },
    container: {
        flexDirection: 'row',
        padding: 12,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#e4e9f2',
        backgroundColor: '#f7f9fc',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1,
    },
    selectedContainer: {
        borderColor: '#598bff',
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#e4e9f2',
        backgroundColor: '#fff',
        maxHeight: 300,
    },
    dropdownItemContainer: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 8,
        justifyContent: 'center',
    },
    dropdownItemSelectedContainer: {
        backgroundColor: '#f7f9fc',
    },
    chevronContainer: {
        marginLeft: 12,
    },
    title: {
        fontSize: 15,
    },
});
