// login.js
import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "../../styles/Login.css";
import { auth } from "../../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "../PrivateRoute/Auth";
import Navbar from "../Navbar";
import { NotificationManager } from "react-notifications";
class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  cancelCourse = () => {
    this.setState({ email: "" });
    this.setState({ password: "" });
  };
  Login = (email, password) => {
    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (user) => {
          if (user) {
            AuthContext.login(() => {
              this.props.history.push("/admin");
            });
            NotificationManager.success(`You are logged in successfully`);
          }
        },
        function (error) {
          console.log(error.toString(error));
          alert("\nvotre mot de passe ou mail incorrect. veuillez le vérifier");
        }
      );
    } catch (error) {
      console.log(error.toString(error));
    }
    this.cancelCourse();
  };
  render() {
    return (
      <div>
        <Navbar />
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
                Login
              </Typography>
              <form noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address *"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={(event) =>
                    this.setState({ email: event.currentTarget.value })
                  }
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
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
                    this.Login(this.state.email, this.state.password)
                  }
                  disabled={!this.state.email || !this.state.password}>
                  Sign In
                </Button>
                {/* <Grid container>
                  <Grid item>
                    <Link href="SingUp" variant="body2">
                      {"Vous n'avez pas de compte? S'inscrire"}
                    </Link>
                  </Grid>
                </Grid> */}
              </form>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
export default Login;
