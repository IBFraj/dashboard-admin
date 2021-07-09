/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import ClientTable from "../../components/Clients/ClientTable";

import swal from "sweetalert";

function ListClient() {
  // eslint-disable-next-line no-unused-vars
  const [fields, setFields] = React.useState([
    { title: "enseigne", field: "enseigne" },
    { title: "site", field: "site" },
    { title: "siret", field: "siret" },

    { title: "téléphone", field: "téléphone" },
    { title: "adresse", field: "adresse" },
    { title: "ville", field: "ville" },
    { title: "emailClient", field: "emailClient" },
  ]);
  const [data, setData] = React.useState([]);

  const fetchData = (currentPage, count, search, setTotalPage, setTotal) => {
    fetch(
      "http://localhost:3001/admin-api/v1/client/list" +
        `?page=${currentPage}&count=${count}&searchQuery=${search}`
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          console.log(response);
          return swal("Error", response.message, "error");
        }
        setData(response.data);
        setTotalPage(response.totalPage);
        setTotal(response.total);
      })
      .catch((e) => {});
  };

  return (
    <ClientTable
      name="Utilisateurs"
      fields={fields}
      data={data}
      fetchData={fetchData}
    />
  );
}

export default ListClient;
