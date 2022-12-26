import React, { Component } from "react";

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

  onClickImage = (id) => {
    window.location.href = this.props.admin + "/showcomment/" + id;
  };

  render() {
    let { id, name, picture, info, prix } = this.props.item;
    return (
      <div className="project" style={{ cursor: "pointer" }}>
        <button
          style={{ borderRadius: "25px" }}
          onClick={() => this.onClickImage(id)}>
          <img src={picture} alt="" />
          <h4>{name}</h4>
          <h5>{info}</h5>
          <h6
            style={{
              width: "30%",
              display: "block",
              fontSize: "1.4rem",
              backgroundColor: "green",
            }}>
            {prix}
          </h6>
        </button>
      </div>
    );
  }
}
