import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById("app"));

const OptionModal = (props) => {
  console.log(props);
  return (
  // onRequestClose allows users to click outside the modal or hit the esc button to close the modal
  <Modal isOpen={!!props.selectedOption} 
        onRequestClose={props.clearSelectedOption}
        closeTimeoutMS={300}
        className="modal">
    <h3 className="modal__title">Selected Option</h3>
    {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
    <button onClick={props.clearSelectedOption}>Ok</button>
  </Modal>
  );
};

export default OptionModal;