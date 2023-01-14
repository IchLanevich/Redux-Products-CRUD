import { useState } from "react";
import "./App.css";
import AddProduct from "./features/products/AddProduct";
import ProductList from "./features/products/ProductList";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Redux Shop</h1>
      <AddProduct />
      <ProductList />
    </div>
  );
}

export default App;
