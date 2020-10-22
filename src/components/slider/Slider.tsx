import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {View, StyleSheet, LayoutRectangle, ViewStyle} from 'react-native';
import {useDidUpdate} from '../../utilities';
import {Icon} from '../icon';
import {Touchable} from '../touchable';

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
  indicatorStyle?: ViewStyle;
  indicatorComponent?: JSX.Element;
  indicatorSubStyle?: ViewStyle;
  indicatorSubComponent?: JSX.Element;
  indicatorContainerStyle?: ViewStyle;
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
  indicatorStyle,
  indicatorComponent,
  indicatorSubStyle,
  indicatorSubComponent,
  indicatorContainerStyle,
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
  const [width, setWidth] = useState<number>();
  const value = useMemo(() => progress * (maxValue - minValue) + minValue, [
    progress,
    maxValue,
    minValue,
  ]);

  useEffect(() => {
    setWidth(undefined);
  }, [trackContainerStyle, button]);

  useDidUpdate(() => {
    onChangeValue && onChangeValue(value, progress);
  }, [value]);

  function setValue(val: number) {
    setProgress(getProgress(val));
  }

  function getProgress(val: number) {
    return (
      (Math.max(minValue, Math.min(maxValue, val)) - minValue) /
      (maxValue - minValue)
    );
  }

  function getIndicatorComponent() {
    const components: JSX.Element[] = [];

    if (numberOfSection > 0) {
      for (let index = 0; index <= numberOfSection; index++) {
        components.push(
          <View key={`{indicatorSection: ${index}}`}>
            {indicatorComponent || (
              <View
                style={StyleSheet.flatten([styles.indicator, indicatorStyle])}
              />
            )}
          </View>,
        );

        if (index < numberOfSection) {
          for (
            let indexSub = 0;
            indexSub < numberOfSubSection - 1;
            indexSub++
          ) {
            components.push(
              <View key={`{indicator: ${index}, sub: ${indexSub}}`}>
                {indicatorSubComponent || (
                  <View
                    style={StyleSheet.flatten([
                      styles.indicator,
                      styles.indicatorSub,
                      indicatorSubStyle,
                    ])}
                  />
                )}
              </View>,
            );
          }
        }
      }
    }

    return components;
  }

  const handlePressButtonLeft = useCallback(
    () =>
      setValue(
        value -
          (buttonValue !== undefined
            ? Math.max(0, buttonValue)
            : (maxValue - minValue) * 0.15),
      ),
    [value, buttonValue, maxValue, minValue],
  );

  const handleRenderButtonLeft = useMemo(
    () =>
      button && (
        <Touchable
          style={StyleSheet.flatten([
            styles.startButtonContainer,
            startButtonContainerStyle,
          ])}
          onPress={handlePressButtonLeft}>
          {startButton || <Icon style={styles.buttonIcon} name="caret-left" />}
        </Touchable>
      ),
    [button, startButtonContainerStyle, startButton, handlePressButtonLeft],
  );

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {handleRenderButtonLeft}
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
                indicatorContainerStyle,
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
                indicatorContainerStyle,
                styles.sectionIndicator,
                styles.sectionIndicatorBottom,
              ])}>
              {getIndicatorComponent()}
            </View>
          )}
        </View>
      )}
      {button && (
        <Touchable
          style={StyleSheet.flatten([
            styles.endButtonContainer,
            endButtonContainerStyle,
          ])}
          onPress={() =>
            setValue(
              value +
                (buttonValue !== undefined
                  ? Math.max(0, buttonValue)
                  : (maxValue - minValue) * 0.15),
            )
          }>
          {endButton || <Icon style={styles.buttonIcon} name="caret-right" />}
        </Touchable>
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
