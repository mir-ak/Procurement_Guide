import React, { useEffect, useState } from "react";
import databaseApp from "../../config/firebaseConfig";
import { ref, onValue, child, update, remove } from "firebase/database";
import MaterialIcon from "material-icons-react";
import IconButton from "@mui/material/IconButton";
import ApexChart from "../chart/ApexChart";
import ReactiveButton from "reactive-button";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactStars from "react-rating-stars-component";
import ApexChartAngleCircle from "../chart/ApexChartAngleCircle";
import { NotificationManager } from "react-notifications";

export default function ExperClass({ id }) {
  let i = 0;
  const comments = { compentPositive: 0, compentNegative: 0 };
  const [db_list, setDb_list] = useState([]);
  const [state, setState] = useState("idle");
  const [starOne, setstarOne] = useState(0);
  const [starTwo, setstarTwo] = useState(0);
  const [starThree, setstarThree] = useState(0);
  const [starFour, setstarFour] = useState(0);
  const [starFive, setstarFive] = useState(0);
  const [totalStars, setTotalStars] = useState([]);

  useEffect(() => {
    const countItemStars = (item) => {
      if (item === 5) setstarFive((prevArray) => prevArray + item);
      else if (item === 4 || item === 4.5)
        setstarFour((prevArray) => prevArray + item);
      else if (item === 3 || item === 3.5)
        setstarThree((prevArray) => prevArray + item);
      else if (item === 2 || item === 2.5)
        setstarTwo((prevArray) => prevArray + item);
      else if (item === 0.5 || item === 1.5)
        setstarOne((prevArray) => prevArray + item);
    };

    function init_db() {
      onValue(ref(databaseApp, "comments/" + id.id), (snapshot) => {
        let previousList = snapshot.val();
        let list = [];
        for (let item in previousList) {
          setTotalStars((prevArray) => [
            ...prevArray,
            previousList[item].countStars,
          ]);
          countItemStars(previousList[item].countStars);
          list.push({ item, ...previousList[item] });
        }
        setDb_list(list);
      });
    }
    init_db();
  }, [id]);

  const ArrayAvg = (myArray) => {
    var i = 0,
      summ = 0,
      ArrayLen = myArray.length;
    while (i < ArrayLen) {
      summ = summ + myArray[i++];
    }
    return summ / ArrayLen;
  };

  // const updateCountStars = (index) => {
  //   onValue(
  //     ref(databaseApp, "products/" + id.category + "/" + id.id),
  //     (snapshot) => {
  //       if (snapshot.val() && id.id)
  //         update(ref(databaseApp, "products/" + id.category + "/" + id.id), {
  //           recommendation: `${
  //             Number(snapshot.val().recommendation.split("/")[0]) +
  //             index.countStars
  //           } / ${Number(snapshot.val().recommendation.split("/")[1]) + 1}`,
  //         });
  //     }
  //   );
  // };

  const deletComment = (index) => {
    remove(child(ref(databaseApp), "comments/" + id.id + "/" + index.item));
    //updateCountStars(index);
    NotificationManager.success(`comment has been deleted`);
  };

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

  const updateReview = (index) => {
    if (index.predire === "positive") {
      update(child(ref(databaseApp), "comments/" + id.id + "/" + index.item), {
        commentaire: index.commentaire,
        countStars: index.countStars,
        predire: "negative",
      });
    } else {
      update(child(ref(databaseApp), "comments/" + id.id + "/" + index.item), {
        commentaire: index.commentaire,
        countStars: index.countStars,
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
      {db_list.length > 0 && id.admin ? (
        <div
          style={{
            display: db_list.length > 0 ? "grid" : "none",
            float: "right",
            justifyItems: "end",
            position: "absolute",
            right: 0,
          }}>
          <div>
            <ApexChart comments={countComments()} />
          </div>
          <div
            style={{
              position: "relative",
              right: "45%",
            }}>
            <ReactiveButton
              buttonState={state}
              onClick={() => {
                onClickHandler();
                callfunction();
              }}
              color="teal"
              width={"220px"}
              animation={true}
              style={{
                borderRadius: "25px",
              }}
              idleText={"Réentraîner le modèle ML "}
            />
          </div>
          {totalStars.length > 0 ? (
            <div
              style={{
                position: "relative",
                right: "25%",
                top: "5%",
              }}>
              <strong style={{ fontSize: "25px" }}>
                <u>Avis des clients</u>
              </strong>
              <div>
                <ReactStars
                  classNames={"mx-left"}
                  count={5}
                  value={ArrayAvg(totalStars)}
                  size={35}
                  edit={false}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                <div>
                  <strong>
                    <u>Note Globale</u>: {ArrayAvg(totalStars).toFixed(2)} sur 5
                  </strong>
                </div>
                <div>
                  <ApexChartAngleCircle
                    data={[
                      (starFive * 100) / (totalStars.length * 5),
                      (starFour * 100) / (totalStars.length * 4),
                      (starThree * 100) / (totalStars.length * 3),
                      (starTwo * 100) / (totalStars.length * 2),
                      (starOne * 100) / totalStars.length,
                    ]}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="myBox" style={{ float: id.admin ? null : "right" }}>
        {db_list.length > 0 &&
          db_list.map((item) => {
            return (
              <div className="ShowComment" key={item.item}>
                <h4>
                  <MaterialIcon
                    icon="account_circle"
                    size={30}
                    color="#000000"
                    invert
                  />{" "}
                  <u>Utlilisateur{++i}</u> :{" "}
                </h4>
                {item.countStars > 0 ? (
                  <div
                    style={{
                      marginLeft: "22rem",
                      justifyContent: "center",
                    }}>
                    <ReactStars
                      classNames={"mx-left"}
                      count={5}
                      value={item.countStars}
                      size={35}
                      edit={false}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                  </div>
                ) : null}
                <p className="text_">
                  {item.commentaire} <br></br>
                  {id.admin ? (
                    <span>
                      {" "}
                      <strong>avis</strong> : {item.predire}
                      <IconButton onClick={updateReview.bind(this, item)}>
                        <MaterialIcon
                          icon="update"
                          size={25}
                          color="rgb(139, 0, 0)"
                          invert
                        />
                      </IconButton>
                      <IconButton onClick={deletComment.bind(this, item)}>
                        <MaterialIcon
                          icon="delete_sweep"
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
    </div>
  );
}
