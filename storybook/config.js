import {configure, addDecorator} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';

addDecorator(withKnobs);

configure(
  () => [
    require('./guides/GetStarted.stories.mdx'),
    require('./guides/About.stories.mdx'),
  ],
  module,
);
