import React from 'react';
import iconCoffee from '../assets/icons/coffee 1.png';
import iconFb from '../assets/icons/icon-fb.png';
import iconIg from '../assets/icons/icon-ig.png';
import iconTwitter from '../assets/icons/icon-twitter.png';

export default function Footer() {
  const years = new Date().getFullYear();

  return (
    <footer className="relative font-rubik bg-[#F8F8F8] md:pt-40 py-10 md:px-40 px-6 -z-20">
      <div className='flex md:flex-row flex-col gap-y-10 md:justify-between'>
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-row gap-x-2 md:items-center ">
            <img src={iconCoffee} alt="icon coffee" />
            <span className=" font-bold text-[20px] font-[#0B132A]">Coffee Shop</span>
          </div>
          <p className="md:w-1/2 w-full text-[#4F5665] text-base font-[500] leading-7">
            Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans
          </p>
          <div className="flex flex-row gap-x-4">
            <a href="" className="flex flex-row bg-brown rounded-full border border-brown">
              <img className="" src={iconFb} alt="" />
            </a>
            <a href="" className="flex flex-row bg-brown rounded-full border border-brown">
              <img className="" src={iconTwitter} alt="" />
            </a>
            <a href="" className="flex flex-row bg-brown rounded-full border border-brown">
              <img className="" src={iconIg} alt="" />
            </a>
          </div>
        </div>
        <div className="md:w-1/2 w-full flex md:justify-end">
          <div className="w-full flex flex-row md:gap-x-40 justify-between md:justify-end">
            <div className="flex flex-col">
              <p className="text-[#0B132A] text-[18px] font-[500]">Product</p>
              <div className="text-[#4F5665] mt-5 grid grid-cols-1 gap-y-4">
                <a href="">Download</a>
                <a href="">Pricing</a>
                <a href="">Locations</a>
                <a href="">Countries</a>
                <a href="">Blog</a>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-[#0B132A] text-[18px] font-[500]">Engage</p>
              <div className="text-[#4F5665] mt-5 grid grid-cols-1 gap-y-4">
                <a href="">Coffee Shop ?</a>
                <a href="">About Us</a>
                <a href="">FAQ</a>
                <a href="">Privacy Policy</a>
                <a href="">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-[#AFB5C0] text-base text-center md:text-left md:mt-5 mt-10">©{years}CoffeeStore</p>
    </footer>
  );
}
