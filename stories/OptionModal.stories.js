import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import OptionModal from "../src/components/OptionModal";

const selectedOption = 'Option 1';

storiesOf("OptionModal", module).add("default", () => <OptionModal selectedOption={selectedOption} clearSelectedOption={selectedOption}/>);
