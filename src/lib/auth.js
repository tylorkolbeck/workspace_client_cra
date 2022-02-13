export const auth = {
  isAuthenticated: false,
  login(cb) {
    auth.isAuthenticated = true;
    cb();
  },

  logout(cb) {
    auth.isAuthenticated = false;
    cb();
  },
};
