import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
export default class Produit extends Component {
  state = {
    commentaire: "",
    list_db: [],
    showInfos: false,
  };

  cancelCourse = () => {
    this.setState({ commentaire: "" });
  };

  handleInfo = () => {
    this.setState({
      showInfos: !this.state.showInfos,
    });
  };

  onClickImage = (id, category) => {
    window.location.href = `${this.props.admin}/showcomment/${category}/${id}`;
  };

  render() {
    let { id, title, picture, category, description, price, recommendation } =
      this.props.item;
    return (
      <div className="project" style={{ cursor: "pointer" }}>
        <button
          style={{ borderRadius: "25px" }}
          onClick={() => this.onClickImage(id, category)}>
          <img src={picture} alt="" />
          <h4>{title}</h4>
          <h5>{description}</h5>
          {Number(recommendation.split("/")[0]) /
            Number(recommendation.split("/")[1]) >
          0 ? (
            <ReactStars
              classNames={"mx-left"}
              count={5}
              size={35}
              value={
                Number(recommendation.split("/")[0]) /
                Number(recommendation.split("/")[1])
              }
              edit={false}
              color={"#ffffff"}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          ) : null}
          <h6
            style={{
              width: "50%",
              display: "block",
              fontSize: "1.4rem",
              backgroundColor: "green",
            }}>
            {price}
          </h6>
        </button>
      </div>
    );
  }
}
