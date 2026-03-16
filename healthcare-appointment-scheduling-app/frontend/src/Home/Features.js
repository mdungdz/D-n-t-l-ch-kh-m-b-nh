import React from "react";

const Features = () => {
  const advantages = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/3304/3304567.png", 
      title: "Đội ngũ chuyên gia",
      desc: "Hội tụ hơn 50 bác sĩ đầu ngành, tu nghiệp tại nước ngoài với kinh nghiệm trên 15 năm.",
      // Màu gradient cho thẻ 1 & 3 (Vàng Gold)
      cardBg: "linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)",
      accent: "#b45309"
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/3004/3004451.png",
      title: "Thiết bị hiện đại",
      desc: "Sở hữu hệ thống máy MRI, CT Scan thế hệ mới nhất, hỗ trợ chẩn đoán chính xác đến 99%.",
      // Màu gradient cho thẻ 2 & 4 (Bạc Silver)
      cardBg: "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)",
      accent: "#0f172a"
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/3248/3248152.png",
      title: "Quy trình siêu tốc",
      desc: "Hệ thống đặt lịch thông minh giúp giảm thời gian chờ đợi trung bình chỉ còn 10 phút.",
      cardBg: "linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)",
      accent: "#b45309"
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/1067/1067566.png",
      title: "An toàn tuyệt đối",
      desc: "Hệ thống kiểm soát nhiễm khuẩn đạt chuẩn quốc tế JCI, đảm bảo an toàn tối đa cho bệnh nhân.",
      cardBg: "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)",
      accent: "#0f172a"
    }
  ];

  return (
    <section id="uu-diem" className="features-elite-world">
      <div className="container position-relative">
        <div className="text-center mb-5">
          <div className="elite-tag">INTERNATIONAL ELITE</div>
          <h2 className="elite-title">
            TIÊU CHUẨN Y KHOA <span className="text-highlight-gold">TOÀN CẦU</span>
          </h2>
          <div className="elite-underline"></div>
        </div>

        <div className="row g-4">
          {advantages.map((item, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="elite-card" style={{ background: item.cardBg }}>
                {/* Số thứ tự in chìm cực lớn */}
                <div className="elite-card-number">0{index + 1}</div>
                
                <div className="elite-card-inner">
                  <div className="elite-icon-wrap" style={{ border: `1px solid ${item.accent}30` }}>
                    <img src={item.image} alt={item.title} className="elite-icon" />
                  </div>
                  
                  <h5 className="elite-card-title" style={{ color: item.accent }}>{item.title}</h5>
                  <p className="elite-card-desc">{item.desc}</p>
                  
                  <div className="elite-footer">
                    <span className="elite-status">SECURED SYSTEM</span>
                    <div className="elite-dot" style={{ background: item.accent }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-elite-world {
          background: #001e3c; /* Giữ nguyên màu nền Sapphire tối sang trọng */
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }

        .elite-tag {
          color: #fde68a;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 4px;
          margin-bottom: 15px;
        }

        .elite-title {
          color: #ffffff; /* Giữ nguyên màu trắng cho font tiêu đề như ông yêu cầu */
          font-weight: 900;
          font-size: 3rem;
          letter-spacing: -1px;
        }

        .text-highlight-gold {
          background: linear-gradient(180deg, #fde68a 0%, #b45309 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .elite-underline {
          width: 80px; height: 4px;
          background: #fde68a;
          margin: 20px auto 0;
          border-radius: 10px;
        }

        .elite-card {
          border-radius: 25px;
          padding: 45px 25px;
          height: 100%;
          position: relative;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .elite-card:hover {
          transform: translateY(-20px) rotate(1deg);
          box-shadow: 0 40px 70px rgba(0,0,0,0.4);
        }

        .elite-card-number {
          position: absolute;
          top: -10px; right: 10px;
          font-size: 90px;
          font-weight: 950;
          color: rgba(0,0,0,0.05);
          z-index: 0;
          font-family: 'Arial Black', sans-serif;
        }

        .elite-card-inner {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .elite-icon-wrap {
          width: 70px; height: 70px;
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 25px;
          background: rgba(255,255,255,0.3);
        }

        .elite-icon {
          width: 35px; height: 35px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        .elite-card-title {
          font-weight: 900;
          font-size: 1.3rem;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }

        .elite-card-desc {
          color: #475569;
          font-size: 14.5px;
          line-height: 1.6;
          font-weight: 600;
        }

        .elite-footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(0,0,0,0.05);
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .elite-status {
          font-size: 9px;
          font-weight: 900;
          color: rgba(0,0,0,0.4);
          letter-spacing: 2px;
        }

        .elite-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
        }

        @media (max-width: 991px) {
          .elite-title { font-size: 2.2rem; }
        }
      `}</style>
    </section>
  );
};

export default Features;