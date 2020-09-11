import React, { useEffect, useRef } from 'react';
import { NotifyLayout } from './styled-components';
//import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default function Notice({ text, type = 'success', duration = 4000, callBack }) {
  const noticeRef = useRef(null);
  useEffect(() => {
    if (duration > 0) {
      setTimeout(() => {
        if (noticeRef && noticeRef.current) {
          callBack();
        }
      }, duration);
    }
  });
  const content = (
    <NotifyLayout type={type} ref={noticeRef}>
      <div>{text}</div>
    </NotifyLayout>
  );

  return ReactDOM.createPortal(content, document.querySelector('#modal'));
}

Notice.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  duration: PropTypes.number,
  callBack: PropTypes.func,
};
