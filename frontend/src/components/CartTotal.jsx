import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);
    const subtotal = getCartAmount();
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className='w-full'>
        <div className="text-2xl mb-4">
         <Title text1={'ORDER'} text2={'SUMMARY'}/> 
        </div>

        <div className="flex flex-col gap-4 text-sm bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-100">
            <div className="flex justify-between items-center text-gray-600">
              <p>Subtotal</p>
              <p className="font-medium text-gray-900">{currency} {subtotal}.00</p>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <p>Shipping Fee</p>
              <p className="font-medium text-gray-900">{currency} {delivery_fee}.00</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center">
              <b className="text-lg text-gray-800">Total</b>
              <b className="text-xl text-primary">{currency} {total}.00</b>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 text-center">
               Shipping & taxes calculated at checkout
            </div>
        </div>
    </div>
  );
}

export default CartTotal;
