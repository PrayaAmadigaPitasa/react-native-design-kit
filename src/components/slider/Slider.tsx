import React, {useState, useMemo, useCallback, ReactElement} from 'react';
import {
  View,
  StyleSheet,
  LayoutRectangle,
  ViewStyle,
  GestureResponderEvent,
  Insets,
} from 'react-native';
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
  hitSlop?: Insets;
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
  hitSlop = {top: 10, bottom: 10},
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

  function setValue(val: number) {
    setProgress(getProgress(val));
  }

  function getProgress(val: number) {
    return (
      (Math.max(minValue, Math.min(maxValue, val)) - minValue) /
      (maxValue - minValue)
    );
  }

  const handleRenderIndicator = useMemo(() => {
    const components: ReactElement[] = [];

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
        for (let indexSub = 0; indexSub < numberOfSubSection - 1; indexSub++) {
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

    return components;
  }, [
    numberOfSection,
    numberOfSubSection,
    indicatorComponent,
    indicatorSubComponent,
    indicatorStyle,
    indicatorSubStyle,
  ]);

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

  const handlePressButtonRight = useCallback(
    () =>
      setValue(
        value +
          (buttonValue !== undefined
            ? Math.max(0, buttonValue)
            : (maxValue - minValue) * 0.15),
      ),
    [value, buttonValue, maxValue, minValue],
  );

  const handleResponderStart = useCallback(
    (event: GestureResponderEvent) => {
      if (width !== undefined) {
        setPageX(event.nativeEvent.pageX);
        setStartProgress(event.nativeEvent.locationX / width);
      }
    },
    [width, progress],
  );

  const handleResponderMove = useCallback(
    (event: GestureResponderEvent) => {
      if (pageX !== undefined && width !== undefined) {
        setProgress(
          Math.max(
            0,
            Math.min(
              1,
              startProgress + (event.nativeEvent.pageX - pageX) / width,
            ),
          ),
        );
      }
    },
    [pageX, width],
  );

  const handleRenderButtonLeft = useMemo(
    () =>
      button && (
        <Touchable
          testID="button-start"
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

  const handleRenderButtonRight = useMemo(
    () =>
      button && (
        <Touchable
          testID="button-end"
          style={StyleSheet.flatten([
            styles.endButtonContainer,
            endButtonContainerStyle,
          ])}
          onPress={handlePressButtonRight}>
          {endButton || <Icon style={styles.buttonIcon} name="caret-right" />}
        </Touchable>
      ),
    [button, endButtonContainerStyle, endButton, handlePressButtonRight],
  );

  const handleRenderTopIndicator = useMemo(
    () =>
      indicator && (
        <View
          style={StyleSheet.flatten([
            indicatorContainerStyle,
            styles.sectionIndicator,
            styles.sectionIndicatorTop,
          ])}>
          {handleRenderIndicator}
        </View>
      ),
    [indicator, indicatorContainerStyle, handleRenderIndicator],
  );

  const handleRenderBottomIndicator = useMemo(
    () =>
      indicator && (
        <View
          style={StyleSheet.flatten([
            indicatorContainerStyle,
            styles.sectionIndicator,
            styles.sectionIndicatorBottom,
          ])}>
          {handleRenderIndicator}
        </View>
      ),
    [indicator, indicatorContainerStyle, handleRenderIndicator],
  );

  const handleRenderThumb = useMemo(
    () =>
      width ? (
        <View
          testID="thumb-container"
          onLayout={event => setThumbLayout(event.nativeEvent.layout)}
          style={StyleSheet.flatten([
            styles.thumbContainer,
            thumbContainerStyle,
            styles.sectionThumb,
            {
              left:
                progress * width - (thumbLayout ? thumbLayout.width / 2 : 0),
              opacity: thumbLayout ? 1 : 0,
            },
          ])}>
          {thumb || <View style={styles.thumb} />}
        </View>
      ) : null,
    [thumb, thumbContainerStyle, width, progress, width, thumbLayout],
  );

  const handleRenderSlider = useMemo(
    () => (
      <View
        testID="track-container"
        style={styles.sectionTrackContainer}
        pointerEvents="box-only"
        onStartShouldSetResponder={() => true}
        onResponderStart={handleResponderStart}
        onResponderMove={handleResponderMove}
        hitSlop={hitSlop}
        onLayout={event => setWidth(event.nativeEvent.layout.width)}>
        {handleRenderTopIndicator}
        <View style={styles.sectionTrack}>
          <View
            style={StyleSheet.flatten([
              styles.trackContainer,
              trackContainerStyle,
              styles.trackContainerMin,
              minTrackContainerStyle,
              {width: `${progress * 100}%`},
            ])}
          />
          <View
            style={StyleSheet.flatten([
              styles.trackContainer,
              trackContainerStyle,
              styles.trackContainerMax,
              maxTrackContainerStyle,
              {width: `${(1 - progress) * 100}%`},
            ])}
          />
          {handleRenderThumb}
        </View>
        {handleRenderBottomIndicator}
      </View>
    ),
    [
      trackContainerStyle,
      trackContainerStyle,
      minTrackContainerStyle,
      maxTrackContainerStyle,
      progress,
      handleRenderThumb,
      handleRenderTopIndicator,
      handleRenderBottomIndicator,
      handleResponderStart,
      handleResponderMove,
    ],
  );

  useDidUpdate(() => {
    onChangeValue && onChangeValue(value, progress);
  }, [value]);

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {handleRenderButtonLeft}
      {handleRenderSlider}
      {handleRenderButtonRight}
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
    flex: 1,
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
