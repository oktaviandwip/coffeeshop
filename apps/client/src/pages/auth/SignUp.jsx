import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import iconCoffee from '../../assets/icons/coffee 1.png';
import iconGoogle from '../../assets/icons/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png';
import FooterSign from '../../components/FooterSign';
import useApi from '../../utils/useApi';
import imageHeroSignupMobile from '../../assets/images/girl-chilling-exploring-on-the-phone 1.png';
import Alert from '../../components/Alert';
import Loading from '../../components/Loading';

function SignUp() {
  const api = useApi();
  const alertElm = document.querySelector('#alert-error');

  const [form, setForm] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isAuthUser } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthUser) {
      navigate('/');
    }
  }, [isAuthUser]);

  const changeHanlder = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    api({
      method: 'POST',
      url: '/users/create',
      data: form,
    })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setLoading(false);
          setMessage('Pendaftaran berhasil silahkan login');
        }, 300);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
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
      <section className="hidden md:flex bg-heroSign bg-left-top bg-cover bg-no-repeat w-1/2 h-auto border overflow-x-hidden"></section>
      <section className=" w-full md:w-1/2 flex flex-col overflow-x-hidden bg-[#F2F2F2] md:bg-white">
        <div className="flex flex-col pt-10 ps-5 gap-y-2 md:gap-y-0 md:ps-10 pe-5 md:pe-12">
          <div className="hidden md:flex flex-row justify-between px-3">
            <a className="flex flex-row gap-x-2 justify-center items-center " href="/">
              <img src={iconCoffee} alt="icon coffee" />
              <span className=" font-bold text-base md:text-[20px] font-[#0B132A]">Coffee Shop</span>
            </a>
            <h1 className=" text-lg md:text-[35px] font-bold text-brown font-[#6A4029]">Sign Up</h1>
          </div>
          <div className="flex justify-center items-center md:hidden pt-10">
            <div className="w-3/4 relative">
              <img src={imageHeroSignupMobile} alt="image" />
              <span className="absolute w-1/2 top-3 right-0 text-[3.5rem] font-bold leading-[3.5rem]">Sign Up</span>
            </div>
          </div>
          <div className="flex flex-col md:p-20 mb-16 p-3 ">
            <form
              className="flex flex-col gap-y-3 md:gap-y-7 "
              action=""
              onSubmit={(event) => {
                submitHandler(event);
              }}
            >
              <div className="flex flex-col gap-y-0 md:gap-y-3">
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
                  required
                  autoComplete="email"
                  onChange={changeHanlder}
                />
              </div>
              <div className="flex flex-col gap-y-0 md:gap-y-3">
                <label
                  className="hidden md:flex text-[#4F5665] md:font-bold text-base md:text-[20px]"
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
                  required
                  onChange={changeHanlder}
                />
              </div>
              <div className="flex flex-col gap-y-0 md:gap-y-3">
                <label className="hidden md:flex text-[#4F5665] md:font-bold text-base md:text-[20px]" htmlFor="phone">
                  Phone Number :
                </label>
                <input
                  className="bg-[#F2F2F2] md:bg-white text-[20px] md:border border-b md:border-[#4F5665] border-[#9F9F9F] md:rounded-[20px] py-2 md:py-5 md:px-5 px-0 focus:outline-none focus:border-brown md:focus:ring-brown md:focus:ring-1 placeholder:text-[#9F9F9F] md:placeholder:text-[20px] placeholder:text-sm placeholder:font-normal"
                  type="tel"
                  name="phone_number"
                  id="phone"
                  placeholder="Enter your phone number"
                  required
                  onChange={changeHanlder}
                />
              </div>
              <button
                className="text-base md:text-[20px] md:text-brown text-white font-bold md:bg-yellow bg-brown rounded-[20px] md:py-5 md:px-5 px-4 py-4 mt-5 hover:bg-amber-500"
                type="submit"
              >
                Sign Up
              </button>
            </form>
            <button
              className=" flex flex-row gap-x-2 justify-center items-center shadow-shadow-button hover:shadow-md md:text-[17px] text-[15px] text-black font-bold rounded-[20px] md:py-5 py-4 md:px-5 mt-5"
              type="button"
            >
              <img src={iconGoogle} alt="icon google" /> Sign up with Google
            </button>
            <div className="flex flex-row justify-between items-center mt-12">
              <span className="w-[28%] h-[2px] bg-[#C4C4C4]"></span>
              <p className="text-[#9F9F9F] text-nowrap text-base md:text-lg">Already have an account?</p>
              <span className="w-[28%] h-[2px] bg-[#C4C4C4]"></span>
            </div>
            <a
              className="text-center md:text-[20px] text-[15px] text-white font-bold bg-brown rounded-[20px] md:py-5 py-4 px-5 mt-12 shadow-shadow-button hover:bg-orange-950"
              href="/login"
            >
              Login Here
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

export default SignUp;
