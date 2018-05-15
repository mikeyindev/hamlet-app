import { configure } from '@storybook/react';
import { setOptions } from "@storybook/addon-options";
import '../src/styles/styles.scss';

setOptions({
  name: 'Hamlet App'
});

const req = require.context("../stories", true, /.stories.js$/);

const loadStories = () => {
  // require('../stories/Action.stories.js');
  // require('../stories/AddOption.stories.js');
  // require('../stories/HamletApp.stories.js');
  // require('../stories/Header.stories.js');
  // require('../stories/Option.stories.js');
  // require('../stories/OptionModal.stories.js');
  // require('../stories/Options.stories.js');

  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);