import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../Auth/AuthContext";

const Navbar = () => {
  const { token, setToken, setGoogleId } = useContext(AuthContext);
  const history = useHistory();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (history.location.pathname !== "/") history.push("/");
  };

  function signOutGoogle() {
    if (
      window.gapi &&
      window.gapi.auth2 &&
      window.gapi.auth2.getAuthInstance()?.isSignedIn.get()
    ) {
      window.gapi.auth2
        .getAuthInstance()
        .signOut()
        .then(() => handleClearStorage());
    } else {
      handleClearStorage();
    }
  }

  function handleClearStorage() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("googleId");
    setToken(null);
    setGoogleId(null);
    history.push("/");
  }

  // BIẾN KIỂM TRA ĐỂ TỰ ĐỘNG DÃN KỊCH BIÊN KHI VÀO DASHBOARD
  const isDashboard = history.location.pathname
    .toLowerCase()
    .includes("dashboard");

  return (
    <>
      {/* Ẩn thẻ đệm nếu là Dashboard để Sidebar không bị hở đầu */}
      {<div style={{ height: "78px", display: "block" } }></div>}

      <nav className="navbar navbar-expand-lg main-nav-navy main-nav-fixed">
        {/* SỬA container THÀNH container-fluid ĐỂ DÃN 100% CHIỀU RỘNG */}
        <div className="container-fluid px-4">
          <div
            onClick={scrollToTop}
            className="navbar-brand d-flex align-items-center text-decoration-none"
            style={{ cursor: "pointer" }}
          >
            <div className="logo-shield-box">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L3 7V12C3 17.5 7 21.3 12 22C17 21.3 21 17.5 21 12V7L12 2Z"
                  fill="#002d52"
                  stroke="#3182ce"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 7V17M7 12H17"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="brand-texts ml-3">
              <span className="brand-name">NMD MEDICAL</span>
              <span className="brand-tagline">BỆNH VIỆN ĐA KHOA QUỐC TẾ</span>
            </div>
          </div>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-toggle="collapse"
            data-target="#hospitalNavbar"
          >
            <span className="fa fa-bars" style={{ color: "#fff" }}></span>
          </button>

          <div className="collapse navbar-collapse" id="hospitalNavbar">
            <ul className="navbar-nav ml-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link-navy" href="#uu-diem">
                  Ưu điểm thăm khám
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link-navy" href="#bac-si">
                  Đội ngũ bác sĩ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link-navy" href="#y-kien">
                  Ý kiến khách hàng
                </a>
              </li>

              <li className="nav-item ml-lg-4">
                {!token ? (
                  <button
                    onClick={() => history.push("/patientlogin")}
                    className="btn-luxury"
                  >
                    ĐĂNG NHẬP BỆNH NHÂN
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-light rounded-pill px-4 font-weight-bold btn-sm"
                    onClick={signOutGoogle}
                  >
                    ĐĂNG XUẤT
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>

        <style>{`
          .main-nav-fixed {
            position: fixed;
            top: 0; left: 0; right: 0;
            width: 100%;
            z-index: 2000;
          }
          .main-nav-navy {
            background-color: #002d52 !important; 
            padding: 10px 0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            /* Đảm bảo dãn 100% không bị giới hạn */
            width: 100%;
          }
          .logo-shield-box { background: #fff; padding: 5px; border-radius: 10px; display: flex; align-items: center; }
          .brand-texts { display: flex; flex-direction: column; min-width: 220px; }
          .brand-name { color: #fff; font-weight: 900; font-size: 1.4rem; line-height: 1.2; white-space: nowrap; }
          .brand-tagline { color: #3182ce; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; white-space: nowrap; }
          .nav-link-navy { color: rgba(255,255,255,0.85) !important; font-weight: 600; font-size: 0.85rem; margin: 0 12px; text-decoration: none !important; white-space: nowrap; }
          .btn-luxury { background: transparent; border: 1.5px solid #3182ce; color: #fff; padding: 8px 22px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: 0.3s; }
          .btn-luxury:hover { background: #3182ce; border-color: #3182ce; }
        `}</style>
      </nav>
    </>
  );
};

export default Navbar;
