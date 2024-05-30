import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cameraIcon from '../../assets/icons/coffee 1.png';
import Header from '../../components/Header';
import useApi from '../../utils/useApi';

const AddProduct = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState();
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
  const getSize = async (e) => {
    await api
      .get(`/attributeprod/size`)
      .then(({ data }) => {
        console.log(data.data);
        setSize(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getSize();
    getDelivery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [userInfo, setUserInfo] = useState({
    filepreview: null,
  });

  const [userDataImage, setUserDataImage] = useState(null);
  const [data, setData] = useState({
    is_available: true,
    size_ids: [], // Array untuk menyimpan nilai checkbox "features"
    delivery_method: [], // Array untuk menyimpan nilai checkbox "categories"
  });

  const changeHanlder = (e) => {
    const datas = { ...data };
    datas[e.target.name] = e.target.value;
    if (e.target.name == 'is_available') {
      if (e.target.value == 'true') {
        datas[e.target.name] = true;
      } else {
        datas[e.target.name] = false;
      }
    }
    if (e.target.name == 'price') {
      datas[e.target.name] = parseInt(e.target.value);
    }
    setData(datas);
  };
  const changeImageHandler = async (e) => {
    setUserInfo({
      ...userInfo,
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (userDataImage) {
      formData.append('image_banner', userDataImage);
    }

    for (const key in data) {
      if (key != 'size_ids' && key != 'delivery_method') {
        formData.append(key, data[key]);
      }
    }
    data.size_ids.forEach((id) => formData.append('size_ids', id));
    data.delivery_method.forEach((method_id) => formData.append('delivery_method', method_id));

    api({
      method: 'POST',
      url: `/product/`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    })
      .then((res) => {
        alert(res.data.description);
        navigate(`/product/${res.data.data.id}/edit`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <form
        className="container mx-auto font-rubik grid grid-cols-12 py-10"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <p className="col-span-12 text-xl">
          Product <span className="text-primary font-bold">&#62; Add new product</span>
        </p>
        <div className="col-span-12 lg:col-span-4 flex flex-col p-10 pt-16">
          <div className="w-72 h-72 overflow-hidden flex justify-center items-center mx-auto bg-[#bababa40] rounded-full mb-10">
            <img
              src={userInfo.filepreview !== null ? userInfo.filepreview : cameraIcon}
              alt="camera-icon"
              width={userInfo.filepreview ? '100%' : ''}
            />
          </div>
          <input className="sr-only" type="file" name="productimage" onChange={changeImageHandler} id="productimage" />
          <label
            htmlFor="productimage"
            className="bg-primary text-center text-white w-full rounded-xl py-5 text-xl font-bold"
          >
            Choose from gallery
          </label>
          <h3 className="mt-20 text-xl text-primary font-bold mb-5">Delivery Hour :</h3>
          <input
            onChange={changeHanlder}
            placeholder="7 pm"
            name="delivery_start"
            className="group mb-5 py-3 px-5 rounded-full bg-transparent focus:outline-none focus:ring-1 focus:ring-[#9F9F9F] border border-[#9F9F9F] appearance-none"
          ></input>
          <input
            placeholder="5 pm"
            onChange={changeHanlder}
            name="delivery_end"
            className="group py-3 px-5 rounded-full bg-transparent focus:outline-none focus:ring-1 focus:ring-[#9F9F9F] border border-[#9F9F9F] appearance-none"
          ></input>
          {/* STOCK */}
          <h3 className="mt-20 text-xl text-primary font-bold mb-5">Input stock :</h3>
          <select
            name="is_available"
            onChange={changeHanlder}
            className="group py-3 px-5 rounded-full bg-transparent focus:outline-none focus:ring-1 focus:ring-[#9F9F9F] border border-[#9F9F9F] appearance-none"
          >
            <option className="group-focus:hidden">Stock Available</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="col-span-12 lg:col-span-8 px-20 py-10">
          <label htmlFor="productname" className="font-bold text-primary text-xl">
            Name :
          </label>
          <input
            type="text"
            id="productname"
            name="name"
            onChange={changeHanlder}
            className="border-b-[1px] border-[#4F5665] block w-full p-3 focus:outline-none focus:border-b-2 mt-3 text-base mb-10"
            placeholder="Type product name min.3 characters"
          />
          {/*  */}
          <label htmlFor="price" className="font-bold text-primary text-xl">
            Price :
          </label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={changeHanlder}
            className="inputNumber border-b-[1px] border-[#4F5665] block w-full p-3 focus:outline-none focus:border-b-2 mt-3 text-base mb-10"
            placeholder="Type the price"
          />
          {/*  */}
          <label htmlFor="category" className="font-bold text-primary text-xl">
            Category :
          </label>
          <input
            type="text"
            id="category"
            name="category"
            onChange={changeHanlder}
            className="border-b-[1px] border-[#4F5665] block w-full p-3 focus:outline-none focus:border-b-2 mt-3 text-base mb-10"
            placeholder="Type the category"
          />
          {/*  */}
          <label htmlFor="description" className="font-bold text-primary text-xl">
            Description :
          </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={changeHanlder}
            className="border-b-[1px] border-[#4F5665] block w-full p-3 focus:outline-none focus:border-b-2 mt-3 text-base mb-10"
            placeholder="Describe your product min. 50 characters"
          />
          <h3 className="font-bold text-primary text-xl">Input product size :</h3>
          <p className="text-[#9F9F9F] mt-1 text-base">Click size you want to use for this product</p>
          <ul className="flex pt-5 space-x-6 mb-10">
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
          {/*  */}
          <h3 className="font-bold text-primary text-xl">Input delivery methods :</h3>
          <p className="text-[#9F9F9F] mt-1 text-base">Click methods you want to use for this product</p>
          <ul className="flex pt-5 space-x-6">
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
                      className="bg-third/30 flex justify-center items-center rounded-3xl py-3 px-4 text-2xl font-bold text-blold "
                    >
                      {d.method_name}
                    </label>
                  </li>
                );
              })}
          </ul>

          <button type="submit" className="my-5 bg-primary text-white w-full rounded-xl py-5 text-xl font-bold">
            Save Product
          </button>
          <Link to="/product">
            <button type="button" className="bg-third w-full rounded-xl py-5 text-xl font-bold">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
