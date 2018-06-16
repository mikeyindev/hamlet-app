import React from 'react';

const Option = (props) => {
  return (
    <div className="option">
      <div className="option__wrapper">
        <input className="option--checkbox" type="checkbox" />
        <p className="option__text">
          {props.count}. {props.optionText}
        </p>
      </div>
      <button className="button--link" onClick={() => props.handleDeleteOption(props.optionText)}>
        Remove
      </button>
    </div>
  );
};

export default Option;