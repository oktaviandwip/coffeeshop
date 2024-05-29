import React from 'react';
import iconCoffee from '../assets/icons/coffee 1.png';
import iconFb from '../assets/icons/icon-fb.png';
import iconIg from '../assets/icons/icon-ig.png';
import iconTwitter from '../assets/icons/icon-twitter.png';

export default function FooterSign() {
  const years = new Date().getFullYear();

  return (
    <div className="font-rubik flex md:flex-row flex-col gap-y-8 md:justify-between bg-[#F8F8F8] py-20 pb-0 md:pb-20 md:px-14 px-8">
      <div className="md:w-[45%] flex flex-col gap-y-5">
        <div className="flex flex-row gap-x-2 items-center ">
          <img src={iconCoffee} alt="icon coffee" />
          <span className=" font-bold text-[20px] font-[#0B132A]">Coffee Shop</span>
        </div>
        <p className="text-[#4F5665] text-base font-[500] leading-7">
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
        <p className="hidden md:flex text-[#AFB5C0] text-base mt-5">©{years}CoffeeStore</p>
      </div>
      <div className="md:w-[45%] flex flex-col gap-y-10">
        <div className="flex flex-col">
          <p className="text-[#0B132A] text-[18px] font-[500]">Product</p>
          <div className="text-[#4F5665] mt-5 grid md:grid-cols-2 grid-cols-4 gap-y-4">
            <a href="">Download</a>
            <a href="">Pricing</a>
            <a href="">Locations</a>
            <a href="">Countries</a>
            <a href="">Blog</a>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[#0B132A] text-[18px] font-[500]">Engage</p>
          <div className="text-[#4F5665] mt-5 grid md:grid-cols-2 grid-cols-2 gap-x-3 gap-y-4">
            <a href="">Coffee Shop ?</a>
            <a href="">About Us</a>
            <a href="">FAQ</a>
            <a href="">Privacy Policy</a>
            <a href="">Terms of Service</a>
          </div>
        </div>
      </div>
      <p className="block md:hidden text-[#AFB5C0] text-base text-center p-5">©{years} Coffee Store</p>
    </div>
  );
}
