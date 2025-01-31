import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Checkout() {
  const counter = useSelector((state)=> state.value)
  
  return (
    <div>
      This is checkout page
      <span>{counter}</span>
    </div>
  )
}
