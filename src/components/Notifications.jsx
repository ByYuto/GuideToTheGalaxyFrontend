import React from 'react';
import { updateToast } from '../redux/reducers/appState';
import { useSelector, useDispatch } from 'react-redux';
import Notice from './UI/notice/Notice';

export default function Notifications() {
  const { showToast, toastType, toastMessage } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  return showToast ? (
    <Notice
      duration={3000}
      type={toastType}
      text={toastMessage}
      callBack={() => dispatch(updateToast(false, '', 'error'))}
    />
  ) : null;
}
