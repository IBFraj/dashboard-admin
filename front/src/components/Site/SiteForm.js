import React from "react";

export default function SiteForm(props) {
  return (
    <div className="card card-custom">
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="card-body">
          <div className="form-group row">
            <label className="col-2 col-form-label">
              Name <span className="text-danger">*</span>
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                name="name"
                id="example-text-input"
                ref={props.register({ required: true })}
                defaultValue={props.data ? props.data.name : ""}
              />
              {props.errors.name && (
                <span className="text-danger">name required</span>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="example-email-input"
              className="col-2 col-form-label"
            >
              ZipCode <span className="text-danger">*</span>
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                name="zipCode"
                id="example-email-input"
                ref={props.register({ required: true })}
                defaultValue={props.data ? props.data.zipCode : ""}
              />
              {props.errors.zipCode && (
                <span className="text-danger">zipCode required</span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="example-url-input" className="col-2 col-form-label">
              adresse
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                name="adresse"
                ref={props.register}
                defaultValue={props.data ? props.data.adresse : ""}
                id="example-url-input"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="example-tel-input" className="col-2 col-form-label">
              Ville <span className="text-danger">*</span>
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                name="ville"
                id="example-tel-input"
                ref={props.register}
                defaultValue={props.data ? props.data.ville : ""}
              />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-10">
              <button type="submit" className="btn btn-success mr-2">
                Submit
              </button>
              <button
                type="reset"
                onClick={() => props.reset()}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
