import React from 'react';
import Option from './Option';

const Options = props => {
  console.log(props.options);
  return <div>
      <div className="widget-header">
        <h3 className="widget-header__h3">Your Tasks</h3>
        <button className="button__link" onClick={props.handleDeleteAllOptions}>
          Remove All
        </button>
      </div>
      {props.options.map((option, index) => (
        <Option
          key={option.id}
          option={option}
          // optionText={option.text}
          count={index + 1}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
      {!props.uid && 
        <p className="widget-message">Please <a role="button" className="button__link" onClick={props.handleLogin}>login</a> to get started :)</p>}
      {props.uid && props.options.length === 0 && <p className="widget-message">Please add a task to get started :)</p>}
    </div>;
};

export default Options;