import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setMobile } from '../redux/reducers/appState';
const MOBILE_SCREEN = 864;

export const useMobile = () => {
    const {isMobile} = useSelector(store => store.app);
    const dispatch = useDispatch();
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    useEffect(()=>{
        if(window.innerWidth < MOBILE_SCREEN) {
            dispatch(setMobile(true));
        } else {
            dispatch(setMobile(false));
        }

        window.addEventListener('resize', ()=> {
            setScreenSize(window.innerWidth);
        });

        return () => {
            window.removeEventListener('resize', ()=> {
                setScreenSize(window.innerWidth);
            });
        }
    }, [ screenSize]);

    return isMobile;
}

export default useMobile;