import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import Action from '../src/components/Action';

storiesOf('Action', module).add('enabled', () => (
  <Action onClick={action('clicked')} hasOptions={true} />
));

storiesOf("Action", module).add("disabled", () => (
  <Action onClick={action("clicked")} hasOptions={false} />
));