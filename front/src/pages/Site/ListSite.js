import React from "react";

import SiteTable from "../../components/Site/SiteTable";

import swal from "sweetalert";

function ListSite() {
  // eslint-disable-next-line no-unused-vars
  const [fields, setFields] = React.useState([
    { title: "name", field: "name" },
    { title: "zipCode", field: "zipCode" },
    { title: "adresse", field: "adresse" },
    { title: "ville", field: "ville" },
  ]);
  const [data, setData] = React.useState([]);

  const fetchData = (currentPage, count, search, setTotalPage, setTotal) => {
    fetch(
      "http://localhost:3001/admin-api/v1/site/list" +
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
    <SiteTable name="site" fields={fields} data={data} fetchData={fetchData} />
  );
}

export default ListSite;
