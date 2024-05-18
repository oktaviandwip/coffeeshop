import React from "react";
import iconCoffee from "../../assets/icons/coffee 1.png"
import iconGoogle from "../../assets/icons/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png"
import FooterSign from "../../components/FooterSign";

function SignUp() {
  return(
      <main className="flex md:flex-row w-screen font-rubik">
          <section className="bg-heroSign bg-left-top bg-cover bg-no-repeat w-1/2 h-auto border overflow-x-hidden">
          </section>
          <section className=" w-1/2 flex flex-col overflow-x-hidden">
            <div className="flex flex-col pt-10 ps-10 pe-12">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-x-2 justify-center items-center ">
                  <img src={iconCoffee} alt="icon coffee" />
                  <span className=" font-bold text-[20px] font-[#0B132A]">Coffee Shop</span>
                </div>
                <h1 className=" text-[35px] font-bold text-brown font-[#6A4029]">Sign Up</h1>
              </div>
              <div className="flex flex-col m-20 mb-16 ">
                <form className="flex flex-col gap-y-3 " action="">
                  <div className="flex flex-col gap-y-2">
                    <label className=" text-[#4F5665] font-bold text-[20px] " htmlFor="email" >Email Adress :</label>
                    <input className="text-[20px] border border-[#4F5665] rounded-[20px] py-5 px-5 focus:outline-none focus:border-brown focus:ring-brown focus:ring-1 placeholder:text-[#9F9F9F] placeholder:text-[20px] placeholder:font-normal" type="text" name="email" id="email" placeholder="Enter your email adress" /> 
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className=" text-[#4F5665] font-bold text-[20px] " htmlFor="password">Password :</label>
                    <input className="text-[20px] border border-[#4F5665] rounded-[20px] py-5 px-5 focus:outline-none focus:border-brown focus:ring-brown focus:ring-1 placeholder:text-[#9F9F9F] placeholder:text-[20px] placeholder:font-normal" type="password" name="password" id="password" placeholder="Enter your password" />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className=" text-[#4F5665] font-bold text-[20px] " htmlFor="phone" >Phone Number :</label>
                    <input className="text-[20px] border border-[#4F5665] rounded-[20px] py-5 px-5 focus:outline-none focus:border-brown focus:ring-brown focus:ring-1 placeholder:text-[#9F9F9F] placeholder:text-[20px] placeholder:font-normal" type="tel" name="phone" id="phone" placeholder="Enter your phone number" />
                  </div>
                  <button className="text-[20px] text-brown font-bold bg-yellow rounded-[20px] py-5 px-5 mt-5 hover:bg-amber-500" type="submit">Sign Up</button>
                </form>
                <button className=" flex flex-row gap-x-2 justify-center items-center shadow-shadow-button hover:shadow-md text-[17px] text-black font-bold rounded-[20px] py-5 px-5 mt-5" type="button"><img src={iconGoogle} alt="icon google"/> Sign up with Google</button>
                <div className="flex flex-row justify-between items-center mt-12">
                  <span className="w-[28%] h-[2px] bg-[#C4C4C4]"></span>
                  <p className="text-[#9F9F9F] text-nowrap ">Already have an account?</p>
                  <span className="w-[28%] h-[2px] bg-[#C4C4C4]"></span>
                </div>
                <a className=" text-center text-[20px] text-white font-bold bg-brown rounded-[20px] py-5 px-5 mt-12 shadow-shadow-button hover:bg-orange-950"  href="">Login Here</a>
              </div>
            </div>
            <FooterSign/>
          </section>
      </main>
  )
}

export default SignUp;