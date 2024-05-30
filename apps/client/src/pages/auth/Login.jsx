import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import iconCoffee from '../../assets/icons/coffee 1.png';
import iconGoogle from '../../assets/icons/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png';
import imageHeroLoginMobile from '../../assets/images/lady-having-coffee 1.png';
import Alert from '../../components/Alert';
import FooterSign from '../../components/FooterSign';
import Loading from '../../components/Loading';
import { loginAdmin, loginUser } from '../../store/reducer/user';
import useApi from '../../utils/useApi';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useApi();

  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isAuthUser, isAuthAdmin } = useSelector((state) => state.users);

  useEffect(() => {
    if (isAuthUser) {
      navigate('/');
    }

    if (isAuthAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAuthUser, isAuthAdmin]);

  const changeHanlder = (e) => {
    const data = { ...userData };
    data[e.target.name] = e.target.value;
    setUserData(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    api({
      method: 'POST',
      url: '/auth/',
      data: userData,
    })
      .then(({ data }) => {
        setLoading(false);
        setMessage('Login Berhasil');
        const { token, role } = jwtDecode(data.data.token);
        setTimeout(() => {
          if (role == 'admin') {
            dispatch(loginAdmin(data.data));
          } else {
            dispatch(loginUser(data.data));
          }
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);

          if (err.message == 'Network Error') {
            setMessage('Maaf, sedang perbaikan server');
            return;
          }

          if (err.response.data.description != 'undefined') {
            setMessage(err.response.data.description);
            return;
          }

          setMessage('Periksa koneksi anda');
        }, 300);
      });
  };

  return (
    <main className="flex md:flex-row w-screen font-rubik">
      <section className="hidden md:flex bg-heroSign bg-left-top bg-cover bg-no-repeat md:w-1/2 h-auto border overflow-x-hidden"></section>
      <section className=" w-full md:w-1/2 flex flex-col overflow-x-hidden bg-[#F2F2F2] md:bg-white">
        <div className="flex flex-col pt-10 ps-5 md:gap-y-16 md:gap-y-0 md:ps-10 pe-5 md:pe-12">
          <div className="hidden md:flex flex-row justify-between px-3">
            <a className="flex flex-row gap-x-2 justify-center items-center " href="/">
              <img src={iconCoffee} alt="icon coffee" />
              <span className=" font-bold text-base md:text-[20px] font-[#0B132A]">Coffee Shop</span>
            </a>
            <h1 className=" text-lg md:text-[35px] font-bold text-brown font-[#6A4029]">Login</h1>
          </div>
          <div className="flex justify-center items-center md:hidden pt-0">
            <div className="w-3/4 relative">
              <img className="w-[60%]" src={imageHeroLoginMobile} alt="image" />
              <span className="absolute w-1/2 top-20 right-0 text-[3.5rem] font-bold leading-[3.5rem]">Log in</span>
            </div>
          </div>
          <div className="flex flex-col md:p-20 mb-16 p-3">
            <form className="flex flex-col md:gap-y-7 gap-y-2" action="" onSubmit={submitHandler}>
              <div className="flex flex-col gap-y-2">
                <label
                  className=" hidden md:flex text-[#4F5665] md:font-bold text-base md:text-[20px] "
                  htmlFor="email"
                >
                  Email Adress :
                </label>
                <input
                  className="bg-[#F2F2F2] md:bg-white text-[20px] md:border border-b md:border-[#4F5665] border-[#9F9F9F] md:rounded-[20px] py-2 md:py-5 md:px-5 px-0 focus:outline-none focus:border-brown md:focus:ring-brown md:focus:ring-1 placeholder:text-[#9F9F9F] md:placeholder:text-[20px] placeholder:text-sm placeholder:font-normal"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email adress"
                  autoComplete="email"
                  required
                  onChange={changeHanlder}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label
                  className=" hidden md:flex text-[#4F5665] md:font-bold text-base md:text-[20px] "
                  htmlFor="password"
                >
                  Password :
                </label>
                <input
                  className="bg-[#F2F2F2] md:bg-white text-[20px] md:border border-b md:border-[#4F5665] border-[#9F9F9F] md:rounded-[20px] py-2 md:py-5 md:px-5 px-0 focus:outline-none focus:border-brown md:focus:ring-brown md:focus:ring-1 placeholder:text-[#9F9F9F] md:placeholder:text-[20px] placeholder:text-sm placeholder:font-normal"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  onChange={changeHanlder}
                />
                <a
                  className="text-brown text-base md:text-[20px] md:font-bold mt-3 underline decoration-solid"
                  href="/forgot-password"
                >
                  Forgot password?
                </a>
              </div>
              <button
                className="text-base md:text-[20px] md:text-brown text-white font-bold md:bg-yellow bg-brown rounded-[20px] md:py-5 md:px-5 px-4 py-4 mt-5 hover:bg-amber-500"
                type="submit"
              >
                Login
              </button>
            </form>
            <button
              className=" flex flex-row gap-x-2 justify-center items-center shadow-shadow-button hover:shadow-md md:text-[17px] text-[15px] text-black font-bold rounded-[20px] md:py-5 py-4 md:px-5 mt-5"
              type="button"
            >
              <img src={iconGoogle} alt="icon google" /> Login with Google
            </button>
            <div className="flex flex-row justify-between items-center mt-12">
              <span className="w-[28%] h-[2px] bg-[#C4C4C4]"></span>
              <p className="text-[#9F9F9F] text-nowrap text-base md:text-lg ">Don&apos;t have an account?</p>
              <span className="w-[28%] h-[2px] bg-[#C4C4C4]"></span>
            </div>
            <a
              className=" text-center md:text-[20px] text-[15px] text-white font-bold bg-brown rounded-[20px] md:py-5 py-4 px-5 mt-12 shadow-shadow-button hover:bg-orange-950"
              href="/signup"
            >
              Sign up Here
            </a>
          </div>
        </div>
        <FooterSign />
      </section>

      {/* alert notification */}
      {loading ? <Loading /> : ''}
      {message ? <Alert msg={message} setMsg={setMessage} /> : ''}
    </main>
  );
}
