import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/Products/ProductList";
const Admin = () => {
  return (
    <div>
      <Navbar admin="admin" />
      <div className="product">
        <ProductList admin="admin" />
      </div>
    </div>
  );
};

export default Admin;
