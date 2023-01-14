import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  fetchProducts,
  updateProduct,
} from "../features/products/productsSlice";

const EditModal = ({ product, isModalOpen, setIsModalOpen }) => {
  const modalOpen = ["flex"];
  const modalClosed = ["hidden"];
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const dispatch = useDispatch();

  const toastClassName = {
    className: "max-w-xl",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Please enter a product name.", toastClassName);
      return;
    }
    if (price === "") {
      toast.error("Please enter a product price.", toastClassName);
      return;
    }

    if (name && price) {
      await dispatch(
        updateProduct({
          id: product.id,
          name: name,
          price: price,
        })
      );
    }
    setIsModalOpen(false);
    dispatch(fetchProducts());
    toast.success("Edit saved");
  };

  return (
    <div
      className={`${
        isModalOpen ? modalOpen : modalClosed
      } absolute z-1 inset-0 justify-center items-center bg-gray-900/90`}
    >
      <div className="form-wrapper w-[400px] max-w-4xl">
        <div className="close-btn-wrapper flex justify-end">
          <button
            onClick={() => setIsModalOpen(() => setIsModalOpen(false))}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 p-3 rounded-t"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col p-6 text-gray-900  bg-slate-300 rounded-tl rounded-bl rounded-br"
        >
          <label
            htmlFor="name"
            className="text-left text-base font-medium mb-1"
          >
            Name
          </label>
          <input
            type="text"
            className="text-gray-900 px-4 py-2 rounded text-base mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor="name"
            className="text-left text-base font-medium mb-1"
          >
            Price
          </label>
          <input
            type="number"
            className="text-gray-900 px-4 py-2 rounded text-base"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button className="bg-cyan-600 rounded mt-8 text-white px-4 py-2 text-base font-semibold tracking-wide">
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
