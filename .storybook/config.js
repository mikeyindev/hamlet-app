import { configure } from '@storybook/react';
import '../src/styles/styles.scss';

const loadStories = () => {
  require('../stories/Action.stories.js');
  require('../stories/AddOption.stories.js');
}

configure(loadStories, module);