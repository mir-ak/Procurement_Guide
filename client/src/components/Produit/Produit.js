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
    console.log(category);
    window.location.href =
      this.props.admin + "/showcomment/" + id + "/" + category;
  };

  render() {
    let { id, title, picture, category, description, price } = this.props.item;
    return (
      <div className="project" style={{ cursor: "pointer" }}>
        <button
          style={{ borderRadius: "25px" }}
          onClick={() => this.onClickImage(id, category)}>
          <img src={picture} alt="" />
          <h4>{title}</h4>
          <h5>{description}</h5>
          <ReactStars
            count={5}
            size={35}
            value={3.5}
            color={"#ffffff"}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          <h6
            style={{
              width: "30%",
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
