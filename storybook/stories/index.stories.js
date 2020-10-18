import {configure} from '@storybook/react-native';

configure(
  () => [
    require('./avatar/index.stories'),
    require('./badge/index.stories'),
    require('./button/index.stories'),
    require('./button-group/index.stories'),
    require('./checkbox/index.stories'),
    require('./chip/index.stories'),
    require('./expansion-panel/index.stories'),
    require('./header/index.stories'),
    require('./input/index.stories'),
    require('./input-otp/index.stories'),
    require('./marquee/index.stories'),
    require('./modal/index.stories'),
    require('./picker/index.stories'),
    require('./playing-bar/index.stories'),
    require('./radio/index.stories'),
    require('./slider/index.stories'),
    require('./stepper/index.stories'),
    require('./switchable-text/index.stories'),
  ],
  module,
);
