import React from 'react';
import Option from './Option';

const Options = props => {
  return (
    <div>
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
      {props.options.length === 0 && <p>Please add an option</p>}
      <button onClick={props.handleDeleteAllOptions}>Remove All</button>
    </div>
  );
};

export default Options;