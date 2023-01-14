import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../features/products/productsSlice";
import { toast, useToaster } from "react-hot-toast";
import EditModal from "./EditModal";
import Button from "./atomic_components/Button";
import { deleteIcon, editIcon } from "../assets/icons";

const TableData = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteProduct(product));
    dispatch(fetchProducts());
    toast.success("Product deleted");
  };

  return (
    <>
      <div key={product.id} className="flex">
        <div className="border-b text-base md:text-lg flex pl-4 min-w-[100px] md:pl-8 justify-start items-center w-full md:px-4 md:py-4 text-left bg-gray-800 border-slate-100 dark:border-slate-700  text-slate-500 dark:text-slate-400">
          {product.name}
        </div>
        <div className="border-b flex pl-4 md:pl-8 text-base md:text-lg justify-start items-center w-full md:px-4 md:py-4 text-left bg-gray-800 border-slate-100 dark:border-slate-700  text-slate-500 dark:text-slate-400">
          ${product.price}
        </div>
        <div className="border-b flex justify-center items-center w-full p-2 md:px-4 md:py-4 text-left bg-gray-800 border-slate-100 dark:border-slate-700  text-slate-500 dark:text-slate-400">
          <Button icon={deleteIcon} onClick={() => handleDelete()} />
          <Button icon={editIcon} onClick={() => setIsModalOpen(true)} />
        </div>
      </div>
      <EditModal
        product={product}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
export default TableData;
