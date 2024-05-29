import React from 'react';
import ProductBanner from '../assets/product-image.png';

export default function PaymentMethod({ id, name }) {
  return (
    <div className="flex mt-5">
      <input type="radio" name="payment_method" id={id} value={id} className="accent-secondary" />
      <label htmlFor={id} className="flex ml-3 items-center">
        <div className={`flex justify-center items-center rounded-xl p-3 bg-red-500`}>
          <img src={ProductBanner} alt="{label}" className="w-10 h-10" />
        </div>
        <p className="text-xl ml-3">{name}</p>
      </label>
    </div>
  );
}
