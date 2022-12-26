import { ref, onValue, child, update } from "firebase/database";
import databaseApp from "../../config/firebaseConfig";

class AuthContext {
  updatedata = (value) => {
    update(child(ref(databaseApp), "Admin/"), {
      authenticated: value,
    });
  };

  login(cb) {
    this.updatedata(true);
    cb();
  }

  logout() {
    this.updatedata(false);
  }

  isAuthenticated() {
    onValue(ref(databaseApp, "Admin/"), (snapshot) => {
      if (snapshot.val().authenticated) {
        localStorage.setItem("authenticated", true);
      } else {
        localStorage.setItem("authenticated", false);
      }
    });
    return localStorage.getItem("authenticated");
  }
}
export default new AuthContext();
