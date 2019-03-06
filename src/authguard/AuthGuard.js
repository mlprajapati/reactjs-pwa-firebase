const AuthGuard = {
  isAuthenticated: false,
  authenticate(cb) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.status === "Success") {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  }
};
AuthGuard.authenticate();
export default AuthGuard;
