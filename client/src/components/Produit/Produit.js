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
    let { id, name, picture } = this.props.item;
    return (
      <div className="project">
        <h4>{name}</h4>
        <button onClick={() => id}>
          <img src={picture} alt="" onClick={() => this.onClickImage(id)} />
        </button>
      </div>
    );
  }
}
