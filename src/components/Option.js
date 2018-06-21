import React from 'react';

const Option = (props) => {
  return (
    <div className="option">
      <div className="option-wrapper">
        <input className="option__checkbox" type="checkbox" />
        <p className="option__text">
          {props.count}. {props.option.text}
        </p>
      </div>
      <button className="button__link" onClick={() => props.handleDeleteOption(props.option.id)}>
        Remove
      </button>
    </div>
  );
};

export default Option;