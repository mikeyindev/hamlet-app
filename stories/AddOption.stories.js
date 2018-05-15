import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AddOption from "../src/components/AddOption";

storiesOf("AddOption", module).add("default", () => (
  <AddOption />
));