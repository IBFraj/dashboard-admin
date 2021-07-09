import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

export default function Login() {
  let history = useHistory();
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    fetch("http://localhost:3001/admin-api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          return swal("Error", response.message, "error");
        }
        localStorage.setItem("token", response.token);
        localStorage.setItem("admin", JSON.stringify(response));
        history.push("/clients");
      })
      .catch((e) => {});
  };

  return (
    <>
      {/*begin::Main*/}
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div className="login login-4 wizard d-flex flex-column flex-lg-row flex-column-fluid">
          {/*begin::Content*/}
          <div className="login-container order-2 order-lg-1 d-flex flex-center flex-row-fluid px-7 pt-lg-0 pb-lg-0 pt-4 pb-6 bg-white">
            {/*begin::Wrapper*/}
            <div className="login-content d-flex flex-column pt-lg-0 pt-12">
              {/*begin::Logo*/}
              <a href="#" className="login-logo pb-xl-20 pb-15">
                <img
                  src="assets/media/logos/logo-4.png"
                  className="max-h-70px"
                  alt=""
                />
              </a>
              {/*end::Logo*/}
              {/*begin::Signin*/}
              <div className="login-form">
                {/*begin::Form*/}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="form"
                  id="kt_login_singin_form"
                >
                  {/*begin::Title*/}
                  <div className="pb-5 pb-lg-15">
                    <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
                      Sign In
                    </h3>
                  </div>
                  {/*begin::Title*/}
                  {/*begin::Form group*/}
                  <div className="form-group">
                    <label className="font-size-h6 font-weight-bolder text-dark">
                      Your Email
                    </label>
                    <input
                      className="form-control form-control-solid h-auto py-7 px-6 rounded-lg border-0"
                      type="text"
                      name="email"
                      ref={register({ required: true })}
                      autoComplete="off"
                    />
                    {errors.username && "email is required"}
                  </div>
                  {/*end::Form group*/}
                  {/*begin::Form group*/}
                  <div className="form-group">
                    <div className="d-flex justify-content-between mt-n5">
                      <label className="font-size-h6 font-weight-bolder text-dark pt-5">
                        Your Password
                      </label>
                    </div>
                    <input
                      className="form-control form-control-solid h-auto py-7 px-6 rounded-lg border-0"
                      type="password"
                      name="password"
                      autoComplete="off"
                      ref={register({ required: true })}
                    />
                  </div>

                  {/*end::Form group*/}
                  {/*begin::Action*/}
                  <div className="pb-lg-0 pb-5">
                    <button
                      type="submit"
                      id="kt_login_singin_form_submit_button"
                      className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
                    >
                      Sign In
                    </button>
                  </div>
                  {/*end::Action*/}
                </form>
                {/*end::Form*/}
              </div>
              {/*end::Signin*/}
            </div>
            {/*end::Wrapper*/}
          </div>
          {/*begin::Content*/}
          {/*begin::Aside*/}
          <div className="login-aside order-1 order-lg-2 bgi-no-repeat bgi-position-x-right">
            <div
              className="login-conteiner bgi-no-repeat bgi-position-x-right bgi-position-y-bottom"
              style={{
                backgroundImage:
                  "url(assets/media/svg/illustrations/login-visual-4.svg)",
              }}
            >
              {/*begin::Aside title*/}
              <h3 className="pt-lg-40 pl-lg-20 pb-lg-0 pl-10 py-20 m-0 d-flex justify-content-lg-start font-weight-boldest display5 display1-lg text-white">
                We Got
                <br />
                A Surprise
                <br />
                For You
              </h3>
              {/*end::Aside title*/}
            </div>
          </div>
          {/*end::Aside*/}
        </div>
        {/*end::Login*/}
      </div>
      {/*end::Main*/}
      {/*begin::Global Config(global config for global JS scripts)*/}
      {/*end::Global Config*/}
      {/*begin::Global Theme Bundle(used by all pages)*/}
      {/*end::Global Theme Bundle*/}
      {/*begin::Page Scripts(used by this page)*/}
      {/*end::Page Scripts*/}
      {/*end::Body*/}
    </>
  );
}
