import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconLove from '../../assets/icons/icon-love.png';
import iconMap from '../../assets/icons/icon-map.png';
import iconPerson from '../../assets/icons/icon-person.png';
import iconStar from '../../assets/icons/icon-star.png';
import imageTestimoni1 from '../../assets/images/Ellipse 175 (1).png';
import imageTestimoni2 from '../../assets/images/Ellipse 175 (2).png';
import imageTestimoni3 from '../../assets/images/Ellipse 175.png';
import imageHugeGlobal from '../../assets/images/Huge Global.png';
import imageNetflix from '../../assets/images/Mask Group (3).png';
import imageSpotify from '../../assets/images/Mask Group (4).png';
import imageAmazon from '../../assets/images/Mask Group (6).png';
import imageReddit from '../../assets/images/Mask Group (7).png';
import imageDiscord from '../../assets/images/discord.png';
import imageHazelnutLate from '../../assets/images/image 22.png';
import imagePinkyPromise from '../../assets/images/image 27.png';
import imageChickenWings from '../../assets/images/image 30.png';
import imageTeamWork from '../../assets/images/image-teamwork.png';
import CarouselTestimoni from '../../components/CarouselTestimoni';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Home() {
  const dataMenu = [
    {
      product_id: '0e9ed486-dc6d-4765-80ac-a23892068951',
      name: 'Hazelnut Late',
      price: 25000,
      image_url: imageHazelnutLate,
    },
    {
      product_id: '0e9ed486-dc6d-4765-80ac-a23892068951',
      name: 'Pinky Promise',
      price: 30000,
      image_url: imagePinkyPromise,
    },
    {
      product_id: '0e9ed486-dc6d-4765-80ac-a23892068951',
      name: 'Sliced strawberry on Top',
      price: 40000,
      image_url: imageChickenWings,
    },
  ];

  // data menu favorites
  const [menuFavorites, setMenuFavorites] = useState(dataMenu);

  const dataTestimoni = [
    {
      name: 'Viezh Robert',
      address: 'Warsaw, Poland',
      image: imageTestimoni2,
      rating: 4.5,
      comment:
        '“Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!',
    },
    {
      name: 'Yessica Christy',
      address: 'Shanxi, China',
      image: imageTestimoni1,
      rating: 4.5,
      comment:
        '“I like it because I like to travel far and still can make my day better just by drinking their Hazelnut Latte',
    },
    {
      name: 'Kim Young Jou',
      address: 'Kim Young Jou',
      image: imageTestimoni3,
      rating: 4.5,
      comment:
        '“This is very unusual for my taste, I haven’t liked coffee before but their coffee is the best! and yup, you have to order the chicken wings, the best in town!',
    },
    {
      name: 'Kim Young Jou',
      address: 'Kim Young Jou',
      image: imageTestimoni3,
      rating: 4.5,
      comment:
        '“This is very unusual for my taste, I haven’t liked coffee before but their coffee is the best! and yup, you have to order the chicken wings, the best in town!',
    },
    {
      name: 'Kim Young Jou',
      address: 'Kim Young Jou',
      image: imageTestimoni3,
      rating: 4.5,
      comment:
        '“This is very unusual for my taste, I haven’t liked coffee before but their coffee is the best! and yup, you have to order the chicken wings, the best in town!',
    },
  ];
  return (
    <>
      <Header />
      {/* hero/jumbotron */}
      <div className="w-full bg-heroHome bg-cover bg-no-repeat flex flex-col px-6 md:px-40 pt-16 pb-16 md:pb-52 overflow-x-hidden">
        <div className="text-white flex flex-col gap-y-5">
          <h3 className="w-full md:w-[45%] leading-snug text-3xl md:text-[50px] font-bold">
            Start Your Day with Coffee and Good Meals
          </h3>
          <p className="w-full md:w-[44%]  md:text-[20px] font-semibold md:font-bold">
            We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with
            us for a bigger smile!
          </p>
          <Link
            className="w-fit p-3 md:p-5 px-7 md:px-10 bg-yellow text-brown text-sm md:text-base font-bold rounded-md md:rounded-[10px] hover:bg-orange-400"
            to="/product"
          >
            Get Started
          </Link>
        </div>
      </div>
      {/* overlay */}
      <div className="w-full md:w-[80%] md:mx-auto flex flex-col gap-y-7 md:gap-y-0 md:flex-row bg-white rounded-md md:h-[200px] md:shadow-2xl px-6 md:px-0 py-10 md:-mt-[7%] overflow-x-hidden">
        <div className="flex gap-x-8 md:justify-center ps-[30%] md:ps-0 items-center md:w-1/3 rounded-md md:rounded-none shadow-md md:shadow-none p-10 md:border-r-4 border-[#EEEFF2]">
          <div className="grid justify-center items-center w-[55px] h-[55px] bg-yellow rounded-full">
            <img className="" src={iconPerson} alt="" />
          </div>
          <div className="flex flex-col w-fit">
            <span className="text-[#0B132A] font-bold text-[25px]">90+</span>
            <p className="text-[#4F5665] text-[20px]">Staff</p>
          </div>
        </div>
        <div className="flex gap-x-8 md:justify-center ps-[30%] md:ps-0 items-center md:w-1/3 rounded-md md:rounded-none shadow-md md:shadow-none p-10">
          <div className="grid justify-center items-center w-[55px] h-[55px] bg-yellow rounded-full">
            <img className="" src={iconMap} alt="" />
          </div>
          <div className="flex flex-col w-fit">
            <span className="text-[#0B132A] font-bold text-[25px]">30+</span>
            <p className="text-[#4F5665] text-[20px]">Stores</p>
          </div>
        </div>
        <div className="flex gap-x-8 md:justify-center ps-[30%] md:ps-0 items-center md:w-1/3 rounded-md md:rounded-none shadow-md md:shadow-none p-10 md:border-l-4 border-[#EEEFF2]">
          <div className="grid justify-center items-center w-[55px] h-[55px] bg-yellow rounded-full">
            <img className="" src={iconLove} alt="" />
          </div>
          <div className="flex flex-col w-fit">
            <span className="text-[#0B132A] font-bold text-[25px]">800+</span>
            <p className="text-[#4F5665] text-[20px]">Customers</p>
          </div>
        </div>
      </div>
      <main className="relative font-rubik bg-[#fcfcfc] md:bg-transparent z-0">
        {/* We Provide Good Coffee and Healthy Meals */}
        <section className="flex flex-col flex-col-reverse gap-y-5 md:flex-row md:justify-between px-6 md:px-40 pt-5 md:pt-24 pb-5 md:pb-16">
          <div className="w-full md:w-[45%]">
            <img src={imageTeamWork} alt="image" />
          </div>
          <div className="w-full md:w-[45%] flex flex-col gap-y-4 pt-8">
            <h3 className="text-[#0B132A] font-[500] md:leading-normal text-2xl md:text-[35px]">
              We Provide Good Coffee and Healthy Meals
            </h3>
            <p className="text-[#4F5665] md:leading-loose text-base">
              You can explore the menu that we provide with fun and have their own taste and make your day better.
            </p>
            <ul className="flex flex-col gap-y-4 text-[#4F5665] text-[14px]">
              <li className="flex flex-row gap-x-4">
                <span className="flex justify-center items-center w-[24px] h-[24px] text-center text-[12px] text-white bg-[#2FAB73] rounded-full">
                  &#10003;
                </span>
                High quality beans
              </li>
              <li className="flex flex-row gap-x-4">
                <span className="flex justify-center items-center w-[24px] h-[24px] text-center text-[12px] text-white bg-[#2FAB73] rounded-full">
                  &#10003;
                </span>
                Healthy meals, you can request the ingredients
              </li>
              <li className="flex flex-row gap-x-4">
                <span className="flex justify-center items-center w-[24px] h-[24px] text-center text-[12px] text-white bg-[#2FAB73] rounded-full">
                  &#10003;
                </span>
                Chat with our staff to get better experience for ordering
              </li>
              <li className="flex flex-row gap-x-4">
                <span className="flex justify-center items-center w-[24px] h-[24px] text-center text-[12px] text-white bg-[#2FAB73] rounded-full">
                  &#10003;
                </span>
                Free member card with a minimum purchase of IDR 200.000.
              </li>
            </ul>
          </div>
        </section>

        {/* Menu Favorites */}
        <section className="bg-[#fcfcfc] flex flex-col md:gap-y-40 gap-y-20 md:px-40 px-6 py-7 md:py-14 overflow-x-hidden">
          <div className="flex flex-col gap-y-3 md:items-center">
            <h3 className="text-[#0B132A] md:text-[35px] text-2xl font-[500]">Here is People&apos;s Favorite</h3>
            <p className="text-[#4F5665] font-normal text-base">
              Let&apos;s choose and have a bit taste of poeple&apos;s favorite. It might be yours too!
            </p>
          </div>
          <div className="flex md:flex-row flex-col gap-y-14 md:justify-between md:mt-14 mt-0">
            {menuFavorites &&
              menuFavorites.map((menu) => {
                return (
                  <div
                    className="md:relative md:w-[330px] h-fit md:h-[567px] flex flex-col gap-y-3 items-center border-[#DDDDDD] border-2 bg-white rounded-md p-10 hover:border-brown"
                    key={menu.name}
                  >
                    <div className="w-[128.98px] shadow-2xl rounded-full overflow-hidden md:-mt-28 self-center">
                      <img className="" src={menu.image_url} alt={`image ${menu.name}`} />
                    </div>
                    <p className="text-[#0B132A] font-[500] text-[18px] mt-4 self-center">{menu.name}</p>
                    <ul className="mt-8 flex flex-col gap-y-5">
                      <li className="flex flex-row gap-x-3 text-[#4F5665] text-[14px]">
                        <span className="text-[#2FAB73]">&#10003;</span>Sliced strawberry on Top
                      </li>
                      <li className="flex flex-row gap-x-3 text-[#4F5665] text-[14px]">
                        <span className="text-[#2FAB73]">&#10003;</span>Sliced strawberry on Top
                      </li>
                      <li className="flex flex-row gap-x-3 text-[#4F5665] text-[14px]">
                        <span className="text-[#2FAB73]">&#10003;</span>Sliced strawberry on Top
                      </li>
                      <li className="flex flex-row gap-x-3 text-[#4F5665] text-[14px]">
                        <span className="text-[#2FAB73]">&#10003;</span>Sliced strawberry on Top
                      </li>
                      <li className="flex flex-row gap-x-3 text-[#4F5665] text-[14px]">
                        <span className="text-[#2FAB73]">&#10003;</span>Chocolate Biscuits
                      </li>
                      <li className="flex flex-row gap-x-3 text-[#4F5665] text-[14px]">
                        <span className="text-[#2FAB73]">&#10003;</span>Sliced strawberry on Top
                      </li>
                    </ul>
                    <div className="md:absolute bottom-10 flex flex-col items-center gap-y-3 mt-5">
                      <span className="text-[#0B132A] md:text-[25px] font-[500]">IDR {menu.price}</span>
                      <Link
                        className="border border-yellow py-2 px-8 rounded-[50px] text-[#6A4029] text-base md:font-bold hover:bg-yellow hover:shadow-2xl"
                        to="/product"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* Map */}
        <section className="flex flex-col md:justify-center items-center md:gap-y-32 gap-y-12 bg-[#fcfcfc] py-20 px-6 md:px-auto">
          <div className="flex flex-col md:justify-center md:items-center gap-y-5">
            <h3 className="md:w-[55%] text-[#0B132A] font-[500] md:text-[35px] text-2xl text-center">
              Visit Our Store in the Spot on the Map Below
            </h3>
            <p className="md:w-3/4 text-center text-[#4F5665] font-normal text-base">
              See our store in every city on the spot and spen your good day there. See you soon!
            </p>
          </div>
          <div>
            <img src={imageHugeGlobal} alt="image huge global" />
          </div>
        </section>

        {/* Partner */}
        <section className="flex flex-col justify-center items-center md:px-40 px-6 bg-[#fcfcfc]">
          <p className="md:text-[35px] text-2xl font-[500]">Our Partner</p>
          <div className="flex md:flex-row justify-between items-center w-full overflow-x-scroll md:overflow-x-hidden">
            <div className="h-fit w-20 md:w-auto grid justify-center items-center">
              <img className="w-full" src={imageNetflix} alt="image netflix" />
            </div>
            <div className="h-fit w-20 md:w-auto grid justify-between items-center">
              <img className="w-full" src={imageReddit} alt="image reddit" />
            </div>
            <div className="h-fit w-20 md:w-auto grid justify-between items-center">
              <img className="w-full" src={imageAmazon} alt="image amazon" />
            </div>
            <div className="h-fit w-20 md:w-auto grid justify-between items-center">
              <img className="w-full" src={imageDiscord} alt="image discord" />
            </div>
            <div className="h-fit w-20 md:w-auto grid justify-between items-center">
              <img className="w-full" src={imageSpotify} alt="image spotify" />
            </div>
          </div>
        </section>

        {/* Testimoni */}
        <section className="bg-[#fcfcfc] md:px-40 px-6 md:pb-40 py-10">
          <div className="flex flex-col justify-center items-center gap-y-3">
            <h3 className="md:w-[40%] text-[#0B132A] font-[500] md:text-[35px] text-2xl text-center">
              Loved by Thousands of Happy Customer
            </h3>
            <p className="md:w-[45%] text-[#4F5665] font-normal text-base text-center mb-10">
              These are the stories of our customers who have visited us with great pleasure.
            </p>
          </div>
          <CarouselTestimoni>
            {dataTestimoni &&
              dataTestimoni.map((d, i) => (
                <div
                  className="md:w-[400px] w-[285px] md:h-[230px] flex flex-col gap-y-5 border-2 bg-white border-[#DDDDDD] rounded-md p-8 overflow-y-hidden"
                  key={i + 1}
                >
                  <div className="flex md:flex-row flex-col gap-y-2 md:justify-between md:items-center">
                    <div className="md:w-[50px] md:h-[50px] rounded-full">
                      <img src={d.image} alt="image" />
                    </div>
                    <div className="w-[60%]">
                      <p className="text-[#0B132A] md:text-[18px] text-base font-[500]">{d.name}</p>
                      <span className="text-[#4F5665] text-[14px]">{d.address}</span>
                    </div>
                    <div className="flex flex-row gap-x-2">
                      <p className="text-[#0B132A] text-[16px]">{d.rating}</p>
                      <div className="grid justify-center items-center">
                        <img src={iconStar} alt="icon stars" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#0B132A] text-base">{d.comment}</p>
                  </div>
                </div>
              ))}
          </CarouselTestimoni>
        </section>

        {/* overflow check promo */}
        <div className="md:absolute -bottom-28 left-40 md:w-[79%] w-[90%] mx-auto flex md:flex-row flex-col gap-y-5 justify-between items-center rounded-md shadow-2xl bg-white p-12 z-40">
          <div className="flex flex-col gap-y-2">
            <h4 className="md:w-[75%] leading-normal text-[#0B132A] md:text-[35px] text-center md:text-left text-2xl font-[500]">
              Check our promo today!
            </h4>
            <p className="text-[#4F5665] font-normal text-center md:text-left text-base">
              Let&apos;s see the deals and pick yours!
            </p>
          </div>
          <a
            className="text-brown text-center md:text-base text-sm font-bold bg-yellow rounded-md shadow-2xl px-10 py-3"
            href=""
          >
            See Promo
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
