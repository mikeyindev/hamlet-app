import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById("app"));

const OptionModal = (props) => {
  // console.log(props);
  return (
  // onRequestClose allows users to click outside the modal or hit the esc button to close the modal
  <Modal 
    isOpen={!!props.selectedOption} 
    onRequestClose={props.clearSelectedOption}
    closeTimeoutMS={300}
    className="OptionModal"
  >
    <h3 className="OptionModal__title">Hamlet has picked for you:</h3>
      {props.selectedOption && <p className="OptionModal__body">{props.selectedOption}</p>}
    <button 
      className="button OptionModal__button" 
      onClick={props.clearSelectedOption}
    >
      Ok
    </button>
  </Modal>
  );
};

export default OptionModal;