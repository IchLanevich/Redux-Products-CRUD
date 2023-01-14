import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  getAllProducts,
  getProductsError,
  getProductsStatus,
} from "./productsSlice";
import TableData from "../../components/TableData";
import LoadingSpinner from "../../components/atomic_components/LoadingSpinner";

const ProductList = () => {
  // return an array of product object
  const [sortBy, setSortBy] = useState(""); // byHighestPrice | byLowestPrice

  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const productsStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  // console.log(products);
  // console.log(typeof products); //object
  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch, sortBy]);

  const RenderTableData = () => {
    if (sortBy === "byHighestPrice") {
      const byHighestPrice = [...products].sort((a, b) => {
        return b.price - a.price;
      });
      return byHighestPrice.map((product) => {
        return <TableData product={product} key={product.id} />;
      });
    }
    if (sortBy === "byLowestPrice") {
      const byLowestPrice = [...products].sort((a, b) => {
        return a.price - b.price;
      });
      return byLowestPrice.map((product) => {
        return <TableData product={product} key={product.id} />;
      });
    }
    if (sortBy === "") {
      return products.map((product) => {
        return <TableData product={product} key={product.id} />;
      });
    }
  };

  return (
    <div className="text-2xl">
      <div className="">
        <Toaster position="top-center" reverseOrder={true} />
      </div>

      <div className="select flex flex-col items-end justify-center my-2">
        <div className="filter-wrapper flex flex-col">
          <select
            name="filter"
            id="filter"
            className="text-slate-300 bg-gray-800 rounded px-4 py-2 text-xl"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="byHighestPrice">By highest price</option>
            <option value="byLowestPrice">By lowest price</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="border-b text-base rounded-tl md:text-xl min-w-[100px] pl-4 md:pl-8 md:px-4 py-2 bg-gray-700 dark:border-slate-600 font-medium  text-slate-400 dark:text-slate-200 text-left">
          Product
        </div>
        <div className="border-b text-base md:text-xl w-full pl-4 md:pl-8 md:px-4 py-2 bg-gray-700 dark:border-slate-600 font-medium text-slate-400 dark:text-slate-200 text-left">
          Price
        </div>
        <div className="border-b w-full rounded-tr text-center px-4 py-2 bg-gray-700 dark:border-slate-600 font-medium text-slate-400 dark:text-slate-200"></div>
      </div>

      <div>
        {productsStatus === "succeeded" ? (
          <RenderTableData />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default ProductList;
