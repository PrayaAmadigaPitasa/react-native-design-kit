import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Slider({
  containerStyle,
  minValue = 0,
  minTrackContainerStyle,
  maxValue = 100,
  maxTrackContainerStyle,
  initialValue = 25,
  button,
  buttonValue,
  trackContainerStyle,
  indicator,
  numberOfSection = 10,
  numberOfSubSection = 2,
  onChangeValue,
}) {
  const [progress, setProgress] = useState(getProgress(initialValue));
  const [startProgress, setStartProgress] = useState(progress);
  const [thumbLayout, setThumbLayout] = useState();
  const [pageX, setPageX] = useState();
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(undefined);
  }, [trackContainerStyle]);
  useEffect(() => {
    onChangeValue !== undefined && onChangeValue(getValue(), progress);
  }, [progress]);
  function setValue(value) {
    setProgress(getProgress(value));
  }
  function getProgress(value) {
    return (
      (Math.max(minValue, Math.min(maxValue, value)) - minValue) /
      (maxValue - minValue)
    );
  }
  function getValue() {
    return progress * (maxValue - minValue) + minValue;
  }
  function getIndicatorComponent() {
    const indicatorComponent = [];
    if (numberOfSection > 0) {
      for (let index = 0; index <= numberOfSection; index++) {
        indicatorComponent.push(
          React.createElement(View, {
            key: `{indicatorSection: ${index}}`,
            style: styles.indicator,
          }),
        );
        if (index < numberOfSection) {
          for (
            let indexSub = 0;
            indexSub < numberOfSubSection - 1;
            indexSub++
          ) {
            indicatorComponent.push(
              React.createElement(View, {
                key: `{indicator: ${index}, sub: ${indexSub}}`,
                style: StyleSheet.flatten([
                  styles.indicator,
                  styles.indicatorSub,
                ]),
              }),
            );
          }
        }
      }
    }
    return indicatorComponent;
  }
  return React.createElement(
    View,
    {style: StyleSheet.flatten([styles.container, containerStyle])},
    button &&
      React.createElement(
        TouchableOpacity,
        {
          activeOpacity: 0.5,
          onPress: () =>
            setValue(
              getValue() -
                (buttonValue !== undefined
                  ? Math.max(0, buttonValue)
                  : (maxValue - minValue) * 0.15),
            ),
        },
        React.createElement(
          View,
          {style: styles.buttonLeftIconContainer},
          React.createElement(Icon, {
            style: styles.buttonIcon,
            name: 'caret-left',
          }),
        ),
      ),
    width === undefined
      ? React.createElement(
          View,
          {style: styles.trackDefaultBaseContainer},
          React.createElement(View, {
            onLayout: event => setWidth(event.nativeEvent.layout.width),
            style: trackContainerStyle,
          }),
        )
      : React.createElement(
          View,
          {style: styles.sectionTrackContainer},
          indicator &&
            React.createElement(
              View,
              {
                style: StyleSheet.flatten([
                  styles.sectionIndicator,
                  styles.sectionIndicatorTop,
                ]),
              },
              getIndicatorComponent(),
            ),
          React.createElement(
            View,
            {style: styles.sectionTrack},
            React.createElement(View, {
              style: StyleSheet.flatten([
                styles.trackContainer,
                trackContainerStyle,
                styles.trackContainerMin,
                minTrackContainerStyle,
                {width: progress * width},
              ]),
            }),
            React.createElement(View, {
              style: StyleSheet.flatten([
                styles.trackContainer,
                trackContainerStyle,
                styles.trackContainerMax,
                maxTrackContainerStyle,
                {width: (1 - progress) * width},
              ]),
            }),
            React.createElement(
              View,
              {
                onLayout: event => {
                  setThumbLayout(event.nativeEvent.layout);
                },
                onStartShouldSetResponder: () => true,
                onResponderStart: event => {
                  setPageX(event.nativeEvent.pageX), setStartProgress(progress);
                },
                onResponderMove: event => {
                  if (pageX !== undefined) {
                    setProgress(
                      Math.max(
                        0,
                        Math.min(
                          1,
                          startProgress +
                            (event.nativeEvent.pageX - pageX) / width,
                        ),
                      ),
                    );
                  }
                },
                style: StyleSheet.flatten([
                  styles.sectionThumb,
                  {
                    left:
                      progress * width -
                      (thumbLayout !== undefined ? thumbLayout.width / 2 : 0),
                  },
                ]),
              },
              React.createElement(View, {style: styles.thumb}),
            ),
          ),
          indicator &&
            React.createElement(
              View,
              {
                style: StyleSheet.flatten([
                  styles.sectionIndicator,
                  styles.sectionIndicatorBottom,
                ]),
              },
              getIndicatorComponent(),
            ),
        ),
    button &&
      React.createElement(
        TouchableOpacity,
        {
          activeOpacity: 0.5,
          onPress: () =>
            setValue(
              getValue() +
                (buttonValue !== undefined
                  ? Math.max(0, buttonValue)
                  : (maxValue - minValue) * 0.15),
            ),
        },
        React.createElement(
          View,
          {style: styles.buttonRightIconContainer},
          React.createElement(Icon, {
            style: styles.buttonIcon,
            name: 'caret-right',
          }),
        ),
      ),
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackDefaultBaseContainer: {
    flex: 1,
  },
  trackContainer: {
    height: 8,
    overflow: 'hidden',
  },
  trackContainerMin: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#390',
  },
  trackContainerMax: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: '#dddddd',
  },
  buttonLeftIconContainer: {
    marginRight: 10,
  },
  buttonRightIconContainer: {
    marginLeft: 10,
  },
  sectionTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  sectionTrackContainer: {
    zIndex: 1,
  },
  sectionThumb: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionIndicatorTop: {
    alignItems: 'flex-end',
  },
  sectionIndicatorBottom: {
    alignItems: 'flex-start',
  },
  buttonIcon: {
    fontSize: 20,
    color: '#888',
  },
  thumb: {
    height: 20,
    width: 7.5,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#888',
  },
  indicator: {
    width: 1.5,
    height: 12,
    backgroundColor: '#dddddd',
  },
  indicatorSub: {
    height: 5,
  },
});
