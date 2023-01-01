// login.js
import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "../../styles/Login.css";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

class Singup extends Component {
  state = {
    email: "",
    password: "",
  };

  cancelCourse = () => {
    this.setState({ email: "" });
    this.setState({ password: "" });
  };
  Signup = (email, password) => {
    let regEmail = /^[0-9a-zA-Z_]+@[0-9a-zA-Z_]+.[a-zA-Z]{2,}$/;
    if (password.length < 6) {
      alert("veuillez saisir au moins 6 caractères de mots de passe");
    } else if (regEmail.test(email) !== true) {
      alert("veuillez saisir un mail valide ");
    } else {
      createUserWithEmailAndPassword(auth, email, password).then(
        (user) => {
          console.log(user.user.email);
          alert(
            "votre inscription a bien été enregistrée veuillez vous connecter"
          );
        },
        function (error) {
          if (regEmail.test(email) === true) {
            console.log(error);
            alert(
              "\nun compte et déjà existant avec cette email veuillez le vérifier"
            );
          }
        }
      );
    }
    this.cancelCourse();
  };
  render() {
    return (
      <div className="contraint">
        <Container
          component="main"
          maxWidth="xs"
          style={{ margin: "10% auto" }}>
          <CssBaseline />
          <div
            style={{
              marginTop: "spacing(8)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              SingUp
            </Typography>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address *"
                name="email"
                value={this.state.email}
                onChange={(event) =>
                  this.setState({ email: event.currentTarget.value })
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={(event) =>
                  this.setState({ password: event.currentTarget.value })
                }
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() =>
                  this.Signup(this.state.email, this.state.password)
                }
                disabled={!this.state.email || !this.state.password}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Vous avez deja un compte? S'identifier"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
export default Singup;
