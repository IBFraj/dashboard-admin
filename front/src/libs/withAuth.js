import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { API, ROUTER } from "../constants/env";
export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentWillMount() {
      console.log("d5al");
      fetch("http://localhost:3001/admin-api/v1/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.error) {
            localStorage.clear();
            return this.setState({ loading: false, redirect: true });
          }
          localStorage.setItem("user", JSON.stringify(response));
          return this.setState({ loading: false });
        })
        .catch((err) => {
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
