import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import IconButton from "@mui/material/IconButton";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import Navbar from "../components/Navbar";
import Comments from "../components/Comments/Comments";
import databaseApp, { storage } from "../config/firebaseConfig";
import * as firebase from "firebase/database";
import { ref, getDownloadURL } from "firebase/storage";
import ReactStars from "react-rating-stars-component";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";

function ShowComment() {
  const [FromCommentaire, SetCommentaire] = useState({ commentaire: "" });
  const [products, setProducts] = useState([]);
  const [countStars, setCountStars] = useState(0);
  const qaury = useParams();
  let history = useHistory();
  const cancelCourse = () => {
    SetCommentaire({ ...FromCommentaire, commentaire: "" });
    setCountStars(0);
  };

  const onPressComment = () => {
    if (FromCommentaire.commentaire === "") {
      alert("Veuillez remplir le champs ! ");
    } else {
      fetch("/comments?comment=" + FromCommentaire.commentaire)
        .then((res) => res.json())
        .then((data) => {
          firebase.push(firebase.ref(databaseApp, "comments/" + qaury.id), {
            commentaire: FromCommentaire.commentaire,
            predire: data["comments"],
            countStars: countStars,
          });
          if (products.length > 0)
            firebase.update(
              firebase.ref(
                databaseApp,
                "products/" + qaury.category + "/" + qaury.id
              ),
              {
                recommendation: `${
                  Number(products[0].recommendation.split("/")[0]) + countStars
                } / ${Number(products[0].recommendation.split("/")[1]) + 1}`,
              }
            );
        });
    }
    cancelCourse();
  };

  const deletProduct = (id) => {
    firebase.remove(
      firebase.child(
        firebase.ref(databaseApp),
        "products/" + qaury.category + "/" + id
      )
    );
    NotificationManager.success(`product has been deleted`);
    history.push("/admin");
  };

  const ratingChanged = (newRating) => {
    setCountStars(newRating);
  };

  useEffect(() => {
    var newProducts = [];
    firebase.onValue(
      firebase.ref(databaseApp, `products/${qaury.category}/${qaury.id}`),
      (snapshot) => {
        if (snapshot.val())
          getDownloadURL(ref(storage, `media/${snapshot.val().picture}`))
            .then((data) => {
              let newJsonProduct = {
                title: snapshot.val().title,
                description: snapshot.val().description,
                price: snapshot.val().price,
                category: snapshot.val().category,
                picture: data,
                recommendation: snapshot.val().recommendation,
              };

              newProducts.push(newJsonProduct);

              setProducts(newProducts);
            })
            .catch((e) => console.log(e));
      }
    );
  }, [qaury]);

  const showOneComment = () => {
    return (
      <>
        {qaury.admin ? (
          <div className="button">
            <Button
              component={Link}
              to="/admin"
              outline
              color="danger"
              style={{ justifyContent: "center", boxSizing: "border-box" }}
              onClick={deletProduct.bind(this, qaury.id)}>
              Supprimer le produit
            </Button>
          </div>
        ) : (
          <div className="box">
            <h3>Écrire une critique</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactStars
                classNames={"mx-left"}
                count={5}
                onChange={ratingChanged}
                size={35}
                isHalf={false}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            </div>
            <form className="comment">
              <TextField
                variant="standard"
                margin="normal"
                label="Écrire une critique *"
                type="text"
                style={{ width: "90%" }}
                value={FromCommentaire.commentaire}
                onChange={(event) =>
                  SetCommentaire({
                    ...FromCommentaire,
                    commentaire: event.currentTarget.value,
                  })
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      color="inherit"
                      sx={{ p: "15px" }}
                      disabled={FromCommentaire.commentaire === ""}
                      onClick={() => onPressComment()}>
                      <ForwardToInboxIcon />
                    </IconButton>
                  ),
                }}
              />
            </form>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {qaury.admin ? <Navbar admin="admin" /> : <Navbar />}
      {products && products.length > 0 ? (
        <div className="ShowComment">
          <h3>
            {" "}
            <u>Produit : {products[0].title} </u>
          </h3>
          <div className="container">
            <img src={products[0].picture} alt="" />
            <Comments id={qaury} />
          </div>
          {showOneComment()}
        </div>
      ) : null}
    </>
  );
}

export default ShowComment;
