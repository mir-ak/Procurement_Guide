import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/Products/ProductList";

function Product() {
  return (
    <div>
      <Navbar />
      <div className="product">
        <ProductList admin="" />
      </div>
    </div>
  );
}

export default Product;
