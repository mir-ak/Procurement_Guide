import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import IconButton from "@mui/material/IconButton";
import DirectionsIcon from "@mui/icons-material/Directions";
import Navbar from "../components/Navbar";
import Commentaire from "../components/commentaire/Commentaire";
import databaseApp, { storage } from "../config/firebaseConfig";
import * as firebase from "firebase/database";
import { ref, getDownloadURL } from "firebase/storage";

function ShowComment() {
  const [FromCommentaire, SetCommentaire] = useState({ commentaire: "" });
  const [products, setProducts] = useState([]);
  const qaury = useParams();
  const cancelCourse = () => {
    SetCommentaire({ ...FromCommentaire, commentaire: "" });
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
          });
        });
    }
    cancelCourse();
  };

  useEffect(() => {
    var newProducts = [];
    firebase.onValue(
      firebase.ref(databaseApp, `products/${qaury.category}/${qaury.id}`),
      (snapshot) => {
        getDownloadURL(ref(storage, `media/${snapshot.val().picture}`))
          .then((data) => {
            let newJsonProduct = {
              title: snapshot.val().title,
              description: snapshot.val().description,
              price: snapshot.val().price,
              category: snapshot.val().category,
              picture: data,
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
        {qaury.admin ? null : (
          <div className="box">
            <h3>Note le produit </h3>
            <form className="comment">
              <TextField
                variant="outlined"
                margin="normal"
                label="Saisir votre Commentaire *"
                type="text"
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
                      color="primary"
                      sx={{ p: "10px" }}
                      onClick={() => onPressComment()}>
                      <DirectionsIcon />
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
          <h3>{products[0].title} </h3>
          <div className="container">
            <img src={products[0].picture} alt="" />
            <Commentaire id={qaury} />
          </div>
          {showOneComment()}
        </div>
      ) : null}
    </>
  );
}

export default ShowComment;
