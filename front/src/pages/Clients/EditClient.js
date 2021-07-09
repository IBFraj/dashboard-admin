import React, { useState } from "react";
import Container from "../../components/Container/Container";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import ClientForm from "../../components/Clients/ClientForm";

export default function EditClient() {
  let { id } = useParams();
  let history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm();
  const [data, setData] = useState({});
  React.useEffect(() => {
    const fetchdata = async () => {
      fetch("http://localhost:3001/admin-api/v1/client/info/" + id)
        .then((res) => res.json())
        .then((response) => {
          if (response.error) {
            console.log(response);
            return swal("Error", response.message, "error");
          }

          setData(response);
        })
        .catch((e) => {});
    };
    fetchdata();
  }, [id]);
  const onSubmit = (data) => {
    console.log(data);

    fetch("http://localhost:3001/admin-api/v1/client/update/" + id, {
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

  return (
    <Container back={true} backRoute="/clients" submit={true}>
      <ClientForm
        register={register({ required: true })}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
        data={data}
      />
    </Container>
  );
}
