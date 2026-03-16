import React from "react";
import { Link, useLocation } from "react-router-dom";

const LoginButton = () => {
  const location = useLocation();
  if (location.pathname !== "/") return null;

  return (
    <div className="portal-container">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="main-title">HỆ THỐNG QUẢN TRỊ Y TẾ</h2>
          <div className="accent-line"></div>
          <p className="sub-title">NMD MEDICAL - CÔNG NGHỆ DẪN ĐẦU - DỊCH VỤ TẬN TÂM</p>
        </div>

        <div className="row justify-content-center g-0">
          <div className="col-lg-5 col-md-6 px-3">
            <div className="portal-card">
              <div className="card-inner">
                <div className="icon-area">
                  <i className="fa fa-user-md"></i>
                </div>
                <h3 className="role-title">CHUYÊN GIA</h3>
                <p className="role-desc">Dành cho đội ngũ bác sĩ và cán bộ quản lý điều hành chuyên môn y khoa cao cấp.</p>
                <Link to="/doctorlogin" className="portal-btn btn-navy">BẮT ĐẦU LÀM VIỆC</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-6 px-3">
            <div className="portal-card highlight">
              <div className="card-inner">
                <div className="icon-area">
                  <i className="fa fa-hospital-user"></i>
                </div>
                <h3 className="role-title">BỆNH NHÂN</h3>
                <p className="role-desc">Đặt lịch khám trực tuyến, theo dõi hồ sơ sức khỏe và nhận kết quả nhanh chóng.</p>
                <Link to="/patientlogin" className="portal-btn btn-blue">ĐẶT LỊCH NGAY</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .portal-container {
          background-color: #ffffff; 
          /* KÉO LÊN CHE KHOẢNG TRẮNG */
          margin-top: -100px; 
          padding: 100px 0;
          position: relative;
          z-index: 10;
          font-family: 'Segoe UI', Arial, sans-serif;
          /* TUYỆT ĐỐI KHÔNG BO GÓC */
          border-radius: 0 !important; 
        }

        .main-title {
          font-weight: 900;
          color: #002d52;
          font-size: 2.5rem;
          letter-spacing: 2px;
        }

        .sub-title { 
          color: #64748b; 
          font-size: 1rem;
          letter-spacing: 4px;
          font-weight: 700;
          margin-top: 15px;
        }

        .accent-line {
          width: 80px;
          height: 5px;
          background: #002d52;
          margin: 15px auto;
          /* KHÔNG BO GÓC */
          border-radius: 0; 
        }

        .portal-card {
          background: #ffffff;
          /* KHÔNG BO GÓC */
          border-radius: 0 !important; 
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          height: 100%;
          position: relative;
        }

        .portal-card.highlight {
          border-top: 6px solid #3182ce;
        }

        .card-inner {
          padding: 60px 40px;
          text-align: center;
        }

        .portal-card:hover { 
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
          border-color: #002d52;
        }

        .icon-area {
          font-size: 3.5rem;
          color: #002d52;
          margin-bottom: 30px;
        }

        .role-title { 
          font-weight: 800; 
          color: #1a202c; 
          font-size: 1.8rem; 
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .role-desc { 
          color: #4a5568; 
          line-height: 1.8; 
          margin-bottom: 45px; 
          font-size: 1rem;
        }

        .portal-btn {
          display: block;
          padding: 18px;
          /* KHÔNG BO GÓC */
          border-radius: 0 !important; 
          font-weight: 800;
          text-decoration: none !important;
          transition: 0.3s;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.9rem;
        }

        .btn-navy { 
          background: #002d52; 
          color: #ffffff !important; 
          border: 1px solid #002d52;
        }
        
        .btn-blue { 
          background: transparent; 
          color: #3182ce !important; 
          border: 2px solid #3182ce;
        }

        .portal-btn:hover {
          background: #3182ce;
          color: #ffffff !important;
          border-color: #3182ce;
        }
      `}</style>
    </div>
  );
};

export default LoginButton;