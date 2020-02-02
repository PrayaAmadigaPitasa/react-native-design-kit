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
  startButton?: JSX.Element;
  startButtonContainerStyle?: ViewStyle;
  endButton?: JSX.Element;
  endButtonContainerStyle?: ViewStyle;
  thumb?: JSX.Element;
  thumbContainerStyle?: ViewStyle;
  trackContainerStyle?: ViewStyle;
  indicator?: boolean;
  numberOfSection?: number;
  numberOfSubSection?: number;
  onChangeValue(value: number, progress: number): void;
}

export default function Slider({
  containerStyle,
  minValue = 0,
  minTrackContainerStyle,
  maxValue = 100,
  maxTrackContainerStyle,
  initialValue,
  button,
  buttonValue,
  startButton,
  startButtonContainerStyle,
  endButton,
  endButtonContainerStyle,
  thumb,
  thumbContainerStyle,
  trackContainerStyle,
  indicator,
  numberOfSection = 10,
  numberOfSubSection = 2,
  onChangeValue,
}: SliderProps) {
  const [progress, setProgress] = useState(
    (initialValue !== undefined && getProgress(initialValue)) || 0.25,
  );
  const [startProgress, setStartProgress] = useState(progress);
  const [thumbLayout, setThumbLayout] = useState<LayoutRectangle>();
  const [pageX, setPageX] = useState<number>();
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(undefined);
  }, [trackContainerStyle, button]);

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
          style={StyleSheet.flatten([
            styles.startButtonContainer,
            startButtonContainerStyle,
          ])}
          activeOpacity={0.5}
          onPress={() =>
            setValue(
              getValue() -
                (buttonValue !== undefined
                  ? Math.max(0, buttonValue)
                  : (maxValue - minValue) * 0.15),
            )
          }>
          {startButton || <Icon style={styles.buttonIcon} name="caret-left" />}
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
                setPageX(event.nativeEvent.pageX);
                setStartProgress(progress);
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
                styles.thumbContainer,
                thumbContainerStyle,
                styles.sectionThumb,
                {
                  left:
                    progress * width -
                    (thumbLayout !== undefined ? thumbLayout.width / 2 : 0),
                },
              ])}>
              {thumb || <View style={styles.thumb} />}
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
          style={StyleSheet.flatten([
            styles.endButtonContainer,
            endButtonContainerStyle,
          ])}
          activeOpacity={0.5}
          onPress={() =>
            setValue(
              getValue() +
                (buttonValue !== undefined
                  ? Math.max(0, buttonValue)
                  : (maxValue - minValue) * 0.15),
            )
          }>
          {endButton || <Icon style={styles.buttonIcon} name="caret-right" />}
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
    backgroundColor: 'green',
  },
  trackContainerMax: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: 'lightgray',
  },
  startButtonContainer: {
    paddingVertical: 2,
    paddingRight: 4,
    marginRight: 6,
  },
  endButtonContainer: {
    paddingVertical: 2,
    paddingLeft: 4,
    marginLeft: 6,
  },
  thumbContainer: {
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'darkgray',
  },
  thumb: {
    height: 20,
    width: 7.5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'darkgray',
  },
  indicator: {
    width: 1.5,
    height: 12,
    backgroundColor: 'lightgray',
  },
  indicatorSub: {
    height: 5,
  },
});
