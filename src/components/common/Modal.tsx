import React from 'react';
import ReactModal from 'react-modal';
import '../../css/components/common/modal.css';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

/**
 * Modal component for displaying content in a modal window.
 *
 * @param {boolean} isOpen
 * @param {() => void} onRequestClose
 * @param {React.ReactNode} children
 * @returns {JSX.Element}
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <button className="modal-close-button" onClick={onRequestClose}>
        &times;
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;