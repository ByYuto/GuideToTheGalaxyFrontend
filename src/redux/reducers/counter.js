const initialState = {
  counter: 0
}

//Action Types
const INCREMENT = "COUNTER/INCREMENT";

//Action Creators
export const incrementCounter = () => ({ type: INCREMENT });

//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      }
    default:
      return state;
  }
}