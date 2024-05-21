import React from 'react';
import ProductBanner from '../assets/product-image.png';
import Footer from './Footer';
import Header from './Header';

function History() {
  return (
    <>
      <Header />
      <main className="p-12 md:px-40 lg:px-32 xl:px-72 2xl:px-80 font-rubik text-base bg-bg-cart bg-center bg-cover bg-no-repeat">
        <h1
          className="text-4xl mb-3 text-center text-white font-bold"
          style={{ textShadow: '4px 4px 0px rgba(0,0,0,.8)' }}
        >
          Let’s see what you have bought!
        </h1>
        <p className="text-white mb-14 text-xl text-center ">Long press to delete item</p>
        <div className="grid grid-cols-3 gap-4">
          <CardHistory />
          <CardHistory />
          <CardHistory />
          <CardHistory />
          <CardHistory />
        </div>
      </main>
      <Footer />
    </>
  );
}

export const CardHistory = () => {
  return (
    <div className="bg-white p-4 rounded-2xl flex gap-3 w-full items-start">
      <img src={ProductBanner} alt="" className="w-[75] h-[75px] rounded-full" />
      <div className="w-full h-fit">
        <h3 className="text-[25px] font-semibold mb-2 text-start w-full">Veggie tomato mix</h3>
        <p className="text-lg text-start text-[#895537]">IDR 34.000</p>
        <p className="text-lg mb-3 text-start text-[#895537]">Delivered</p>
      </div>
    </div>
  );
};

export default History;
