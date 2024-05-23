import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import InputRadio from '../../components/InputRadio';
import ProductBanner from '../../assets/product-image.png';
import useApi from '../../utils/useApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function DetailProduct() {
  const { id } = useParams();
  let [quantity, setQuantity] = useState(1);
  const api = useApi();

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const plusQuantity = () => {
    setQuantity((quantity += 1));
  };
  const minusQuantity = () => {
    setQuantity((quantity -= 1));
  };

  const [product, setProduct] = useState(null);

  const getDetailProduct = async (e) => {
    await api
      .get(`/product/${id}`)
      .then(({ data }) => {
        setProduct(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getDetailProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(product);
  return (
    <>
      <p className="container p-2 my-5">
        Favorite & Promo {'>'} <span className="text-primary font-bold">{product && product.name}</span>
      </p>
      <main className="md:flex container pb-20">
        <section className="md:w-2/5 px-4 flex flex-col items-center">
          <img
            src={product && product.image_url}
            className="rounded-full shadow-xl w-[200px] h-[200px] lg:w-[310px] lg:h-[310px]"
          />

          <div className="hidden md:block xl:w-4/5 lg:w-[90%] p-6 bg-white rounded-3xl mt-20 shadow-2xl border-2 font-poppins">
            <h3 className="font-bold text-2xl mb-4">Delivery and Time</h3>
            <div className="flex gap-3 flex-wrap">
              <InputRadio name="delivery" value="dive in" content="dive-in" />
              <InputRadio name="delivery" value="yo" content="dive-in" />
              <InputRadio name="delivery" value="ye" content="dive-in" />
            </div>
            <div className="flex mt-4 space-x-12">
              <p className="text-base self-center">Now</p>
              <div>
                <InputRadio name="time" value={Date.now()} content="Yes" />
                <InputRadio name="time" value="notnow" content="No" />
              </div>
            </div>
            <div className=" mt-6 xl:space-x-5">
              <label htmlFor="time" className="text-base block xl:inline">
                Set Time
              </label>
              <input
                type="text"
                name="customTime"
                id="time"
                placeholder="Enter time for reservation"
                className="bg-[#F4F4F8] py-3 px-4 rounded-lg placeholder:text-bold"
              />
            </div>
          </div>
        </section>
        <section className="text-lg space-y-8 px-4 md:w-3/5">
          <h1 className="text-5xl text-primary font-bold mt-4 lg:mt-8">{product && product.name}</h1>
          <p className="text-3xl font-bold text-black">IDR{product && product.price}</p>
          {/* <p className="text-4xl font-bold text-black">{`IDR ${
              product[0] ? parseInt(product[0].price) * quantity * 1000 : ""
            }`}</p> */}
          <p>{product && product.description}</p>
          <p>
            Delivery only on <span className="text-primary font-bold">Monday to friday</span> at{' '}
            <span className="text-primary font-bold">1 - 7 pm</span>
          </p>

          <div className="flex items-center mt-20 justify-between lg:justify-start lg:gap-x-8 ">
            <div className="flex">
              <div
                className="cursor-pointer p-3 rounded-l-xl border-2 border-third text-2xl font-bold"
                onClick={minusQuantity}
              >
                <span className="select-none">-</span>
              </div>
              <input
                type="number"
                name="quantity"
                id="quantity"
                min="1"
                className="text-center p-3 w-16 text-xl max-w-min border-y-2 inputNumber border-third font-bold"
                onChange={handleQuantity}
                value={quantity}
              />
              <div
                className="cursor-pointer p-3 rounded-r-xl border-2 border-third text-2xl font-bold"
                onClick={plusQuantity}
              >
                <span className="select-none">+</span>
              </div>
            </div>

            <div className="">
              {product &&
                product.productsizes.map((ps) => {
                  return (
                    <InputRadio key={ps.size_id} name="size" value={ps.size_id} content={ps.name} color="secondary" />
                  );
                })}
            </div>
          </div>
          <div className="md:hidden xl:w-4/5 lg:w-[90%] p-6 bg-white rounded-3xl mt-20 shadow-2xl border-2 font-poppins">
            <h3 className="font-bold text-2xl mb-4">Delivery and Time</h3>
            <div className="flex gap-3 flex-wrap">
              <InputRadio name="delivery" value="dive in" content="dive-in" />
              <InputRadio name="delivery" value="door delivery" content="door delivery" />
              <InputRadio name="delivery" value="pickup" content="pickup" />
            </div>
            <div className="flex mt-4 space-x-12">
              <p className="text-base self-center">Now</p>
              <div>
                <InputRadio name="time" value={Date.now()} content="Yes" />
                <InputRadio name="time" value="notnow" content="No" />
              </div>
            </div>
            <div className=" mt-6 xl:space-x-5">
              <label htmlFor="time" className="text-base block xl:inline">
                Set Time
              </label>
              <input
                type="text"
                name="customTime"
                id="time"
                placeholder="Enter time for reservation"
                className="bg-[#F4F4F8] py-3 px-4 rounded-lg placeholder:text-bold"
              />
            </div>
          </div>
          <Button content={'Add to Cart'} color="secondary" />
          <Button content={'Checkout'} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default DetailProduct;
