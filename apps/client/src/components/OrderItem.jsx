import React from 'react';

export default function OrderItem({ image, title, price, size, quantity }) {
  return (
    <div className="flex justify-between p-5 font-rubik text-black items-center">
      <div className="flex items-center gap-x-2">
        <img src={image} alt="" className="w-[88px] h-[88px] rounded-xl" />
        <div className="text-base">
          <p>{title}</p>
          <p>{quantity}</p>
          <p>{size}</p>
        </div>
      </div>
      <p className="">{price}</p>
    </div>
  );
}
