import React, { useState } from "react";
import Login from "./pages/Login";
import SideBar from "./components/SideBar/SideBar";
import TopBar from "./components/TopBar/TopBar";
import SubHeader from "./components/SubHeader/SubHeader";
import Footer from "./components/Footer/Footer";

import UserPanel from "./components/UserPanel/UserPanel";
import { routes } from "./constants/routes";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <SideBar />

        <div
          className="d-flex flex-column flex-row-fluid wrapper"
          id="kt_wrapper"
        >
          <TopBar />

          <SubHeader />

          <Switch>
            {routes.map((elem, index) => {
              return (
                <Route
                  key={index}
                  path={elem.path}
                  exact={elem.exact}
                  component={elem.main}
                />
              );
            })}
          </Switch>
          <Footer />
        </div>

        <UserPanel />
      </div>
    </BrowserRouter>
  );
}
