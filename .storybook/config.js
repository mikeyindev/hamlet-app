import { configure } from '@storybook/react';
import { setOptions } from "@storybook/addon-options";
import '../src/styles/styles.scss';

// Change name of Storybook to 'Hamlet App'
setOptions({
  name: 'Hamlet App'
});

configure(() => require('./stories'), module);