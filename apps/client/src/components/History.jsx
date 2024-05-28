import React, { useEffect, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import ProductBanner from '../assets/product-image.png';
import useApi from '../utils/useApi';
import Footer from './Footer';
import Header from './Header';

function History() {
  const api = useApi();

  const [selectedDelete, setSelectedDelete] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  const getDetailProduct = async (e) => {
    await api
      .get(`/order/history`)
      .then(({ data }) => {
        if (data.data !== null) setHistoryData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetailProduct();
  }, [historyData]);

  const handleChange = (id) => {
    const isSelected = selectedDelete.includes(id);
    const newSelectedCheckboxes = isSelected
      ? selectedDelete.filter((checkboxId) => checkboxId !== id)
      : [...selectedDelete, id];
    setSelectedDelete(newSelectedCheckboxes);
  };

  const handleSelectAll = () => {
    const allCheckboxIds = historyData.map((product) => product.id);
    const areAllSelected = allCheckboxIds.every((id) => selectedDelete.includes(id));
    const newSelectedCheckboxes = areAllSelected ? [] : allCheckboxIds;
    setSelectedDelete(newSelectedCheckboxes);
  };
  const checkSelected = selectedDelete.length === historyData.length;
  const handleDelete = async () => {
    try {
      // Prepare an array of promises for deletion requests
      const deletePromises = selectedDelete.map((selected) => api.delete(`/order/history/${selected}`));
      // Execute all deletion requests concurrently using Promise.all
      const deleteResponses = await Promise.all(deletePromises);

      // Update state based on successful deletion responses
      const updatedData = deleteResponses.map((response) => response.data.description);
      toast.success(updatedData[0], {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    } catch (error) {
      console.error('Error deleting order history:', error);
      toast.success(error, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    } finally {
      getDetailProduct();
    }
  };
  return (
    <>
      <Header />
      <main className="p-12 md:px-40 lg:px-32 xl:px-72 2xl:px-80 font-rubik text-base bg-bg-cart bg-center bg-cover bg-no-repeat">
        <h1
          className="text-4xl mb-3 text-center text-white font-bold"
          style={{ textShadow: '4px 4px 0px rgba(0,0,0,.8)' }}
        >
          Let’s see what you have bought!
        </h1>
        <p className="text-white mb-14 text-xl text-center ">Long press to delete item</p>
        <div className="flex justify-end mb-2 gap-4 h-[32px]">
          <button
            onClick={handleDelete}
            className={`${selectedDelete && selectedDelete.length > 0 ? 'block' : ' hidden'} bg-secondary w-max text-white rounded-xl p-1 text-base font-semibold`}
          >
            Delete
          </button>
          <button onClick={handleSelectAll} className="text-white font-semibold text-lg underline ">
            {checkSelected ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {historyData &&
            historyData.map((item) => (
              <CardHistory
                key={item.id}
                data={item}
                onChange={handleChange}
                checked={selectedDelete.includes(item.id)}
              />
            ))}
        </div>
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}

export const CardHistory = (props) => {
  return (
    <div className="bg-white p-4 rounded-2xl flex gap-3 w-full items-start">
      <img src={ProductBanner} alt="" className="w-[75] h-[75px] rounded-full" />
      <div className="w-full h-fit">
        <h3 className="text-[25px] font-semibold mb-2 text-start w-full">{props.data.product_name}</h3>
        <p className="text-lg text-start text-[#895537]">IDR {props.data.product_price}</p>
        <div className="flex justify-between">
          <p className="text-lg mb-3 text-start text-[#895537]">{props.data.status}</p>

          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={props.checked}
              onChange={() => props.onChange(props.data.id)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
