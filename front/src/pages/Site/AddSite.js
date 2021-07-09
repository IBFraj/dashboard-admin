import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Container from "../../components/Container/Container";

import SiteForm from "../../components/Site/SiteForm";

export default function AddSite() {
  let history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    fetch("http://localhost:3001/admin-api/v1/site/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          console.log(response);
          return swal("Error", response.message, "error");
        }
        history.push("/sites");
      })
      .catch((e) => {});
  };

  return (
    <Container back={true} backRoute="/clients" submit={true}>
      <SiteForm
        register={(value) => register(value)}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
      />
    </Container>
  );
}
