import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import iconCoffee from '../../src/assets/icons/coffee 1.png';
import { logout } from '../../src/store/reducer/user';
import iconArrowRight from '../assets/icons/arrow-right.png';
import iconHumberger from '../assets/icons/humberger.png';
import iconShoppingCart from '../assets/icons/shopping-cart.png';
import iconPerson from '../assets/images/no-photo-profile.png';
import useApi from '../utils/useApi';

export default function Header() {
  const { isAuthUser, isAuthAdmin, userId, token } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const api = useApi();

  const [photoProfile, setPhotoProfile] = useState('');
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const openSideNav = () => {
    const elmConSideNav = document.querySelector('.con-side-nav');
    const elmSideNav = document.querySelector('.side-nav');

    elmConSideNav.classList.remove('opacity-0', 'pointer-events-none');
    elmSideNav.classList.remove('-translate-x-full', 'pointer-events-none');
  };

  const closeSideNav = () => {
    document.addEventListener('click', function (e) {
      const elmConSideNav = document.querySelector('.con-side-nav');
      const elmSideNav = document.querySelector('.side-nav');

      if (e.target.id == 'con-side-nav') {
        elmSideNav.classList.add('-translate-x-full', 'pointer-events-none');
        setTimeout(() => {
          elmConSideNav.classList.add('opacity-0', 'pointer-events-none');
        }, 300);
      }
    });
  };

  const getProfile = () => {
    api({
      method: 'GET',
      url: `/users/profile/header/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        setUserEmail(data.data.email);
        setUserName(data.data.display_name);
        setPhotoProfile(data.data.photo_profile);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    closeSideNav();
    getProfile();
  }, []);

  return (
    <header className="font-rubik sticky top-0 md:px-40 px-10 md:py-10 py-5 border-b-[1px] border-[#9f9f9f56] bg-white z-50">
      <div
        id="con-side-nav"
        className="con-side-nav fixed left-0 top-0 md:static w-screen md:w-full h-screen md:h-auto z-50 opacity-0 md:opacity-100 pointer-events-none bg-[#00000080] md:bg-transparent"
      >
        <div
          id="side-nav"
          className="side-nav fixed left-0 -translate-x-full md:translate-x-0 md:static h-full w-[65%] md:w-full md:h-auto flex md:flex-row flex-col-reverse justify-end md:justify-between z-100 rounded-tr-3xl bg-[#F2F2F2] md:bg-transparent ease-linear duration-300 pointer-events-none md:pointer-events-auto"
        >
          {/* button sign out mobile */}
          {isAuthUser || isAuthAdmin ? (
            <div className=" md:hidden flex flex-col items-start justify-center h-1/3 px-5">
              <button
                className="flex justify-center items-center gap-x-2"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logout());
                }}
              >
                <span className="text-brown text-base">Sign Out</span>
                <img src={iconArrowRight} alt="" />
              </button>
            </div>
          ) : (
            ''
          )}
          <a className="hidden md:flex w-1/4 flex-row gap-x-2 justify-start items-center" href="/">
            <img src={iconCoffee} alt="icon coffee" />
            <span className=" font-bold text-[20px] font-[#0B132A]">Coffee Shop</span>
          </a>
          <nav className="md:w-1/2 w-full h-1/3 md:h-auto flex">
            <ul className="w-full h-full md:h-auto flex md:flex-row flex-col items-start md:justify-center md:items-center gap-x-10 px-5">
              {HeaderLinks.map((link, i) => (
                <HeaderLink key={i} {...link} />
              ))}
            </ul>
          </nav>
          <div className="md:w-1/4 flex md:justify-end items-center md:gap-x-8 rounded-tr-3xl">
            {isAuthUser || isAuthAdmin ? (
              <>
                <div>
                  <img src="" alt="" />
                </div>
                <div className="relative w-full md:w-auto group cursor-pointer md:flex justify-end">
                  <div className="flex flex-col justify-center items-center gap-y-2 p-5 py-10 md:p-0 bg-brown rounded-e-3xl md:rounded-none md:bg-transparent">
                    <img
                      className="w-[60px] h-[60px] rounded-full"
                      src={photoProfile ? photoProfile : iconPerson}
                      alt="image user"
                    />
                    <p className="md:hidden text-base text-white font-medium">
                      {userName ? userName : isAuthAdmin ? 'admin' : 'User'}
                    </p>
                    <p className="md:hidden text-sm text-white">{userEmail ? userEmail : ''}</p>
                  </div>
                  <span className="md:hidden group-hover:flex md:absolute top-full left-0 flex flex-col md:h-fit md:shadow-xl hover:shadow-2xl px-5 md:px-0 md:bg-white md:py-5 md:pb-2 mt-0 rounded-[4px] z-30">
                    <Link
                      className="font-light px-0 md:px-5 py-2 hover:bg-neutral-100 border-b-[0.3px] md:border-none"
                      to="/profile"
                    >
                      Profile
                    </Link>
                    <a
                      className="hidden md:inline-block text-nowrap font-light px-5 py-2 hover:bg-neutral-100"
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(logout());
                      }}
                    >
                      Sign out
                    </a>
                  </span>
                </div>
              </>
            ) : (
              <div className="w-full md:w-auto flex md:gap-x-8 gap-x-3 md:justify-center items-center px-5 md:p-0 py-5 md:py-0 bg-brown md:bg-transparent rounded-tr-3xl md:rounded-none">
                <Link
                  className="font-[500] text-white md:text-[#0B132A] text-sm md:text-base border md:border-none px-4 py-2 md:px-0 rounded-md"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="md:bg-yellow md:rounded-[50px] md:px-10 md:py-3 md:text-[#6A4029] text-sm md:text-base font-[500] md:shadow-2xl text-white border px-4 py-2 md:p-0 rounded-md"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile icon */}
      <div className="md:hidden w-full flex justify-between">
        <button onClick={openSideNav}>
          <img src={iconHumberger} alt="humberger" />
        </button>
        {isAuthUser ? (
          <Link to="/your-cart">
            <img src={iconShoppingCart} alt="Shopping Cart" />
          </Link>
        ) : (
          ''
        )}
      </div>
    </header>
  );
}

const HeaderLinks = [
  {
    title: 'Home',
    route: '/',
  },
  {
    title: 'Product',
    route: '/product',
  },
  {
    title: 'Your Cart',
    route: '/your-cart',
  },
  {
    title: 'History',
    route: '/history',
  },
];

const HeaderLink = ({ title, route }) => {
  const location = useLocation();

  const isActiveRoute = location.pathname === route;
  return (
    <li className="w-full md:w-auto py-2 md:py-auto border-b-[0.3px] md:border-none">
      <Link to={route} className={`nav-link text-[#4F5665] ${isActiveRoute ? 'text-brown font-bold' : ''}`}>
        {title}
      </Link>
    </li>
  );
};
