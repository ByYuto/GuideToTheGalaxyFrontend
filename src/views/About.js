import React from "react";
import { incrementCounter } from "../redux/reducers/counter";
import { useDispatch, useSelector } from "react-redux";

export default function About() {
  const counter = useSelector(state => state.counter.counter);
  const dispatch = useDispatch();
  function onButtonClick() {
    dispatch(incrementCounter());
  }
  return (
    <div>
      <h2>About</h2>
      <p>Counter goes to {counter}</p>
      <button onClick={onButtonClick}>Press me</button>
    </div>
  );
}
