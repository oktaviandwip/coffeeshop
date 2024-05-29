import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useApi from '../../utils/useApi';

function DetailProduct() {
  const { id } = useParams();
  const { userId } = useSelector((s) => s.users);
  let [quantity, setQuantity] = useState(1);
  const api = useApi();

  const [data, setData] = useState({
    product_id: id,
    size_id: '',
    quantity: quantity,
  });
  const handleQuantity = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
    setData((prevData) => ({
      ...prevData,
      quantity: newQuantity,
    }));
  };
  const plusQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setData((prevData) => ({
      ...prevData,
      quantity: newQuantity,
    }));
  };
  const minusQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setData((prevData) => ({
        ...prevData,
        quantity: newQuantity,
      }));
    }
  };

  const changeHandler = (e) => {
    const datas = { ...data };
    datas[e.target.name] = e.target.value;
    setData(datas);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);

    api
      .post('/cart/item', data)
      .then((res) => {
        console.log(res);
        alert(res.data.description);
      })
      .catch((err) => {
        alert(err.response.data.description);
        console.log(err.response.data);
      });
  };
  // state ini digunakan untuk menyimpan price sesuai size ketika radio button size diklik
  const [priceSize, setPriceSize] = useState();

  const [deliveryProduct, setDeliveryProduct] = useState();
  const [product, setProduct] = useState(null);

  // get delivery by product id
  const getDeliveryProduct = async (e) => {
    await api
      .get(`/attributeprod/delivery/${id}`)
      .then(({ data }) => {
        setDeliveryProduct(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    getDeliveryProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);
  console.log(data);
  return (
    <>
      <Header />

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
            <ul className="flex gap-3 flex-wrap">
              {deliveryProduct &&
                deliveryProduct.map((dp) => {
                  return (
                    <li key={dp.method_name}>
                      <input
                        type="checkbox"
                        id={dp.id}
                        name="delivery_method"
                        value={dp.id}
                        onChange={changeHandler}
                        checked={data.delivery_method == dp.id}
                        className="sr-only checkbox-button"
                      />
                      <label
                        htmlFor={dp.id}
                        className="bg-third/30 flex justify-center items-center rounded-2xl py-2 px-3 text-2xl font-bold "
                      >
                        {dp.method_name}
                      </label>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>
        <section className="text-lg space-y-8 px-4 md:w-3/5">
          <h1 className="text-5xl text-primary font-bold mt-4 lg:mt-8">{product && product.name}</h1>
          <p className="text-3xl font-bold text-black">IDR {priceSize ? priceSize : product && product.price}</p>
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

            <ul className="">
              {product &&
                product.product_sizes.map((ps) => {
                  return (
                    <li
                      key={ps.size_id}
                      onClick={() => {
                        setPriceSize(ps.price);
                      }}
                      className="inline"
                    >
                      <input
                        type="radio"
                        id={ps.size_id}
                        className="checkRadioSecondary hidden"
                        name="size_id"
                        value={ps.size_id}
                        onChange={changeHandler}
                        checked={data.size_id == ps.size_id}
                      />
                      <label htmlFor={ps.size_id} className="btn-third mr-2 text-base font-black">
                        {ps.name}
                      </label>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="md:hidden xl:w-4/5 lg:w-[90%] p-6 bg-white rounded-3xl mt-20 shadow-2xl border-2 font-poppins">
            <h3 className="font-bold text-2xl mb-4">Delivery and Time</h3>
            <ul className="flex gap-3 flex-wrap">
              {deliveryProduct &&
                deliveryProduct.map((dp) => {
                  return (
                    <li key={dp.method_name}>
                      <input
                        type="checkbox"
                        id={dp.id}
                        name="delivery_method"
                        value={dp.id}
                        onChange={changeHandler}
                        checked={data.delivery_method == dp.id}
                        className="sr-only checkbox-button"
                      />
                      <label
                        htmlFor={dp.id}
                        className="bg-third/30 flex justify-center items-center rounded-2xl py-2 px-3 text-2xl font-bold "
                      >
                        {dp.method_name}
                      </label>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="space-y-3">
            <form onSubmit={submitHandler} className="mb-5">
              <Button content={'Add to Cart'} color="secondary" />
            </form>
            <Link to="/your-cart">
              <Button content={'Checkout'} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default DetailProduct;
