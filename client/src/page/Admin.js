import React from "react";
import Navbar from "../components/Navbar";
import ProduiList from "../components/Produit/ProduitLsit";
const Admin = () => {
  return (
    <div>
      <Navbar admin="admin" />
      <div className="Product">
        <ProduiList admin="admin" />
      </div>
    </div>
  );
};

export default Admin;
