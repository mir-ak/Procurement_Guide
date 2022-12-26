import React, { Component } from "react";
import { produitData } from "../../data/produitData";
import Produit from "./Produit";
export default class ProduiList extends Component {
  state = {
    produits: produitData,
    radios: [
      { id: 1, value: "cusine et maison" },
      { id: 2, value: "informatique" },
      { id: 3, value: "jeux et jouets" },
      { id: 4, value: "voiture" },
      { id: 5, value: "Sport" },
    ],
    selectedRadio: "cusine et maison",
  };
  handlRadio = (event) => {
    let radio = event.target.value;
    this.setState({ selectedRadio: radio });
  };
  render() {
    let { produits, radios, selectedRadio } = this.state;
    return (
      <div className="produitContent">
        <ul className="radioDisplay">
          {radios.map((radio) => {
            return (
              <li key={radio.id}>
                <input
                  type="radio"
                  name="radio"
                  checked={radio.value === selectedRadio}
                  value={radio.value}
                  id={radio.value}
                  onChange={this.handlRadio}
                />
                <label htmlFor={radio.value}>{radio.value}</label>
              </li>
            );
          })}
          <div className="projects">
            {produits
              .filter((item) => item.category.includes(selectedRadio))
              .map((item) => {
                return (
                  <Produit key={item.id} item={item} admin={this.props.admin} />
                );
              })}
          </div>
        </ul>
      </div>
    );
  }
}
