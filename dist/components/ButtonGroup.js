import React, { useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import Button from './Button';
export default function ButtonGroup({ type = 'solid', actionType = 'button', buttonIds, buttonComponent, buttonContainerStyle, buttonTitleStyle, containerStyle, containerBorderRadius, standbyButtonRaised, selectedButtonRaised, selectedButtonContainerStyle, selectedButtonTitleStyle, selectedId, onPress, onSelect, ...props }) {
    const [selected, setSelected] = useState(selectedId !== undefined ? filterId(selectedId, true) : []);
    useEffect(() => {
        setSelected(selectedId !== undefined ? filterId(selectedId, true) : []);
    }, [selectedId]);
    function checkId(id) {
        return buttonIds.indexOf(id) >= 0;
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
            selection.push(id);
        }
        return selection;
    }
    function getButtonGroupItem(id, index) {
        const component = buttonComponent && buttonComponent({ id: id, isSelected: isSelected(id) });
        const title = typeof component === 'string'
            ? component
            : component === undefined
                ? id
                : undefined;
        return (React.createElement(Button, Object.assign({}, props, { key: id, type: type, raised: isSelected(id) ? selectedButtonRaised : standbyButtonRaised, containerStyle: StyleSheet.flatten([
                styles.buttonContainer,
                buttonContainerStyle,
                isSelected(id)
                    ? StyleSheet.flatten([
                        styles.selectedButtonContainer,
                        selectedButtonContainerStyle,
                    ])
                    : {},
                index === 0
                    ? {
                        borderTopLeftRadius: containerBorderRadius,
                        borderBottomLeftRadius: containerBorderRadius,
                    }
                    : {},
                index === buttonIds.length - 1
                    ? {
                        borderTopRightRadius: containerBorderRadius,
                        borderBottomRightRadius: containerBorderRadius,
                    }
                    : {},
            ]), title: title, titleStyle: StyleSheet.flatten([
                buttonTitleStyle,
                isSelected(id)
                    ? type !== 'solid'
                        ? StyleSheet.flatten([
                            styles.selectedTitle,
                            selectedButtonTitleStyle,
                        ])
                        : selectedButtonTitleStyle
                    : {},
            ]), onPress: event => {
                onPress !== undefined && onPress(event);
                if (actionType !== 'button') {
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
                        setSelected(selection);
                        onSelect(id, selection);
                    }
                }
                else {
                    onSelect(id, selected);
                }
            } }), component !== undefined && typeof component !== 'string' && component));
    }
    function getListButton() {
        const list = [];
        for (let index = 0; index < buttonIds.length; index++) {
            const id = buttonIds[index];
            const button = getButtonGroupItem(id, index);
            list.push(button);
        }
        return list;
    }
    return (React.createElement(View, { style: StyleSheet.flatten([styles.container, containerStyle]) }, getListButton()));
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    buttonContainer: {
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#194bbf',
    },
    selectedButtonContainer: {
        backgroundColor: '#295bcf',
    },
    selectedTitle: {
        color: '#092b9f',
    },
});
