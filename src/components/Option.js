import React from 'react';

const Option = (props) => {
  return <div className="Option">
      <div className="Option__wrapper">
        <input className="Option__checkbox" type="checkbox" />
        <p className="Option__text">
          {props.count}. {props.option.text}
        </p>
      </div>
      <button className="button--link" onClick={() => props.handleDeleteOption(props.option.id)}>
        Remove
      </button>
    </div>;
};

export default Option;