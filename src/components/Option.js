import React from 'react';

const Option = (props) => {
  return (
    <div className="option">
      {props.optionText}
      <button className="button--link" onClick={() => props.handleDeleteOption(props.optionText)}>
        Remove
      </button>
    </div>
  );
};

export default Option;