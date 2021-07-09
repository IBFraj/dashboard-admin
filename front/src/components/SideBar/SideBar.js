/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import navigationConfig from "../../constants/navigationConfig";
function SideBar() {
  return (
    <>
      {/*begin::Aside*/}
      <div
        className="aside aside-left  aside-fixed  d-flex flex-column flex-row-auto"
        id="kt_aside"
      >
        {/*begin::Brand*/}
        <div className="brand flex-column-auto " id="kt_brand">
          {/*begin::Logo*/}
          <a href="index.html" className="brand-logo">
            <img alt="Logo" src="/assets/media/logos/logo-light.png" />
          </a>
          {/*end::Logo*/}
          {/*begin::Toggle*/}
          <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
            <span className="svg-icon svg-icon svg-icon-xl">
              {/*begin::Svg Icon | path:assets/media/svg/icons/Navigation/Angle-double-left.svg*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <polygon points="0 0 24 0 24 24 0 24" />
                  <path
                    d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
                    fill="#000000"
                    fillRule="nonzero"
                    transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999) "
                  />
                  <path
                    d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
                    fill="#000000"
                    fillRule="nonzero"
                    opacity="0.3"
                    transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999) "
                  />
                </g>
              </svg>
              {/*end::Svg Icon*/}
            </span>{" "}
          </button>
          {/*end::Toolbar*/}
        </div>
        {/*end::Brand*/}
        {/*begin::Aside Menu*/}
        <div
          className="aside-menu-wrapper flex-column-fluid"
          id="kt_aside_menu_wrapper"
        >
          {/*begin::Menu Container*/}
          <div
            id="kt_aside_menu"
            className="aside-menu my-4 "
            data-menu-vertical={1}
            data-menu-scroll={1}
            data-menu-dropdown-timeout={500}
          >
            {/*begin::Menu Nav*/}
            <ul className="menu-nav ">
              <li className="menu-section menu-item">
                <h4 className="menu-text">Application</h4>
                <i className="menu-icon ki ki-bold-more-hor icon-md" />
              </li>
              {navigationConfig.map((elem, index) => {
                return (
                  <>
                    {elem.subMenu ? (
                      <li
                        className="menu-item  menu-item-submenu"
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                        key={index}
                      >
                        <a className="menu-link menu-toggle">
                          <span className="svg-icon menu-icon">
                            {/*begin::Svg Icon | path:assets/media/svg/icons/Design/Bucket.svg*/}
                            {elem.icon}
                            {/*end::Svg Icon*/}
                          </span>
                          <span className="menu-text">{elem.name}</span>
                          <i className="menu-arrow" />
                        </a>
                        <div className="menu-submenu">
                          <i className="menu-arrow" />
                          <ul className="menu-subnav">
                            <li
                              className="menu-item  menu-item-parent"
                              aria-haspopup="true"
                            >
                              <span className="menu-link">
                                <span className="menu-text">{elem.name}</span>
                              </span>
                            </li>
                            {elem.subMenuList.map((item) => (
                              <li className="menu-item " aria-haspopup="true">
                                <Link to={item.route} className="menu-link ">
                                  <i className="menu-bullet menu-bullet-dot">
                                    <span />
                                  </i>
                                  <span className="menu-text">{item.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ) : (
                      <>
                        <li
                          className="menu-item "
                          aria-haspopup="true"
                          key={index}
                        >
                          <Link to={elem.route} className="menu-link ">
                            <span className="svg-icon menu-icon">
                              {/*begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg*/}
                              {elem.icon}
                              {/*end::Svg Icon*/}
                            </span>
                            <span className="menu-text">{elem.name}</span>
                          </Link>
                        </li>
                      </>
                    )}
                  </>
                );
              })}
            </ul>
            {/*end::Menu Nav*/}
          </div>
          {/*end::Menu Container*/}
        </div>
        {/*end::Aside Menu*/}
      </div>
      {/*end::Aside*/}
    </>
  );
}

export default SideBar;
