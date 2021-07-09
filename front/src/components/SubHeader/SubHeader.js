/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useHistory } from "react-router-dom";

function SubHeader(props) {
  let history = useHistory();

  return (
    <div className="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
      <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        {/*begin::Info*/}
        <div className="d-flex align-items-center flex-wrap mr-1">
          {/*begin::Page Heading*/}
          <div className="d-flex align-items-baseline flex-wrap mr-5">
            {/*begin::Page Title*/}
            <h5 className="text-dark font-weight-bold my-1 mr-5">
              {props.name}
            </h5>
            {/*end::Page Title*/}
          </div>
          {/*end::Page Heading*/}
        </div>
        {/*end::Info*/}
        {/*begin::Toolbar*/}
        <div className="d-flex align-items-center">
          {/*begin::Actions*/}
          {props.actionName !== undefined && (
            <Link
              to={props.actionRoute}
              className="btn btn-light-primary font-weight-bolder btn-sm"
            >
              {props.actionName}
            </Link>
          )}
          {props.back === true && (
            <button
              onClick={() => history.push(props.backRoute)}
              className="btn btn-light ml-2"
            >
              <i className="fa fa-arrow-left" /> retour
            </button>
          )}

          {/*end::Actions*/}
        </div>
        {/*end::Toolbar*/}
      </div>
    </div>
  );
}

export default SubHeader;
