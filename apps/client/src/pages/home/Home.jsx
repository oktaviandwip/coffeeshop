import React from "react";
import Header from "../../components/Header";
import iconLove from "../../assets/icons/icon-love.png"
import iconPerson from "../../assets/icons/icon-person.png"
import iconMap from "../../assets/icons/icon-map.png"
import imageTeamWork from "../../assets/images/image-teamwork.png"

export default function Home() {
  return(
    <>
      <Header/>
      {/* hero/jumbotron */}
      <div className="relative bg-heroHome bg-cover bg-no-repeat flex flex-col px-40 pt-16 pb-52">
        <div className="text-white flex flex-col gap-y-5">
          <h3 className="w-[45%]  text-[50px] font-bold">Start Your Day with Coffee and Good Meals</h3>
          <p className="w-[44%]  text-[20px] font-bold">We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!</p>
          <a className="w-fit p-5 px-10 bg-yellow text-brown text-base font-bold rounded-[10px] hover:bg-orange-400" href="">Get Started</a>
        </div>
        {/* overlay */}
        <div className="absolute -bottom-[15%] left-40 w-[1140px] flex flex-row bg-white rounded-md h-[200px] shadow-2xl py-10">
          <div className="flex gap-x-8 justify-center items-center w-1/3 border-r-4 border-[#EEEFF2]">
            <div className="grid justify-center items-center w-[55px] h-[55px] bg-yellow rounded-full">
              <img className="" src={iconPerson} alt="" />
            </div>
            <div className="flex flex-col w-fit">
              <span className="text-[#0B132A] font-bold text-[25px]">90+</span>
              <p className="text-[#4F5665] text-[20px]">Staff</p>
            </div>
          </div>
          <div className="flex gap-x-8 justify-center items-center w-1/3">
            <div className="grid justify-center items-center w-[55px] h-[55px] bg-yellow rounded-full">
              <img className="" src={iconMap} alt="" />
            </div>
            <div className="flex flex-col w-fit">
              <span className="text-[#0B132A] font-bold text-[25px]">30+</span>
              <p className="text-[#4F5665] text-[20px]">Stores</p>
            </div>
          </div>
          <div className="flex gap-x-8 justify-center items-center w-1/3 border-l-4 border-[#EEEFF2]">
            <div className="grid justify-center items-center w-[55px] h-[55px] bg-yellow rounded-full">
              <img className="" src={iconLove} alt="" />
            </div>
            <div className="flex flex-col w-fit">
              <span className="text-[#0B132A] font-bold text-[25px]">800+</span>
              <p className="text-[#4F5665] text-[20px]">Customers</p>
            </div>
          </div>
        </div>
      </div>
      <main>
        <section className="flex flex-row justify-between px-40 pt-56 pb-16">
          <div className="w-[45%]">
            <img src={imageTeamWork} alt="image" />
          </div>
          <div className="w-[45%] flex flex-col gap-y-4 pt-8">
            <h3 className="text-[#0B132A] font-[500] text-[35px]">We Provide Good Coffee and Healthy Meals</h3>
            <p className="text-[#4F5665] text-base">You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
            <ul className="flex flex-col gap-y-4 text-[#4F5665] text-[14px]">
              <li className="flex flex-row gap-x-4"><span className="w-[24px] h-[24px] text-center text-white bg-green-700 rounded-full">&#10003;</span>High quality beans</li>
              <li className="flex flex-row gap-x-4"><span className="w-[24px] h-[24px] text-center text-white bg-green-700 rounded-full">&#10003;</span>Healthy meals, you can request the ingredients</li>
              <li className="flex flex-row gap-x-4"><span className="w-[24px] h-[24px] text-center text-white bg-green-700 rounded-full">&#10003;</span>Chat with our staff to get better experience for ordering</li>
              <li className="flex flex-row gap-x-4"><span className="w-[24px] h-[24px] text-center text-white bg-green-700 rounded-full">&#10003;</span>Free member card with a minimum purchase of IDR 200.000.</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}