import React from "react";
import Select from "react-select";

export default function ClientForm(props) {
  React.useEffect(() => {
    console.log("this is props");
    console.log(props.optionsSite);
  }, [props.optionsSite]);
  return (
    <div className="card card-custom">
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="card-body">
          <div className="form-group row">
            <label className="col-2 col-form-label">
              Enseigne <span className="text-danger">*</span>
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                name="enseigne"
                id="example-text-input"
                ref={props.register({ required: true })}
                defaultValue={props.data ? props.data.enseigne : ""}
              />
              {props.errors.enseigne && (
                <span className="text-danger">enseigne required</span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="example-search-input"
              className="col-2 col-form-label"
            >
              Site <span className="text-danger">*</span>
            </label>
            <div className="col-10">
              {/*<Select
                isMulti
                className="basic-multi-select"
                name="site"
                options={props.optionsSite}
                ref={props.register()}
                defaultValue={props.data ? props.data.site : ""}
              />*/}
              <input
                className="form-control"
                type="text"
                name="site"
                id="example-text-input"
                ref={props.register({ required: true })}
                defaultValue={props.data ? props.data.site : ""}
              />
              {props.errors.enseigne && (
                <span className="text-danger">enseigne required</span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="example-email-input"
              className="col-2 col-form-label"
            >
              Siret <span className="text-danger">*</span>
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                name="siret"
                id="example-email-input"
                ref={props.register({ required: true })}
                defaultValue={props.data ? props.data.siret : ""}
              />
              {props.errors.siret && (
                <span className="text-danger">siret required</span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="example-url-input" className="col-2 col-form-label">
              Code Naf <span className="text-danger">*</span>
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="number"
                name="codeNaf"
                ref={props.register({ required: true })}
                defaultValue={props.data ? props.data.codeNaf : ""}
                id="example-url-input"
              />
              {props.errors.siret && (
                <span className="text-danger">Code Naf required</span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="example-tel-input" className="col-2 col-form-label">
              Numéro TVA <span className="text-danger">*</span>
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="number"
                name="numéroTva"
                id="example-tel-input"
                ref={props.register({ required: true })}
                defaultValue={props.data ? props.data.numéroTva : ""}
              />
              {props.errors.numéroTva && (
                <span className="text-danger">numéroTva required</span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="example-password-input"
              className="col-2 col-form-label"
            >
              Téléphone
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="number"
                name="téléphone"
                id="example-password-input"
                ref={props.register}
                defaultValue={props.data ? props.data.téléphone : ""}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="example-number-input"
              className="col-2 col-form-label"
            >
              Adresse
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                name="adresse"
                id="example-number-input"
                ref={props.register}
                defaultValue={props.data ? props.data.adresse : ""}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="example-number-input"
              className="col-2 col-form-label"
            >
              Code Postal
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="number"
                name="codePostal"
                id="example-number-input"
                ref={props.register}
                defaultValue={props.data ? props.data.codePostal : ""}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="example-number-input"
              className="col-2 col-form-label"
            >
              Ville
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                name="ville"
                id="example-number-input"
                ref={props.register}
                defaultValue={props.data ? props.data.ville : ""}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="example-number-input"
              className="col-2 col-form-label"
            >
              Pays
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="text"
                name="pays"
                id="example-number-input"
                ref={props.register}
                defaultValue={props.data ? props.data.pays : ""}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="example-number-input"
              className="col-2 col-form-label"
            >
              Email Client <span className="text-danger">*</span>
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="email"
                name="emailClient"
                id="example-number-input"
                ref={props.register({ required: true })}
                defaultValue={props.data ? props.data.emailClient : ""}
              />
              {props.errors.emailClient && (
                <span className="text-danger">emailClient required</span>
              )}
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
