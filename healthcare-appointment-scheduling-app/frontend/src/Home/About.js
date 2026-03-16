import React from "react";
// Đảm bảo file ảnh bác sĩ của ông nằm đúng đường dẫn này
import ImageDoctorReal from "../image/Tm-1.jpg"; 

const About = () => {
  return (
    <section className="about-luxury-section">
      <div className="container">
        <div className="about-inner-card">
          <div className="row g-0 align-items-stretch"> {/* Dùng align-items-stretch để 2 cột bằng nhau */}
            
            {/* CỘT TRÁI: NỘI DUNG */}
            <div className="col-lg-7">
              <div className="luxury-content-padding">
                <div className="premium-tag">
                  <span className="gold-line"></span>
                  SINCE 2010 • NMD MEDICAL
                </div>
                
                <h2 className="luxury-title">
                  Kiến Tạo Tiêu Chuẩn <br/>
                  <span className="serif-font">Y Khoa Đương Đại</span>
                </h2>
                
                <p className="luxury-lead">
                  Chúng tôi định nghĩa lại trải nghiệm chăm sóc sức khỏe cá nhân hóa thông qua <strong>nền tảng số hóa toàn diện</strong>.
                </p>

                <div className="stats-compact-grid">
                  <div className="stat-box">
                    <span className="s-num">98%</span>
                    <span className="s-lbl">HÀI LÒNG</span>
                  </div>
                  <div className="stat-box">
                    <span className="s-num">24/7</span>
                    <span className="s-lbl">HỖ TRỢ</span>
                  </div>
                  <div className="stat-box">
                    <span className="s-num">TOP 10</span>
                    <span className="s-lbl">HỆ THỐNG SỐ</span>
                  </div>
                </div>

                <div className="ceo-signature-mini">
                  <p className="q-text">
                    "Sức khỏe của bạn là kim chỉ nam cho mọi nỗ lực của chúng tôi."
                  </p>
                  <div className="ceo-name">
                    {/* Đã cập nhật tên CEO theo yêu cầu của ông */}
                    <strong>Nguyen Manh Dung</strong>
                    <small>Founder & CEO NMD Medical</small>
                  </div>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: ẢNH TRÀN VIỀN CÂN BẰNG */}
            <div className="col-lg-5 bg-luxury-gray">
              <div className="img-full-height-wrapper">
                <img 
                  src={ImageDoctorReal} 
                  className="img-doctor-stretched" 
                  alt="Specialist" 
                />
                {/* Đã xóa phần 15 ESTABLISHED EXPERTISE theo ý ông */}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .about-luxury-section { 
          padding: 60px 0; 
          background-color: #ffffff; 
        }

        .about-inner-card { 
          background: #ffffff; 
          border-radius: 40px; 
          box-shadow: 0 20px 60px rgba(0,0,0,0.05); 
          overflow: hidden;
          border: 1px solid #f8f9fa;
        }

        .luxury-content-padding { 
          padding: 60px; /* Tăng padding để khối nội dung có độ cao đẹp */
        }

        .premium-tag { 
          font-size: 11px; font-weight: 700; letter-spacing: 3px; color: #b8965d; 
          display: flex; align-items: center; gap: 10px; margin-bottom: 20px; 
        }
        .gold-line { width: 30px; height: 1px; background: #b8965d; }

        .luxury-title { 
          font-size: 2.8rem; font-weight: 900; color: #0c1a24; 
          line-height: 1.2; margin-bottom: 20px; 
        }
        .serif-font { font-style: italic; color: #004274; font-weight: 500; }

        .luxury-lead { 
          font-size: 1.1rem; color: #5d676e; line-height: 1.7; 
          margin-bottom: 30px;
        }

        .stats-compact-grid { 
          display: grid; grid-template-columns: repeat(3, 1fr); 
          gap: 20px; margin-bottom: 30px; padding-bottom: 30px;
          border-bottom: 1px solid #f1f5f9;
        }
        .s-num { display: block; font-size: 1.8rem; font-weight: 800; color: #004274; }
        .s-lbl { font-size: 10px; font-weight: 700; color: #b8965d; letter-spacing: 1px; }

        .q-text { font-style: italic; color: #475569; font-size: 1rem; margin-bottom: 10px; }
        .ceo-name strong { display: block; font-size: 1.1rem; color: #0c1a24; }
        .ceo-name small { font-size: 12px; color: #94a3b8; }

        /* Tối ưu ảnh tràn viền bằng cột trái */
        .bg-luxury-gray { 
          background-color: #f8fafc;
          position: relative;
        }
        
        .img-full-height-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end; /* Ảnh bắt đầu từ đáy cột */
          justify-content: center;
        }

        .img-doctor-stretched { 
          width: 100%;
          height: 100%;
          object-fit: cover; /* Quan trọng: Giúp ảnh lấp đầy chiều cao của cột trái */
          object-position: top; /* Giữ lấy phần đầu và vai bác sĩ */
        }

        @media (max-width: 991px) {
          .img-full-height-wrapper { height: 450px; }
          .luxury-content-padding { padding: 40px; }
        }
      `}</style>
    </section>
  );
};

export default About;