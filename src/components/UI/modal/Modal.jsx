import React from 'react';
import { ModalLayout } from './styledComponents';
import { MdClose } from 'react-icons/md';
import Button from '../Button';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default function Modal({
  children,
  title,
  footer,
  header,
  visible = false,
  setVisibility,
  elmWidth,
  elmHeight,
  className,
  okClick,
  textOk,
  textCancel,
}) {
  const displayFooter =
    footer === undefined ? (
      <div className="modal-footer">
        <Button span="24px" rounded modalSecondary onClick={setVisibility}>
          {textCancel ? textCancel : 'Cancel'}
        </Button>
        <Button span="24px" onClick={okClick} rounded>
          {textOk ? textOk : 'Ok'}
        </Button>
      </div>
    ) : (
      footer
    );
  const displayHeader = title ? (
    <div className="modal-header">
      <h4>{title}</h4>
      <MdClose size={24} onClick={setVisibility} />
    </div>
  ) : (
    header
  );
  const content = visible ? (
    <ModalLayout elmHeight={elmHeight} elmWidth={elmWidth} className={className}>
      <div
        className="modal-body"
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            console.log('hola');
            setVisibility();
          }
        }}
      >
        {displayHeader}
        <div className="modal-content">{children}</div>
        {displayFooter}
      </div>
    </ModalLayout>
  ) : null;

  return ReactDOM.createPortal(content, document.querySelector('#modal'));
}

Modal.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.element,
  visible: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired,
  elmWidth: PropTypes.string,
  elmHeight: PropTypes.string,
};
