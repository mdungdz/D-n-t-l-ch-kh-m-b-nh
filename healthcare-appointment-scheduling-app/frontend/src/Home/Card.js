import { Button } from "react-bootstrap";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import axios from "axios";

const Card = ({ login = "Doctor", Image, link }) => {
  const { token, googleId, setToken, setGoogleId } = useContext(AuthContext);
  const history = useHistory();

  async function loginWithGoogle(e) {
    try {
      await window.gapi.auth2.getAuthInstance().signIn();
      const auth2 = await window.gapi.auth2.getAuthInstance();
      if (auth2.isSignedIn.get()) {
        console.log("[Google] Đăng nhập thành công!");
        var profile = auth2.currentUser.get();
        window.localStorage.setItem(
          "token",
          profile.getAuthResponse().id_token
        );
        window.localStorage.setItem("googleId", profile.getId());

        const serverRes = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/patients/google-login/`,
          {
            tokenId: profile.getAuthResponse().id_token,
          }
        );

        if (serverRes) {
          setToken(profile.getAuthResponse().id_token);
          setGoogleId(profile.getId());

          if (serverRes.data.phoneNumberExists === true) {
            history.push("/patient");
          } else {
            history.push("/patient/update-phone");
          }
        }
      }
    } catch (err) {
      console.log(`[Google] Lỗi đăng nhập: ${err}`);
    }
  }

  return (
    <div className="card mb-3 shadow-sm border-0" style={{ width: "20rem", borderRadius: "10px", overflow: "hidden" }}>
      <img src={Image} className="card-img-top" alt="..." height="240" style={{ objectFit: "cover" }} />
      <div className="card-body p-4 text-center">
        
        {/* VAI TRÒ BÁC SĨ */}
        {(!token || googleId) && login === "Doctor" && (
          <Link
            to={link}
            className="btn btn-primary justify-content-center w-100 py-2 font-weight-bold"
          >
            ĐĂNG NHẬP BÁC SĨ
          </Link>
        )}
        
        {token && !googleId && login === "Doctor" && (
          <Link
            to="/doctor" // Chỗ này thường là dashboard nếu đã đăng nhập
            className="btn btn-success justify-content-center w-100 py-2 font-weight-bold"
          >
            BẢNG ĐIỀU KHIỂN BÁC SĨ
          </Link>
        )}

        {/* VAI TRÒ BỆNH NHÂN */}
        {/* Sửa lại chỗ này để nó push(link) thay vì push("/patient") */}
        {!googleId && login === "Patient" && (
          <Button
            onClick={() => history.push(link)}
            className="btn btn-info text-white justify-content-center w-100 py-2 font-weight-bold"
          >
            ĐĂNG NHẬP BỆNH NHÂN
          </Button>
        )}

        {token && googleId && login === "Patient" && (
          <Link
            to="/patient" // Nếu đã đăng nhập thì mới vào dashboard
            className="btn btn-success justify-content-center w-100 py-2 font-weight-bold"
          >
            TRANG CÁ NHÂN BỆNH NHÂN
          </Link>
        )}
        
        <p className="mt-3 small text-muted">
          {login === "Doctor" ? "Dành cho cán bộ y tế" : "Dành cho khách hàng"}
        </p>
      </div>
    </div>
  );
};

export default Card;