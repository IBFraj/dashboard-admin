const baseURL = "http://localhost:3001/";

const staticURL = "http://localhost:3001/";

exports.ROUTER = {
  /*LOGIN: "${baseURL}admin-api/v1/auth/login",*/

  CLIENTS: {
    LIST: "/table",
    CREATE: "/client/new",
    EDIT: (id) => `/client/edit/${id}`,
    Block: (id) => `/client/block/${id}`,
    RESTORE: (id) => `/client/restore/${id}`,
  },
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
    login: `${baseURL}admin/v1/auth/login`,
    register: `${baseURL}admin/v1/auth/register`,
  },

  client: {
    create: `${baseURL}admin-api/v1/client/create`,
    info: (id) => `${baseURL}admin-api/v1/client/info/${id}`,
    update: (id) => `${baseURL}admin-api/v1/client/update/${id}`,
    delete: (id) => `${baseURL}admin-api/v1/client/delete/${id}`,
    block: (id) => `${baseURL}admin-api/v1/client/block/${id}`,
    restore: (id) => `${baseURL}admin-api/v1/client/restore/${id}`,
  },
};
