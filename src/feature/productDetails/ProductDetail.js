import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../../redux/counterSlice';

export default function ProductDetail() {
    const param = useParams();
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(increment());
    };

    const counter = useSelector((state) => state.value);

    return (
        <div>
            Hi this is product detail of product id: {param.id}
            <button onClick={handleOnClick}>Increment</button>
            <span>{counter}</span>
        </div>
    );
}