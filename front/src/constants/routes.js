import ListClient from "../pages/Clients/ListClient";
import AddClients from "../pages/Clients/AddClient";
import EditClient from "../pages/Clients/EditClient";
import NotFound from "../components/NotFound/NotFound";
import withAuth from "../libs/withAuth";
import ListSite from "../pages/Site/ListSite";
import AddSite from "../pages/Site/AddSite";
import EditSite from "../pages/Site/EditSite";
export const routes = [
  {
    path: "/clients",
    exact: true,
    main: ListClient,
  },

  {
    path: "/addcl",
    main: AddClients,
  },
  {
    path: "/edit/:id",
    main: EditClient,
  },
  {
    path: "/",
    main: ListSite,
  },

  {
    path: "/addsi",
    main: AddSite,
  },
  {
    path: "/edits/:id",
    main: EditSite,
  },
  {
    path: "/404",
    main: NotFound,
  },
];
