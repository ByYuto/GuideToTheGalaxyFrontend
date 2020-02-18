import React from 'react';
import { useSelector } from 'react-redux';
export default function Home() {
    const counter = useSelector(state => state.counter.counter);
    return <div>
        <h2>Home</h2>
        <p>El contador va en {counter}</p>
    </div>
}