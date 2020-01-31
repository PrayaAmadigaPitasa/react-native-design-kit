import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
export default function Avatar({ containerStyle, rounded = true, size = 48, style, source, ...props }) {
    return (React.createElement(View, { style: containerStyle },
        React.createElement(Image, Object.assign({}, props, { style: StyleSheet.flatten([
                style,
                { height: size, width: size },
                rounded ? { borderRadius: size / 2 } : {},
            ]), source: source }))));
}
