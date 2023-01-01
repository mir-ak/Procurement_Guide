import React, { Component } from "react";
import Product from "./Product";
import Box from "@mui/material/Box";
import MaterialIcon from "material-icons-react";
import Tooltip from "@mui/material/Tooltip";
import databaseApp, { storage } from "../../config/firebaseConfig";
import * as firebase from "firebase/database";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { NotificationManager } from "react-notifications";
export default class ProduiList extends Component {
  state = {
    products: [],
    title: "",
    description: "",
    price: "",
    picture: "",
    category: "",
    messageError: "",
    file: {},
    radios2: [],
    radios: [],
    selectedRadio: "",
    showModel: false,
  };

  handlRadio = (event) => {
    let radio = event.target.value;
    this.setState({ selectedRadio: radio });
  };

  handleModel = () => {
    this.setState({
      showModel: !this.state.showModel,
    });
  };

  handleUpload(e) {
    this.setState({ file: e.target.files[0] });
  }

  addProduct = () => {
    firebase.push(
      firebase.ref(databaseApp, `products/${this.state.category}`),
      {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        category: this.state.category,
        picture: this.state.file.name,
        recommendation: "0/0",
      }
    );
  };

  handCancel = () => {
    this.setState({
      showModel: false,
      title: "",
      description: "",
      price: "",
      category: "",
      messageError: "",
      file: {},
    });
  };

  onSave = () => {
    if (
      this.state.title === "" ||
      this.state.description === "" ||
      this.state.price === "" ||
      this.state.category === "" ||
      this.state.file.name === undefined
    ) {
      this.setState({
        messageError:
          "veuillez remplir tous les champs du formulaire s'il vous plaît !",
      });
    } else if (
      this.state.file.type === "image/png" ||
      this.state.file.type === "image/jpeg" ||
      this.state.file.type === "video/mp4"
    ) {
      this.addProduct();
      const storageRef = ref(storage, `/media/${this.state.file.name}`);
      uploadBytesResumable(storageRef, this.state.file);
      this.handCancel();
      setTimeout(() => {
        NotificationManager.success(`product has been saved`);
        window.location.reload(false);
      }, 300);
    } else {
      this.setState({
        messageError:
          "veuillez charger un fichier de types png, jpeg, jpg et mp4 s'il vous plaît !",
      });
    }
  };

  showModel = () => {
    return (
      <div className="showModel">
        <div className="modelContent">
          <div className="head">
            <Form>
              <FormGroup>
                <Label for="title" hidden>
                  Title
                </Label>
                <Input
                  type="text"
                  name="title"
                  maxLength="30"
                  placeholder="title"
                  value={this.state.title}
                  onChange={(e) => {
                    this.setState({ title: e.target.value });
                  }}
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="description" hidden>
                  Description
                </Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="description"
                  maxLength="60"
                  value={this.state.description}
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="Prix" hidden>
                  Prix
                </Label>
                <Input
                  type="text"
                  name="price"
                  placeholder="price"
                  value={this.state.price}
                  onChange={(e) => {
                    this.setState({ price: e.target.value });
                  }}
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="category" hidden>
                  category
                </Label>
                <Input
                  type="text"
                  name="category"
                  placeholder="category"
                  value={this.state.category}
                  onChange={(e) => {
                    this.setState({ category: e.target.value });
                  }}
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="category" hidden>
                  file
                </Label>
                <Input
                  accept={"image/png, image/jpeg ,image/jpg, video/mp4"}
                  type="file"
                  onChange={(e) => {
                    this.handleUpload(e);
                  }}
                />
              </FormGroup>
            </Form>

            <div className="sourceCode">
              <span
                className="button"
                onClick={() => {
                  this.onSave();
                }}>
                {" "}
                Save Product{" "}
              </span>
            </div>
          </div>
          {this.state.messageError !== "" ? (
            <strong className="text">{this.state.messageError}</strong>
          ) : null}
          <div className="button return" onClick={this.handleModel}>
            close
          </div>
        </div>
      </div>
    );
  };

  getfireBaseUrlImages = (image) => {
    getDownloadURL(ref(storage, `media/${image}`))
      .then((data) => {
        this.setState({ picture: data });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  componentDidMount() {
    var newRadios = [];
    var newProducts = [];
    firebase.onValue(firebase.ref(databaseApp, "products/"), (snapshot) => {
      if (snapshot.val())
        Object.entries(snapshot.val()).forEach(([category, val], idx) => {
          newRadios.push({ id: idx, value: category });
          Object.entries(val).forEach(([id, values]) => {
            getDownloadURL(ref(storage, `media/${values.picture}`))
              .then((data) => {
                let newJsonProduct = {
                  id: id,
                  title: values.title,
                  description: values.description,
                  price: values.price,
                  category: values.category,
                  recommendation: values.recommendation,
                  picture: data,
                };
                newProducts.push(newJsonProduct);
                this.setState({
                  radios: newRadios,
                  products: newProducts,
                  selectedRadio: newProducts[0].category,
                });
              })
              .catch((e) => console.log(e));
          });
        });
    });
  }

  render() {
    let { products, radios, selectedRadio } = this.state;
    return (
      <div className="productContent">
        <ul className="radioDisplay">
          {radios &&
            radios.map((radio) => {
              return (
                <li key={radio.id}>
                  <input
                    type="radio"
                    name="radio"
                    checked={radio.value === selectedRadio}
                    value={radio.value}
                    id={radio.id}
                    onChange={this.handlRadio}
                  />
                  <label htmlFor={radio.id}>{radio.value}</label>
                </li>
              );
            })}

          <Box sx={{ flexGrow: 0.98 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {this.props.admin === "admin" ? (
              <Tooltip title="Add Products">
                <div style={{ marginTop: "-10px" }}>
                  <Button
                    outline
                    color="info"
                    size="sm"
                    onClick={this.handleModel}>
                    <div style={{ marginBottom: "-4px" }}>
                      <MaterialIcon
                        icon="add_circle"
                        size={25}
                        color="#4FEDD2"
                        invert
                      />
                    </div>
                  </Button>
                </div>
              </Tooltip>
            ) : null}
          </Box>
        </ul>
        <div className="projects">
          {this.state.showModel && this.showModel()}
          {products &&
            products
              .filter((item) => item.category.includes(selectedRadio))
              .map((item) => {
                return (
                  <Product key={item.id} item={item} admin={this.props.admin} />
                );
              })}
        </div>
      </div>
    );
  }
}
