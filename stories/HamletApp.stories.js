import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import HamletApp from "../src/components/HamletApp";

storiesOf("HamletApp", module).add("default", () => <HamletApp />);
