import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function SiteTable(props) {
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = React.useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [count, setCount] = React.useState(3);
  const [search, setSearch] = React.useState("");
  const [update, setUpdate] = React.useState("");
  useEffect(() => {
    props.fetchData(currentPage, count, search, setTotalPage, setTotal);
  }, [count, currentPage, update]);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    setUpdate(!update);
  };
  useEffect(() => {
    if (props.data.length > 0) {
      let items = [];
      props.data.map(() => {
        items.push(false);
      });
      setCheckedList(items);
    }
  }, [props.data]);
  const goToPage = (event, i) => {
    event.preventDefault();

    if (i !== currentPage) {
      setCurrentPage(i);
    }
  };
  const navigate = async (event, type) => {
    event.preventDefault();
    if (type === "next" && currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
    if (type === "previous" && currentPage >= 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const navigateToLast = async (event, type) => {
    event.preventDefault();
    if (type === "last") {
      setCurrentPage(totalPage);
    }
    if (type === "first") {
      setCurrentPage(1);
    }
  };

  let menuItems = [];
  for (var i = 1; i <= totalPage; i++) {
    // eslint-disable-next-line no-loop-func

    menuItems.push(i);
  }
  const deleteItem = (id) => {
    console.log(id);
    swal({
      title: "Vous etes sure ?",
      text: "Avertissement de suppresion",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("http://localhost:3001/admin-api/v1/site/delete/" + id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ id }),
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.error) {
              return swal(this._.t("ERROR"), response.message, "error");
            }
            return swal("Success", "suppresion avec succés", "success").then(
              () => {
                setUpdate(!update);
              }
            );
          })

          .catch((e) => swal("Erreur", e.message, "error"));
      }
    });
  };
  const handleChangeSelectAll = (e) => {
    console.log(e.target.checked);
    setCheckedAll(!checkedAll);
    if (e.target.checked) {
      let items = [];
      props.data.map(() => {
        items.push(true);
      });
      setCheckedList(items);
    }
    if (e.target.checked === false) {
      let items = [];
      props.data.map(() => {
        items.push(false);
      });
      setCheckedList(items);
    }
  };
  const handleChangeSelect = (e, index) => {
    let newArr = [...checkedList];
    newArr[index] = e.target.checked;
    setCheckedList(newArr);
    console.log(newArr.every((value) => value === true));
    if (newArr.every((value) => value === true)) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  };
  const deleteAll = () => {
    let ids = [];
    checkedList.map((elem, index) => {
      if (elem === true) {
        if (props.data) {
          ids.push(props.data[index]._id);
        }
      }
    });
    console.log(ids);

    swal({
      title: "Vous etes sure ?",
      text: "Avertissement de suppresion",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("http://localhost:3001/admin-api/v1/site/deleteMultiple", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ ids: ids }),
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.error) {
              return swal(this._.t("ERROR"), response.message, "error");
            }
            return swal("Success", "suppresion avec succés", "success").then(
              () => {
                setUpdate(!update);
                setCheckedAll(false);
              }
            );
          })

          .catch((e) => swal("Erreur", e.message, "error"));
      }
    });
  };

  return (
    <div className="card card-custom gutter-b">
      <div className="card-header">
        <div className="card-title">
          <h3 className="card-label">{props.name}</h3>
        </div>
        <div className="card-toolbar">
          {/* <button type="button" className="btn btn-primary">
            export
          </button>
          
          */}
        </div>
      </div>
      <div className="card-body">
        <form className="form form-label-right">
          <div className="form-group row">
            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                name="searchText"
                placeholder="Search"
                onChange={handleChangeSearch}
                value={search}
              />
              <small className="form-text text-muted">
                <b>Search</b> in all fields
              </small>
            </div>
            <Link
              to="/addsi"
              className="btn btn-light-primary font-weight-bold btn-sm px-4 font-size-base ml-2"
            >
              Add Site
            </Link>
          </div>
        </form>
        {checkedList.includes(true) && (
          <div className="form">
            <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
              <div className="col-xl-12">
                <div className="form-group form-group-inline">
                  <div className="form-label form-label-no-wrap">
                    <label className="font-bold font-danger">
                      <span>
                        Selected records count:{" "}
                        <b>{checkedList.filter((x) => x === true).length}</b>
                      </span>
                    </label>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger font-weight-bolder font-size-sm"
                      onClick={deleteAll}
                    >
                      <i className="fa fa-trash" /> Delete All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="react-bootstrap-table table-responsive">
          <table className="table table table-head-custom table-vertical-center overflow-hidden">
            <thead>
              <tr>
                <th className="selection-cell-header" data-row-selection="true">
                  <label className="checkbox checkbox-single">
                    <input
                      type="checkbox"
                      checked={checkedAll}
                      onChange={(e) => handleChangeSelectAll(e)}
                    />
                    <span />
                  </label>
                </th>
                {props.fields.map((elem) => (
                  <th className="sortable">
                    {elem.title}
                    <span className="svg-icon svg-icon-sm svg-icon-primary ml-1 svg-icon-sort">
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <title>Stockholm-icons / Shopping / Sort1</title>
                        <desc>Created with Sketch.</desc>
                        <defs />
                        <g
                          id="Stockholm-icons-/-Shopping-/-Sort1"
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect id="bound" x={0} y={0} width={24} height={24} />
                          <rect
                            id="Rectangle-8"
                            fill="#000000"
                            x={4}
                            y={5}
                            width={16}
                            height={3}
                            rx="1.5"
                          />
                          <path
                            d="M7.5,11 L16.5,11 C17.3284271,11 18,11.6715729 18,12.5 C18,13.3284271 17.3284271,14 16.5,14 L7.5,14 C6.67157288,14 6,13.3284271 6,12.5 C6,11.6715729 6.67157288,11 7.5,11 Z M10.5,17 L13.5,17 C14.3284271,17 15,17.6715729 15,18.5 C15,19.3284271 14.3284271,20 13.5,20 L10.5,20 C9.67157288,20 9,19.3284271 9,18.5 C9,17.6715729 9.67157288,17 10.5,17 Z"
                            id="Combined-Shape"
                            fill="#000000"
                            opacity="0.3"
                          />
                        </g>
                      </svg>
                    </span>
                  </th>
                ))}
                {/*<th
                    tabIndex={0}
                    aria-label="VIN Code (ID) sortable"
                    className="sortable"
                  >
                    {elem.title}
                    <span className="svg-icon svg-icon-sm svg-icon-primary ml-1 svg-icon-sort">
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <title>Stockholm-icons / Shopping / Sort1</title>
                        <desc>Created with Sketch.</desc>
                        <defs />
                        <g
                          id="Stockholm-icons-/-Shopping-/-Sort1"
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect id="bound" x={0} y={0} width={24} height={24} />
                          <rect
                            id="Rectangle-8"
                            fill="#000000"
                            x={4}
                            y={5}
                            width={16}
                            height={3}
                            rx="1.5"
                          />
                          <path
                            d="M7.5,11 L16.5,11 C17.3284271,11 18,11.6715729 18,12.5 C18,13.3284271 17.3284271,14 16.5,14 L7.5,14 C6.67157288,14 6,13.3284271 6,12.5 C6,11.6715729 6.67157288,11 7.5,11 Z M10.5,17 L13.5,17 C14.3284271,17 15,17.6715729 15,18.5 C15,19.3284271 14.3284271,20 13.5,20 L10.5,20 C9.67157288,20 9,19.3284271 9,18.5 C9,17.6715729 9.67157288,17 10.5,17 Z"
                            id="Combined-Shape"
                            fill="#000000"
                            opacity="0.3"
                          />
                        </g>
                      </svg>
                    </span>
                  </th> */}

                <th className="text-right pr-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((elem, index) => (
                <tr>
                  <td className="selection-cell">
                    <input type="checkbox" style={{ display: "none" }} />
                    <label className="checkbox checkbox-single">
                      <input
                        type="checkbox"
                        checked={checkedList[index]}
                        onChange={(e) => handleChangeSelect(e, index)}
                      />
                      <span />
                    </label>
                  </td>
                  {props.fields.map((item) => (
                    <td>{elem[item.field]}</td>
                  ))}

                  <td className="text-right pr-0" style={{ minWidth: 100 }}>
                    <a
                      className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                      onClick={() => {
                        history.push(`/edits/${elem._id}`);
                      }}
                    >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <title>Stockholm-icons / Communication / Write</title>
                          <desc>Created with Sketch.</desc>
                          <defs />
                          <g
                            id="Stockholm-icons-/-Communication-/-Write"
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <rect
                              id="bound"
                              x={0}
                              y={0}
                              width={24}
                              height={24}
                            />
                            <path
                              d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z"
                              id="Path-11"
                              fill="#000000"
                              fillRule="nonzero"
                              transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "
                            />
                            <path
                              d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z"
                              id="Path-57"
                              fill="#000000"
                              fillRule="nonzero"
                              opacity="0.3"
                            />
                          </g>
                        </svg>
                      </span>
                    </a>{" "}
                    <a
                      className="btn btn-icon btn-light btn-hover-danger btn-sm"
                      onClick={() => deleteItem(elem._id)}
                    >
                      <span className="svg-icon svg-icon-md svg-icon-danger">
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <title>Stockholm-icons / General / Trash</title>
                          <desc>Created with Sketch.</desc>
                          <defs />
                          <g
                            id="Stockholm-icons-/-General-/-Trash"
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <rect
                              id="bound"
                              x={0}
                              y={0}
                              width={24}
                              height={24}
                            />
                            <path
                              d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
                              id="round"
                              fill="#000000"
                              fillRule="nonzero"
                            />
                            <path
                              d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                              id="Shape"
                              fill="#000000"
                              opacity="0.3"
                            />
                          </g>
                        </svg>
                      </span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {totalPage > 1 && (
            <div className="d-flex flex-wrap py-2 mr-3 ">
              <a
                className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1"
                onClick={(event) => navigateToLast(event, "first")}
              >
                <i className="ki ki-bold-double-arrow-back icon-xs" />
              </a>
              <a
                className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1"
                onClick={(event) => navigate(event, "previous")}
              >
                <i className="ki ki-bold-arrow-back icon-xs" />
              </a>
              {currentPage !== 1 && (
                <a className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">
                  ...
                </a>
              )}
              {menuItems
                .slice(
                  currentPage >= 4
                    ? currentPage >= totalPage - 1
                      ? currentPage - 4
                      : currentPage - 3
                    : 0,
                  currentPage >= 4 ? currentPage + 2 : 5
                )
                .map((elem, index) => {
                  return (
                    <a
                      className={`btn btn-icon btn-sm border-0 btn-light ${
                        elem === currentPage ? "btn-hover-primary active" : ""
                      } mr-2 my-1`}
                      onClick={(event) => goToPage(event, elem)}
                      key={index}
                    >
                      {elem}
                    </a>
                  );
                })}

              {currentPage !== totalPage && (
                <a className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">
                  ...
                </a>
              )}

              <a
                className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1"
                onClick={(event) => navigate(event, "next")}
              >
                <i className="ki ki-bold-arrow-next icon-xs" />
              </a>
              <a
                className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1"
                onClick={(event) => navigateToLast(event, "last")}
              >
                <i className="ki ki-bold-double-arrow-next icon-xs" />
              </a>
            </div>
          )}

          <div className="d-flex align-items-center py-3">
            <select
              className="form-control form-control-sm font-weight-bold mr-4 border-0 bg-light false"
              style={{ width: 75 }}
              onChange={(e) => setCount(e.target.value)}
            >
              <option className="btn ">3</option>
              <option className="btn ">5</option>
              <option className="btn ">10</option>
            </select>
            <span className="react-bootstrap-table-pagination-total">
              &nbsp;Showing rows 1 to&nbsp;{count} of&nbsp;{total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteTable;
