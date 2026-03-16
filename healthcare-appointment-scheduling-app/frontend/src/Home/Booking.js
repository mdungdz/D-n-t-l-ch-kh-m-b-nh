import React from "react";
// Dùng useHistory vì máy ông đang dùng React Router bản cũ
import { useHistory } from "react-router-dom"; 
import doctorImgFile from "../image/anh-bia-bac-si.webp"; 

const Booking = () => {
  const doctorImg = doctorImgFile;
  // Khởi tạo history để nhảy trang
  const history = useHistory(); 

  return (
    <div className="booking-section-premium">
      <div className="container">
        <div className="row align-items-center">
          
          <div className="col-lg-7">
            <div className="badge-luxury">
              <span className="dot-pulse"></span>
              HỆ THỐNG ĐẶT LỊCH TRỰC TUYẾN
            </div>
            
            <h1 className="headline-premium">
              ĐI KHÁM <br />
              <span className="text-accent-red">ĐỪNG QUÊN !!!</span>
            </h1>
            
            <h2 className="sub-headline-premium">
              ĐẶT LỊCH TRƯỚC - <span className="text-highlight-blue">VÀO KHÁM NGAY</span>
            </h2>
            
            <div className="feature-grid-premium mt-4">
              <div className="f-item-premium">
                <div className="icon-box">
                  <i className="fas fa-user-clock"></i> 
                </div>
                <span>Tiết kiệm thời gian chờ</span>
              </div>
              <div className="f-item-premium">
                <div className="icon-box">
                  <i className="fas fa-stethoscope"></i>
                </div>
                <span>Chọn bác sĩ theo yêu cầu</span>
              </div>
            </div>

            <div className="cta-wrapper-premium mt-5">
              {/* NÚT BẤM DÙNG history.push ĐỂ CHUYỂN TRANG */}
              <button 
                className="btn-luxury-navy"
                onClick={() => history.push("/patientlogin")}
              >
                ĐẶT LỊCH KHÁM NGAY
                <i className="fa fa-arrow-right ml-2"></i>
              </button>
              
              <div className="hotline-premium">
                <p>Hotline hỗ trợ 24/7</p>
                <a href="tel:19002805">1900 2805</a>
              </div>
            </div>
          </div>

          <div className="col-lg-5 d-none d-lg-block position-relative">
            <div className="doctor-bg-transparent"></div>
            <img 
              src={doctorImg} 
              alt="Bác sĩ chuyên khoa" 
              className="img-doctor-premium-clean" 
            />
          </div>

        </div>
      </div>

      <style>{`
        /* GIỮ NGUYÊN TUYỆT ĐỐI TOÀN BỘ STYLE CỦA ÔNG */
        .booking-section-premium { 
          padding: 120px 0; 
          background: #ffffff; 
          position: relative;
          margin-top: -80px; 
          border-radius: 0; 
          z-index: 10;
          box-shadow: 0 -20px 50px rgba(0,0,0,0.08);
        }

        .btn-luxury-navy { 
          background: #002d52; 
          color: #fff; 
          border: none; 
          padding: 22px 45px; 
          border-radius: 15px; 
          font-weight: 800; 
          font-size: 1.1rem; 
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          box-shadow: 0 20px 40px rgba(0, 45, 82, 0.2);
          cursor: pointer;
        }

        .btn-luxury-navy:hover { 
          transform: translateY(-5px) scale(1.02);
          background: #004274;
          box-shadow: 0 25px 50px rgba(0, 45, 82, 0.35); 
        }

        .feature-grid-premium { display: flex; gap: 30px; }
        
        .f-item-premium { 
          display: flex; 
          align-items: center; 
          gap: 15px; 
          font-weight: 700; 
          color: #1e293b;
          background: #f8fafc;
          padding: 12px 20px;
          border-radius: 12px;
          transition: 0.3s;
        }

        .f-item-premium:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
        }

        .icon-box {
          width: 45px; height: 45px; background: #004274; color: #fff;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px; font-size: 1.2rem;
        }

        .badge-luxury { 
          background: rgba(0, 66, 116, 0.08);
          color: #004274; font-weight: 800; font-size: 13px; 
          padding: 8px 20px; border-radius: 50px; display: inline-flex;
          align-items: center; margin-bottom: 25px; 
        }

        .dot-pulse {
          width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 10px;
          animation: pulse 1.5s infinite;
        }

        .headline-premium { 
          font-size: 4.8rem; font-weight: 950; line-height: 0.95; 
          color: #0f172a; letter-spacing: -2px;
        }

        .text-accent-red { color: #e11d48; }
        .sub-headline-premium { font-size: 2rem; font-weight: 800; color: #334155; margin-top: 20px; }
        .text-highlight-blue { color: #3182ce; }

        .hotline-premium { display: inline-block; margin-left: 35px; vertical-align: middle; }
        .hotline-premium p { margin: 0; font-weight: 700; color: #64748b; font-size: 0.9rem; }
        .hotline-premium a { font-size: 2.2rem; color: #e11d48; font-weight: 900; text-decoration: none; }

        .img-doctor-premium-clean { width: 100%; height: auto; object-fit: contain; z-index: 2; }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 991px) {
          .headline-premium { font-size: 3rem; }
          .booking-section-premium { padding: 60px 0; margin-top: -40px; }
          .feature-grid-premium { flex-direction: column; gap: 10px; }
        }
      `}</style>
    </div>
  );
};

export default Booking;