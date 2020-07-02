import React from "react";
import Modal from "react-modal";
import { FiCheckCircle } from "react-icons/fi";
import './styles.css';

interface Properties {
  isOpen: boolean;
  closed: () => void;
}

const SuccessModal: React.FC<Properties> = ({ isOpen, closed }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closed}
    >
      <div className="container">
        <FiCheckCircle size={54} color="#34CB79" />
        <h1>Successfully registered!</h1>
      </div>
    </Modal>
  );
};

export default SuccessModal;