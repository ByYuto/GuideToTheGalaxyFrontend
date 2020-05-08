import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeAppTopbarDisplay } from '../redux/reducers/appState';

const useHideTopbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeAppTopbarDisplay(false));

    return () => {
      dispatch(changeAppTopbarDisplay(true));
    };
  }, [dispatch]);
};

export default useHideTopbar;
