export const storage = {
  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setUser(user) {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  },

  removeUser() {
    localStorage.removeItem("user");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token) {
    localStorage.setItem("token", token);
  },

  removeToken() {
    localStorage.removeItem("token");
  },
};