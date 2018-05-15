import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Options from "../src/components/Options";

const options = ['Option 1', 'Option 2', 'Option 3'];

storiesOf("Options", module).add("default", () => <Options options={options} />);
