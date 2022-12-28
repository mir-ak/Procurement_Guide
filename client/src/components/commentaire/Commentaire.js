import React, { useEffect, useState } from "react";
import databaseApp from "../../config/firebaseConfig";
import { ref, onValue, child, update } from "firebase/database";
import MaterialIcon from "material-icons-react";
import IconButton from "@mui/material/IconButton";
import ApexChart from "./ApexChart";
import ReactiveButton from "reactive-button";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ExperClass({ id }) {
  let i = 0;
  const comments = { compentPositive: 0, compentNegative: 0 };
  const [db_list, setDb_list] = useState([]);
  const [state, setState] = useState("idle");
  useEffect(() => {
    function init_db() {
      onValue(ref(databaseApp, "comments/" + id.id), (snapshot) => {
        let previousList = snapshot.val();
        let list = [];
        for (let item in previousList) {
          list.push({ item, ...previousList[item] });
        }
        setDb_list(list);
      });
    }
    init_db();
  }, [id]);

  /* const deletdata= (index) =>{
    console.log(index);
    remove(child(ref(databaseApp), "comment/"+id.id+'/'+index));   
  } */

  const onClickHandler = () => {
    setState("loading");
    setTimeout(() => {
      setState("success");
    }, 19500);
  };

  const callfunction = () => {
    fetch("/IsOk?IsOk=yes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data["IsOk"]);
      });
  };

  const updatedata = (index) => {
    console.log(index);
    if (index.predire === "positive") {
      update(child(ref(databaseApp), "comments/" + id.id + "/" + index.item), {
        commentaire: index.commentaire,
        predire: "negative",
      });
    } else {
      update(child(ref(databaseApp), "comments/" + id.id + "/" + index.item), {
        commentaire: index.commentaire,
        predire: "positive",
      });
    }
  };

  const countComments = () => {
    db_list.forEach((item) => {
      if (item.predire === "positive") {
        comments.compentPositive++;
      } else {
        comments.compentNegative++;
      }
    });
    return comments;
  };

  return (
    <div>
      {id.admin ? (
        <div style={{ margin: "5%" }}>
          <ApexChart comments={countComments()} />
          <div style={{ float: "right" }}>
            <ReactiveButton
              buttonState={state}
              onClick={() => {
                onClickHandler();
                callfunction();
              }}
              color="teal"
              width={"200px"}
              animation={true}
              style={{
                borderRadius: "25px",
                marginTop: "170%",
                marginLeft: "-30%",
              }}
              idleText={"Relancer le Modèle"}
            />
          </div>
        </div>
      ) : null}
      {db_list &&
        db_list.map((item) => {
          return (
            <div className="ShowComment" key={item.commentaire}>
              <h4>
                <MaterialIcon
                  icon="account_circle"
                  size={30}
                  color="#000000"
                  invert
                />{" "}
                user{++i} :{" "}
              </h4>
              <p className="text_">
                {item.commentaire} <br></br>
                {id.admin ? (
                  <span>
                    {" "}
                    avis : {item.predire}
                    <IconButton onClick={updatedata.bind(this, item)}>
                      <MaterialIcon
                        icon="update"
                        size={25}
                        color="rgb(139, 0, 0)"
                        invert
                      />
                    </IconButton>
                  </span>
                ) : null}
              </p>
            </div>
          );
        })}
    </div>
  );
}
