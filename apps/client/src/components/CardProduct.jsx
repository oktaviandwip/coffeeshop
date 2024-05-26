import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CardProduct({ id, title, image, price, promo }) {
  let navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/detail-product/${id}`)}
      className="relative min-w-[156px] w-full h-[253px] text-center shadow-lg rounded-xl p-3 flex flex-col items-center justify-between"
    >
      <div className="drop-shadow-none">
        <img src={image} alt={title} className="rounded-full drop-shadow-none w-[128px] h-[128px]" />

        {promo ? (
          <p className="px-2 py-1 absolute right-0 top-7 rounded-2xl bg-white text-2xl font-bold">{promo}%</p>
        ) : (
          ''
        )}
      </div>
      <h3 className="font-black text-[22px] leading-6 ">{title}</h3>
      <p className="text-[#6A4029] text-lg font-bold">IDR {price}</p>
    </div>
  );
}
