/*const baseURL = "http://localhost:5000/";
const staticURL = "http://localhost:5000/";

exports.ROUTER = {
  RESET: "/reset",
  LOGIN: "/login",
  HOME: "/home",

  USERS: {
    LIST: "/user",
    CREATE: "/user/new",
    EDIT: (id) => `/user/edit/${id}`,
  },

  ERROR: "/404",
};
exports.STATIC = {
  LOGO: "/assets/images/logo.png",
  LOGO_WHITE: "/assets/images/logo_white.jpg",
  ICON: "/assets/images/icon.png",
  TITLE: "Brasserie 529",
  ROUTE: (file) =>
    `${staticURL}${file.startsWith("/") ? file.substring(1) : file}`,
};
exports.API = {
  auth: {
    login: `${baseURL}admin-api/v1/auth/login`,
  },
  me: `${baseURL}admin-api/v1/me/`,

  user: {
    create: `${baseURL}admin-api/v1/users/new`,
    all: `${baseURL}admin-api/v1/users/all`,
    list: `${baseURL}admin-api/v1/users/list`,
    remove: `${baseURL}admin-api/v1/users/delete`,
    info: (id) => `${baseURL}admin-api/v1/users/info/${id}`,
    update: (id) => `${baseURL}admin-api/v1/users/edit/${id}`,
    deleteMultiple: `${baseURL}admin-api/v1/users/deleteMultiple`,
  },
};
*/
