import React from "react";
import Navbar from "../components/Navbar";
import ProduiList from "../components/Produit/ProduitLsit";

function Product() {
  return (
    <div>
      <Navbar />
      <div className="Product">
        <ProduiList admin="" />
      </div>
    </div>
  );
}

export default Product;
