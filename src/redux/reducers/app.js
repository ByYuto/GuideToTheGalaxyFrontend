const initialState = {
  topBar: {
    visible: true
  }
}

//Action Types
const APP_SET_TOPBAR_DISPLAY = "APP_SET_TOPBAR_DISPLAY";

//Action Creators
export const changeAppTopbarDisplay = (visible) => ({ type: APP_SET_TOPBAR_DISPLAY, payload: { visible } });

//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_SET_TOPBAR_DISPLAY:
      return {
        ...state,
        topBar: {
          ...state.topBar,
          visible: payload.visible
        }
      }
    default:
      return state;
  }
}