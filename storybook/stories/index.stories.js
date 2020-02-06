import {configure} from '@storybook/react-native';

configure(
  () => [
    require('./avatar/index.stories'),
    require('./button/index.stories'),
    require('./button-group/index.stories'),
    require('./chip/index.stories'),
    require('./input/index.stories'),
    require('./input-otp/index.stories'),
  ],
  module,
);
