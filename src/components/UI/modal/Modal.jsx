import React from 'react';
import { ModalLayout } from './styledComponents';
import { MdClose } from 'react-icons/md';
import Button from '../Button';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default function Modal({ children, title, footer, visible = false, setVisibility, elmWidth, elmHeight }) {
  const displayFooter = footer ? (
    footer
  ) : (
    <div className="modal-footer">
      <Button span="24px" rounded secondary onClick={setVisibility}>
        Cancel
      </Button>
      <Button span="24px" rounded>
        Ok
      </Button>
    </div>
  );

  const content = visible ? (
    <ModalLayout elmHeight={elmHeight} elmWidth={elmWidth}>
      <div className="modal-body">
        <div className="modal-header">
          <h4>{title}</h4>
          <MdClose size={24} onClick={setVisibility} />
        </div>
        <div className="modal-content">{children}</div>
        {displayFooter}
      </div>
    </ModalLayout>
  ) : null;

  return ReactDOM.createPortal(content, document.querySelector('#modal'));
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  footer: PropTypes.element,
  visible: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired,
  elmWidth: PropTypes.string,
  elmHeight: PropTypes.string,
};
