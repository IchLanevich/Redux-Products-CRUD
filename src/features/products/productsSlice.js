import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "posts/fetchProducts",
  async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      return res.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ name, price }) => {
    try {
      const res = await axios.post("http://localhost:3000/products", {
        name,
        price,
      });
      return res.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, name, price }) => {
    try {
      const res = await axios.patch(`http://localhost:3000/products/${id}`, {
        name,
        price,
      });
      // return res.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id }) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      console.log(id);
      return id;
    } catch (err) {
      return err.message;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  // reducers: {
  //   addProduct: (state, action) => {
  //     //   console.log("actions", current(state.products));
  //     state.products.push(action.payload);
  //   },
  //   deleteProduct: (state, action) => {
  //     const id = action.payload;

  //     state.products = state.products.filter((product) => product.id !== id);

  //     // const filteredObjects = Object.assign(
  //     //   { state },
  //     //   {
  //     //     products: state.products.filter((product) => product.id !== id),
  //     //   }
  //     // );
  //     // return filteredObjects;
  //   },
  //   updateProduct: (state, action) => {
  //     state.products.forEach((product, index) => {
  //       if (product.id === action.payload.id) {
  //         product.name = action.payload.name;
  //         product.price = action.payload.price;
  //       }
  //     });
  //   },
  // },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending),
      (state, action) => {
        state.status = "loading";
      };
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //
    //
    // builder.addCase(addProduct.fulfilled, (state, action) => {
    //   console.log(action.payload);
    // });
    // builder.addCase(deleteProduct.fulfilled, (state, action) => {
    //   console.log(action);
    // });
    // builder.addCase(updateProduct.fulfilled, (state, action) => {
    //   console.log(action);
    // });
  },
});

// export const { addProduct, deleteProduct, updateProduct } =
//   productsSlice.actions;
export const getAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export default productsSlice.reducer;
