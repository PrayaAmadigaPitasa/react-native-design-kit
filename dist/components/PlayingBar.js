import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
export function PlayingBarItem({ barStyle, height }) {
    return (React.createElement(View, { style: StyleSheet.flatten([styles.bar, barStyle, { height: height }]) }));
}
export default function PlayingBar({ bars = [0.5, 0.9, 0.4, 0.8], containerStyle, minHeight = 4, maxHeight = 20, tps = 100, frequency = 1.5, ...props }) {
    const [progress, setProgress] = useState(0);
    const min = Math.min(minHeight, maxHeight);
    const max = Math.max(minHeight, maxHeight);
    const dif = max - min;
    const period = 1000 / tps;
    const increment = (1 / tps) * frequency;
    useEffect(() => {
        const timeout = setTimeout(() => {
            setProgress(progress + (increment % 1));
        }, period);
        return () => {
            clearTimeout(timeout);
        };
    }, [progress]);
    function getHeight(start) {
        const relative = (progress + Math.abs(start)) % 1;
        return min + dif * 2 * (relative > 0.5 ? 1 - relative : relative);
    }
    function ListPlayingBarItem() {
        const list = [];
        for (let index = 0; index < bars.length; index++) {
            const bar = (React.createElement(PlayingBarItem, Object.assign({}, props, { key: index, height: getHeight(bars[index]) })));
            list.push(bar);
        }
        return list;
    }
    return (React.createElement(View, { style: StyleSheet.flatten([
            styles.container,
            containerStyle,
            { height: maxHeight + 1 },
        ]) }, ListPlayingBarItem()));
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    bar: {
        width: 3.5,
        backgroundColor: '#000',
        marginHorizontal: 1,
    },
});
