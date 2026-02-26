import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../../state/counterSlice';
import { RootState } from "../../redux/store";

export default function ProductDetail() {
    const param = useParams();
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(increment());
    };

    const counter = useSelector((state:RootState) => state.counter);

    return (
        <div>
            Hi this is product detail of product id: {param.id}
            <button onClick={handleOnClick}>Increment</button>
            <span>{counter.value}</span>
        </div>
    );
}