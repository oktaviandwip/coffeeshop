import React from "react";
import {useEffect} from "react"
import {useLocation} from "react-router-dom"
import iconCoffee from "../../src/assets/icons/coffee 1.png"

export default function Header() {
  const location = useLocation()

  useEffect(()=>{
    //styling navigasi link
    const navlink = document.querySelectorAll(".nav-link")

    for (let i = 0; i < navlink.length; i++) {
      navlink[i].classList.remove("text-brown", "font-bold");
      navlink[i].classList.add("text-[#4F5665]", "normal");
    }

    if(location.pathname == "/"){
      document.querySelector("#home").classList.add("text-brown", "font-bold")
    }
    //tambahkan pages lainnya
  }, [])
  

  return(
    <header className="flex flex-row justify-between px-40 py-10">
      <a className="w-1/4 flex flex-row gap-x-2 justify-start items-center" href="/">
        <img src={iconCoffee} alt="icon coffee" />
        <span className=" font-bold text-[20px] font-[#0B132A]">Coffee Shop</span>
      </a>
      <nav className="w-1/2 flex">
        <ul className="w-full flex flex-row justify-center items-center gap-x-10">
          <li><a id="home" className="nav-link text-[#4F5665]" href="">Home</a></li>
          <li><a id="product" className="nav-link text-[#4F5665]" href="">Product</a></li>
          <li><a id="your-cart" className="nav-link text-[#4F5665]" href="">Your Cart</a></li>
          <li><a id="history" className="nav-link text-[#4F5665]" href="">History</a></li>
        </ul>
      </nav>
      <div className="w-1/4 flex justify-end items-center gap-x-8">
        <a className="font-[500] text-[#0B132A] text-base" href="">Login</a>
        <a className="bg-yellow rounded-[50px] px-10 py-3 text-[#6A4029] font-[500] shadow-2xl" href="">Sign Up</a>
      </div>
    </header>
  )
}