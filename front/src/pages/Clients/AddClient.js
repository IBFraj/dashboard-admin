import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Container from "../../components/Container/Container";

import ClientForm from "../../components/Clients/ClientForm";

export default function AddClient() {
  let history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm();
  const [options, setoptions] = useState([]);
  React.useEffect(() => {
    fetch("http://localhost:3001/admin-api/v1/site/all")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        const dataOptions = response.map((elem) => {
          return {
            value: elem._id,
            label: elem.name,
          };
        });
        setoptions(dataOptions);
        console.log(dataOptions);
        console.log(options);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const onSubmit = (data) => {
    console.log(data);

    fetch("http://localhost:3001/admin-api/v1/client/create", {
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
        history.push("/clients");
      })
      .catch((e) => {});
  };
  useEffect(() => {
    console.log("options:");
    console.log(options);
  }, [options]);
  return (
    <Container back={true} backRoute="/clients" submit={true}>
      <ClientForm
        register={(value) => register(value)}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
        optionsSite={options}
      />
    </Container>
  );
}
