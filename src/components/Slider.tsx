import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  LayoutRectangle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface SliderProps {
  containerStyle?: ViewStyle;
  minValue?: number;
  minTrackContainerStyle?: ViewStyle;
  maxValue?: number;
  maxTrackContainerStyle?: ViewStyle;
  initialValue?: number;
  button?: boolean;
  buttonValue?: number;
  trackContainerStyle?: ViewStyle;
  indicator?: boolean;
  numberOfSection?: number;
  numberOfSubSection?: number;
  onChangeValue?(value: number, progress: number): void;
}

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
}: SliderProps) {
  const [progress, setProgress] = useState(getProgress(initialValue));
  const [startProgress, setStartProgress] = useState(progress);
  const [thumbLayout, setThumbLayout] = useState<LayoutRectangle>();
  const [pageX, setPageX] = useState<number>();
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(undefined);
  }, [trackContainerStyle]);

  useEffect(() => {
    onChangeValue !== undefined && onChangeValue(getValue(), progress);
  }, [progress]);

  function setValue(value: number) {
    setProgress(getProgress(value));
  }

  function getProgress(value: number) {
    return (
      (Math.max(minValue, Math.min(maxValue, value)) - minValue) /
      (maxValue - minValue)
    );
  }

  function getValue() {
    return progress * (maxValue - minValue) + minValue;
  }

  function getIndicatorComponent() {
    const indicatorComponent: JSX.Element[] = [];

    if (numberOfSection > 0) {
      for (let index = 0; index <= numberOfSection; index++) {
        indicatorComponent.push(
          <View
            key={`{indicatorSection: ${index}}`}
            style={styles.indicator}
          />,
        );

        if (index < numberOfSection) {
          for (
            let indexSub = 0;
            indexSub < numberOfSubSection - 1;
            indexSub++
          ) {
            indicatorComponent.push(
              <View
                key={`{indicator: ${index}, sub: ${indexSub}}`}
                style={StyleSheet.flatten([
                  styles.indicator,
                  styles.indicatorSub,
                ])}
              />,
            );
          }
        }
      }
    }

    return indicatorComponent;
  }

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {button && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            setValue(
              getValue() -
                (buttonValue !== undefined
                  ? Math.max(0, buttonValue)
                  : (maxValue - minValue) * 0.15),
            )
          }>
          <View style={styles.buttonLeftIconContainer}>
            <Icon style={styles.buttonIcon} name="caret-left" />
          </View>
        </TouchableOpacity>
      )}
      {width === undefined ? (
        <View style={styles.trackDefaultBaseContainer}>
          <View
            onLayout={event => setWidth(event.nativeEvent.layout.width)}
            style={trackContainerStyle}
          />
        </View>
      ) : (
        <View style={styles.sectionTrackContainer}>
          {indicator && (
            <View
              style={StyleSheet.flatten([
                styles.sectionIndicator,
                styles.sectionIndicatorTop,
              ])}>
              {getIndicatorComponent()}
            </View>
          )}
          <View style={styles.sectionTrack}>
            <View
              style={StyleSheet.flatten([
                styles.trackContainer,
                trackContainerStyle,
                styles.trackContainerMin,
                minTrackContainerStyle,
                {width: progress * width},
              ])}
            />
            <View
              style={StyleSheet.flatten([
                styles.trackContainer,
                trackContainerStyle,
                styles.trackContainerMax,
                maxTrackContainerStyle,
                {width: (1 - progress) * width},
              ])}
            />
            <View
              onLayout={event => {
                setThumbLayout(event.nativeEvent.layout);
              }}
              onStartShouldSetResponder={() => true}
              onResponderStart={event => {
                setPageX(event.nativeEvent.pageX), setStartProgress(progress);
              }}
              onResponderMove={event => {
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
              }}
              style={StyleSheet.flatten([
                styles.sectionThumb,
                {
                  left:
                    progress * width -
                    (thumbLayout !== undefined ? thumbLayout.width / 2 : 0),
                },
              ])}>
              <View style={styles.thumb} />
            </View>
          </View>
          {indicator && (
            <View
              style={StyleSheet.flatten([
                styles.sectionIndicator,
                styles.sectionIndicatorBottom,
              ])}>
              {getIndicatorComponent()}
            </View>
          )}
        </View>
      )}
      {button && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            setValue(
              getValue() +
                (buttonValue !== undefined
                  ? Math.max(0, buttonValue)
                  : (maxValue - minValue) * 0.15),
            )
          }>
          <View style={styles.buttonRightIconContainer}>
            <Icon style={styles.buttonIcon} name="caret-right" />
          </View>
        </TouchableOpacity>
      )}
    </View>
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
