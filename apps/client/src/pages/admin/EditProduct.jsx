import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TrashIcon from '../../assets/trash-icon.png';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import InputRadio from '../../components/InputRadio';
import useApi from '../../utils/useApi';

function EditProduct() {
  const { id } = useParams();
  const api = useApi();
  let [quantity, setQuantity] = useState(1);

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const plusQuantity = () => {
    setQuantity((quantity += 1));
  };
  const minusQuantity = () => {
    setQuantity((quantity -= 1));
  };

  const Navigate = useNavigate();
  // state ini digunakan untuk menyimpan price sesuai size ketika radio button size diklik
  const [priceSize, setPriceSize] = useState();

  const [editProduct, setEditProduct] = useState(false);
  function showFormEdit() {
    setEditProduct(true);
  }
  function hiddenFormEdit() {
    setEditProduct(false);
  }
  const [userDataImage, setUserDataImage] = useState(null);
  const [data, setData] = useState({
    size_ids: [], // Array untuk menyimpan nilai checkbox "features"
    delivery_method: [], // Array untuk menyimpan nilai checkbox "categories"
  });

  const changeHanlder = (e) => {
    const datas = { ...data };
    datas[e.target.name] = e.target.value;
    if (e.target.name == 'price') {
      datas[e.target.name] = parseInt(e.target.value);
    }
    setData(datas);
  };

  const changeImageHandler = async (e) => {
    setUserDataImage(e.target.files[0]);
  };
  const handleCheckboxChange = (e, attribute) => {
    const { value, checked } = e.target;
    setData((prevData) => {
      const updatedArray = checked
        ? [...prevData[attribute], value]
        : prevData[attribute].filter((item) => item !== value);
      return {
        ...prevData,
        [attribute]: updatedArray,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image_banner', userDataImage);

    for (const key in data) {
      console.log(key);
      if (key != 'size_ids' && key != 'delivery_method') {
        formData.append(key, data[key]);
      }
    }
    data.size_ids.forEach((id) => formData.append('size_ids', id));
    data.delivery_method.forEach((method_id) => formData.append('delivery_method', method_id));

    console.log([...formData]); // Think 2D array makes it more readable
    api({
      method: 'PATCH',
      url: `/product/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    })
      .then((res) => {
        alert(res.data.description);
        Navigate('/product');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // start delete product
  const handleDelete = async () => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus product ini?');

    if (confirmed) {
      api
        .delete(`product/${id}`)
        .then((res) => {
          alert(res.data.description);

          Navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // end delete product
  // start get product, deliveri, size
  const [delivery, setDelivery] = useState();
  const [deliveryProduct, setDeliveryProduct] = useState();
  const [size, setSize] = useState();

  const getDelivery = async (e) => {
    await api
      .get(`/attributeprod/delivery`)
      .then(({ data }) => {
        setDelivery(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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

  const getSize = async (e) => {
    await api
      .get(`/attributeprod/size`)
      .then(({ data }) => {
        setSize(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    getDelivery();
    getDeliveryProduct();
    getSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(data);
  return (
    <>
      <Header />

      {editProduct ? (
        <>
          <p className="container p-2 my-5">
            Favorite & Promo {'>'} <span className="text-primary font-bold">{product && product.name}</span>
          </p>
          <form onSubmit={submitHandler} className="md:flex container">
            <section className="md:w-2/5 px-4 flex flex-col items-center">
              <div className="relative">
                <img
                  src={product && product.image_url}
                  className="rounded-full shadow-xl w-[200px] h-[200px] lg:w-[310px] lg:h-[310px]"
                />
                <label htmlFor="formFile" className="absolute right-9 top-8 cursor-pointer text-sm text-gray-700">
                  <img src={TrashIcon} alt="" />
                  <input
                    onChange={changeImageHandler}
                    className="sr-only "
                    name="image_banner"
                    type="file"
                    id="formFile"
                  />
                </label>
              </div>

              <div className="hidden md:block xl:w-4/5 lg:w-[90%] p-6 bg-white rounded-3xl mt-20 shadow-2xl border-2 font-poppins">
                <h3 className="font-bold text-xl mb-4">Click methods you want to use for this product</h3>
                <ul className="flex gap-3 flex-wrap">
                  {delivery &&
                    delivery.map((d) => {
                      return (
                        <li key={d.method_name}>
                          <input
                            type="checkbox"
                            id={d.id}
                            name="delivery_method"
                            value={d.id}
                            onChange={(e) => handleCheckboxChange(e, 'delivery_method')}
                            className="sr-only checkbox-button"
                          />
                          <label
                            htmlFor={d.id}
                            className="bg-third/30 flex justify-center items-center rounded-2xl py-2 px-3 text-2xl font-bold "
                          >
                            {d.method_name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </section>
            <section className="text-lg space-y-8 px-4 md:w-3/5 ">
              <input
                defaultValue={product && product.name}
                onChange={changeHanlder}
                name="name"
                required={true}
                className="text-5xl text-primary font-bold w-full text-dark border-b-2 placeholder:text-[#A9A9A9CC] placeholder:font-normal focus:outline-none bg-transparent"
              />
              <div className="flex gap-2 border-b-2 pb-2 ">
                <label htmlFor="price" className="text-3xl font-bold text-black">
                  IDR
                </label>
                <input
                  id="price"
                  defaultValue={product && product.price}
                  name="price"
                  onChange={changeHanlder}
                  required={true}
                  className="text-3xl font-bold text-black w-full text-dark placeholder:text-[#A9A9A9CC] placeholder:font-normal focus:outline-none bg-transparent"
                />
              </div>
              <textarea
                name="description"
                id="address"
                cols="70"
                rows="3"
                className="focus:outline-none border-b-2 pb-2"
                onChange={changeHanlder}
                defaultValue={product && product.description}
              ></textarea>
              <p>
                Delivery only on <span className="text-primary font-bold">Monday to friday</span> at{' '}
                <span className="text-primary font-bold">1 - 7 pm</span>
              </p>
              <p className=" ">Select a size if you want to change the current size</p>
              <ul className="flex gap-3 mb-10">
                {size &&
                  size.map((s) => {
                    return (
                      <li key={s.id}>
                        <input
                          onChange={(e) => handleCheckboxChange(e, 'size_ids')}
                          type="checkbox"
                          id={s.id}
                          name="size"
                          value={s.id}
                          className="sr-only checkbox-button"
                        />
                        <label
                          htmlFor={s.id}
                          className="w-14 h-14 bg-third/30 flex justify-center items-center rounded-full box-border text-2xl font-bold text-blold"
                        >
                          {s.size_name}
                        </label>
                      </li>
                    );
                  })}
              </ul>
              <div className="md:hidden xl:w-4/5 lg:w-[90%] p-6 bg-white rounded-3xl mt-20 shadow-2xl border-2 font-poppins">
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
              <div className="flex justify-between gap-5">
                <button
                  type="button"
                  onClick={() => handleDelete()}
                  className="bg-red-500 w-full rounded-xl py-5 text-xl font-bold"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={hiddenFormEdit}
                  className="bg-third w-full rounded-xl py-5 text-xl font-bold"
                >
                  Cancel
                </button>
              </div>
              <Button content={'Saved'} />
            </section>
          </form>
        </>
      ) : (
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
                          <InputRadio name="size" value={ps.size_id} content={ps.name} color="secondary" />
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
                            onChange={(e) => handleCheckboxChange(e, 'delivery_method')}
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
              <Button content={'Add to Cart'} color="secondary" />
              <button
                type="button"
                onClick={showFormEdit}
                className="bg-primary w-full rounded-xl py-5 text-xl font-bold text-white"
              >
                Edit Product
              </button>
            </section>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default EditProduct;
