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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import { withStyles } from "@material-ui/core/styles";

export default class ProduiList extends Component {
  state = {
    products: [],
    title: "",
    description: "",
    price: "",
    picture: "",
    category: "",
    messageError: "",
    filtre: "",
    file: {},
    radios2: [],
    radios: [],
    selectedRadio: "",
    showModel: false,
    currentPage: 1,
    elementsPerPage: 10,
  };

  CustomInputLabel = withStyles({
    root: {
      color: "rgb(99, 164, 233)",
    },
  })(InputLabel);

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
        price: Number(this.state.price),
        category: this.state.category,
        picture: this.state.file.name,
        recommendation: "0/0",
      }
    );
  };

  filterPrice = (event) => {
    this.setState({ filtre: event.target.value });
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
      NotificationManager.success(`product has been saved`);
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
                <Label for="Titre" hidden>
                  Titre
                </Label>
                <Input
                  type="text"
                  name="title"
                  maxLength="30"
                  placeholder="Titre"
                  value={this.state.title}
                  onChange={(e) => {
                    this.setState({ title: e.target.value });
                  }}
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="Description" hidden>
                  Description
                </Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Description"
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
                  type="number"
                  name="title"
                  placeholder="Prix € "
                  value={this.state.price}
                  onChange={(e) => {
                    this.setState({ price: e.target.value });
                  }}
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="Catégorie" hidden>
                  Catégorie
                </Label>
                <Input
                  type="text"
                  name="Catégorie"
                  placeholder="Catégorie"
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
              <span className="button" onClick={this.handleModel}>
                {" "}
                Annuler
              </span>
            </div>
          </div>
          {this.state.messageError !== "" ? (
            <strong className="text">{this.state.messageError}</strong>
          ) : null}
          <div
            className="button return"
            onClick={() => {
              this.onSave();
            }}>
            Ajouter le produit{" "}
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
          if (!newRadios.some((item) => item.id === idx))
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
                if (
                  !newProducts.some((item) => item.id === newJsonProduct.id)
                ) {
                  newProducts.push(newJsonProduct);
                }

                this.setState({
                  radios: newRadios.sort((a, b) =>
                    a.value.localeCompare(b.value)
                  ),
                  products: newProducts.sort((a, b) =>
                    (isNaN(
                      Number(a.recommendation.split("/")[0]) /
                        Number(a.recommendation.split("/")[1])
                    )
                      ? 0
                      : Number(a.recommendation.split("/")[0]) /
                        Number(a.recommendation.split("/")[1])) >
                    (isNaN(
                      Number(b.recommendation.split("/")[0]) /
                        Number(b.recommendation.split("/")[1])
                    )
                      ? 0
                      : Number(b.recommendation.split("/")[0]) /
                        Number(b.recommendation.split("/")[1]))
                      ? -1
                      : 1
                  ),
                  selectedRadio: newProducts[0].category,
                });
              })
              .catch((e) => console.log(e));
          });
        });
    });
  }

  render() {
    let { products, radios, selectedRadio, filtre, elementsPerPage } =
      this.state;
    const filterData = products
      ? products.filter((item) => item.category.includes(selectedRadio))
      : [];
    const indexOfLastElement =
      this.state.currentPage * this.state.elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - this.state.elementsPerPage;
    return (
      <div className="productContent">
        <ul className="radioDisplay">
          {radios && radios.length <= 4 ? (
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
            })
          ) : (
            <FormControl
              variant="standard"
              sx={{
                m: -1.8,
                minWidth: 180,
              }}>
              <this.CustomInputLabel id="product">
                Catégorie
              </this.CustomInputLabel>
              <Select
                labelId="product"
                id="simple-select"
                sx={{
                  color: "#4fedd2",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "#4fedd2 !important",
                  },
                }}
                value={this.state.selectedRadio}
                onChange={this.handlRadio}
                label="Category">
                {radios.map((radio) => (
                  <MenuItem key={radio.id} value={radio.value}>
                    {radio.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl
            variant="filled"
            sx={{
              m: -2.8,
              minWidth: 250,
              opacity: 0.8,

              //position: "absolute",
              left: "5%",
            }}>
            <this.CustomInputLabel id="product">filters</this.CustomInputLabel>
            <Select
              labelId="product"
              id="simple-select"
              sx={{
                color: "#4fedd2",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                ".MuiSvgIcon-root ": {
                  fill: "#4fedd2 !important",
                },
              }}
              value={this.state.filtre}
              onChange={this.filterPrice}
              label="Category">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="moin">
                <em>Du moin cher au plus cher</em>
              </MenuItem>
              <MenuItem value="plus">
                <em>Du plus cher au moin cher</em>
              </MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flexGrow: 0.98 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {this.props.admin === "admin" ? (
              <Tooltip title="Ajouter un produit">
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
          {filtre === "moin"
            ? filterData
                .sort((a, b) => (a.price > b.price ? 1 : -1))
                .slice(indexOfFirstElement, indexOfLastElement)
                .map((item) => {
                  return (
                    <Product
                      key={item.id}
                      item={item}
                      admin={this.props.admin}
                    />
                  );
                })
            : filtre === "plus"
            ? filterData
                .sort((a, b) => (a.price > b.price ? -1 : 1))
                .slice(indexOfFirstElement, indexOfLastElement)
                .map((item) => {
                  return (
                    <Product
                      key={item.id}
                      item={item}
                      admin={this.props.admin}
                    />
                  );
                })
            : filterData
                .slice(indexOfFirstElement, indexOfLastElement)
                .map((item) => {
                  return (
                    <Product
                      key={item.id}
                      item={item}
                      admin={this.props.admin}
                    />
                  );
                })}
        </div>
        <div className="pagination">
          <Pagination
            color="primary"
            defaultPage={1}
            count={Math.ceil(filterData.length / elementsPerPage)}
            onChange={(event, page) => this.setState({ currentPage: page })}
          />
        </div>
      </div>
    );
  }
}
