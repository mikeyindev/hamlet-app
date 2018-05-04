import React from 'react';
import Option from './Option';

const Options = props => {
  return <div>
      <div className="widget-header">
        <h3 className="widget-header__h3">Your Options</h3>
        <button className="button--link" onClick={props.handleDeleteAllOptions}>
          Remove All
        </button>
      </div>
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
      {props.options.length === 0 && <p>Please add an option</p>}
    </div>;
};

export default Options;