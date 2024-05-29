import React from 'react';
import BankAccountIcon from '../assets/icons/BankIcon.svg';
import CodIcon from '../assets/icons/COD.png';
import CardIcon from '../assets/icons/cardIcon.svg';

export default function PaymentMethod({ id, name }) {
  let icons;

  switch (name) {
    case 'Bank account':
      icons = {
        bgColor: 'bg-[#895537]',
        icon: BankAccountIcon,
      };
      break;
    case 'Cash on delivery':
      icons = {
        bgColor: 'bg-[#FFBA33]',

        icon: CodIcon,
      };
      break;
    case 'Card':
      icons = {
        bgColor: 'bg-[#F47B0A]',
        icon: CardIcon,
      };
      break;
  }
  return (
    <div className="flex mt-5">
      <input type="radio" name="payment_method" id={id} value={id} className="accent-secondary" />
      <label htmlFor={id} className="flex ml-3 items-center">
        <div className={`flex justify-center items-center rounded-xl p-3 ${icons.bgColor}`}>
          <img src={icons.icon} alt="{label}" className="w-10 h-10" />
        </div>
        <p className="text-xl ml-3">{name}</p>
      </label>
    </div>
  );
}
