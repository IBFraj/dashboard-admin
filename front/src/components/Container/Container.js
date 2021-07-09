import React from "react";
import SubHeader from "../SubHeader/SubHeader";
function Container({
  name,
  actionRoute,
  actionName,
  back,
  submit,
  backRoute,

  children,
}) {
  return (
    <div className="content d-flex flex-column flex-column-fluid">
      <SubHeader
        name={name}
        back={back}
        actionRoute={actionRoute}
        actionName={actionName}
        submit={submit}
        backRoute={backRoute}
      />
      <div className="d-flex flex-column-fluid">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}

export default Container;
