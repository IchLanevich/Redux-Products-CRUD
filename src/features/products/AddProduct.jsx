import React from "react";
import { useDispatch } from "react-redux";
import { addProduct, fetchProducts } from "./productsSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const products = useSelector((state) => state.products.products);

  // console.log(products);

  const toastClassName = {
    className: "max-w-xl",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Please add product name.", toastClassName);
      return;
    }
    if (!price) {
      toast.error("Please add product price.", toastClassName);
      return;
    }

    // if (name && price) {
    //   dispatch(
    //     addProduct({
    //       id: products.length + 1,
    //       name: name,
    //       price: price,
    //     })
    //   );
    // }

    await dispatch(addProduct({ name, price }));

    setName("");
    setPrice("");
    toast.success("Product added");
    dispatch(fetchProducts());
  };

  return (
    <div className="my-16">
      <div className="bg-gray-800 flex justify-center rounded">
        <form className="w-full max-w-4xl" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-control flex flex-col px-6 py-4">
            <label
              htmlFor="productName"
              className="text-left font-semibold my-3"
            >
              Name
            </label>
            <input
              className="bg-gray-700 px-3 py-2 rounded outline-none focus:bg-gray-600"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="productName"
            />
            <label
              htmlFor="productPrice"
              className="text-left font-semibold my-3"
            >
              Price
            </label>
            <input
              className="bg-gray-700 px-3 py-2 rounded outline-none focus:bg-gray-600"
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="productPrice"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 text-slate-200 bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded font-semibold my-8"
          >
            Add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
