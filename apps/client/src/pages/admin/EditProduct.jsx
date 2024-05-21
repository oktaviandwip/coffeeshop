import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import InputRadio from '../../components/InputRadio';
import TrashIcon from '../../assets/trash-icon.png';
import useApi from '../../utils/useApi';

function EditProduct() {
  const { id } = useParams();
  const api = useApi();

  const Navigate = useNavigate();

  const [userDataImage, setUserDataImage] = useState(null);
  const [data, setData] = useState();

  const changeHanlder = (e) => {
    const datas = { ...data };
    datas[e.target.name] = e.target.value;
    setData(datas);
  };

  const changeImageHandler = async (e) => {
    setUserDataImage(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image_banner', userDataImage);
    console.log(userDataImage);

    for (const key in data) {
      console.log(key);
      console.log(data);
      formData.append(`${key}`, data[key]);
    }
    console.log(formData);
    api({
      method: 'PATCH',
      url: `/product/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    })
      .then((res) => {
        console.log(res);
        alert(res.data.description);
        Navigate('/');
      })
      .catch((err) => {
        console.log(err);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(product);
  return (
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
              <input onChange={changeImageHandler} className="sr-only " name="image_banner" type="file" id="formFile" />
            </label>
          </div>

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
          <input
            defaultValue={product && product.name}
            onChange={changeHanlder}
            name="name"
            required={true}
            className="text-5xl text-primary font-bold w-full text-dark  placeholder:text-[#A9A9A9CC] placeholder:font-normal focus:outline-none bg-transparent"
          />
          <div className="flex gap-2">
            <label htmlFor="price" className="text-3xl font-bold text-black">
              IDR
            </label>
            <input
              id="price"
              defaultValue={product && product.price}
              name="price"
              onChange={changeHanlder}
              required={true}
              className="text-3xl font-bold text-black w-full text-dark  placeholder:text-[#A9A9A9CC] placeholder:font-normal focus:outline-none bg-transparent"
            />
          </div>{' '}
          {/* <p className="text-4xl font-bold text-black">{`IDR ${
              product[0] ? parseInt(product[0].price) * quantity * 1000 : ""
            }`}</p> */}
          <textarea
            name="description"
            id="address"
            cols="70"
            rows="3"
            className="focus:outline-none"
            onChange={changeHanlder}
            defaultValue={product && product.description}
          ></textarea>
          <p>
            Delivery only on <span className="text-primary font-bold">Monday to friday</span> at{' '}
            <span className="text-primary font-bold">1 - 7 pm</span>
          </p>
          <div className="flex items-center mt-20 justify-between lg:justify-start lg:gap-x-8 ">
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
            <button type="button" className="bg-red-500 w-full rounded-xl py-5 text-xl font-bold">
              Delete
            </button>
            <button type="button" className="bg-third w-full rounded-xl py-5 text-xl font-bold">
              Cancel
            </button>
          </div>
          <Button content={'Saved'} />
        </section>
      </form>
    </>
  );
}

export default EditProduct;
