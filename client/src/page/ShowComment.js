import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { produitData } from "../data/produitData";
import TextField from "@material-ui/core/TextField";
import IconButton from "@mui/material/IconButton";

import DirectionsIcon from "@mui/icons-material/Directions";

import Navbar from "../components/Navbar";
import Commentaire from "../components/commentaire/Commentaire";
import databaseApp from "../config/firebaseConfig";
import { ref, push } from "firebase/database";

function ShowComment() {
  const [FromCommentaire, SetCommentaire] = useState({ commentaire: "" });
  const id = useParams();
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
          push(ref(databaseApp, "comments/" + id.id), {
            commentaire: FromCommentaire.commentaire,
            predire: data["comments"],
          });
        });
    }
    cancelCourse();
  };

  return (
    <div className="ShowComment">
      {id.admin ? <Navbar admin="admin" /> : <Navbar />}
      <h3>{produitData[id.id].name} </h3>
      <div className="container">
        <img src={produitData[id.id].picture} alt="" />

        <Commentaire id={id} />
      </div>
      {id.admin ? null : (
        <div className="box">
          <h3>Note le produit </h3>
          <div className="comment"></div>
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
    </div>
  );
}

export default ShowComment;
