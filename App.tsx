import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import StoryBook from './storybook';

export default function App() {
  useMemo(() => Icon.loadFont(), []);

  return <StoryBook />;
}
