import React, { useState, useEffect } from "react";

// --- ĐỒNG BỘ ẢNH CHÍNH XÁC THEO FILE SEARCHDOCTOR CỦA BẠN ---
import nmdLogo from "../image/nmd.png";
import alexnguyenLogo from "../image/alexx.jpg"; // Đã khớp với alexx.jpg trong ảnh màn hình của bạn
import trannhatminhLogo from "../image/trannhatminh.jpg";
import tranthithanhLogo from "../image/tranthithanh.jpg";

const Doctors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const doctorList = [
    {
      id: 1,
      name: "GS. TS. NGUYỄN MẠNH DŨNG",
      specialization: "Nội Tổng Quát",
      exp: "35 năm kinh nghiệm",
      img: nmdLogo,
      highlight: "Giám đốc chuyên môn tại NMD Medical với hơn 35 năm cống hiến trong ngành Y. Nguyên là giảng viên cao cấp tại Đại học Y Hà Nội, Giáo sư Dũng đã đào tạo hàng ngàn thế hệ bác sĩ và trực tiếp tham gia xử lý các ca bệnh nội khoa phức tạp."
    },
    {
      id: 2,
      name: "GS. ALEXANDER NGUYỄN",
      specialization: "Tim Mạch",
      exp: "25 năm kinh nghiệm",
      img: alexnguyenLogo,
      highlight: "Chuyên gia đầu ngành về can thiệp tim mạch. Sau nhiều năm tu nghiệp tại Hoa Kỳ, hiện ông đang công tác toàn thời gian tại Việt Nam, trực tiếp điều hành trung tâm kỹ thuật cao tại NMD để mang lại trái tim khỏe mạnh cho cộng đồng."
    },
    {
      id: 3,
      name: "TS. BS. TRẦN NHẬT MINH",
      specialization: "Tiêu Hóa",
      exp: "20 năm kinh nghiệm",
      img: trannhatminhLogo,
      highlight: "Bậc thầy nội soi tiêu hóa được đào tạo chuyên sâu tại Nhật Bản. Bác sĩ Minh nổi tiếng với kỹ thuật nội soi không đau và ứng dụng công nghệ hiện đại trong tầm soát sớm ung thư, luôn đảm bảo sự an tâm tuyệt đối cho bệnh nhân."
    },
    {
      id: 4,
      name: "GS. TS. TRẦN THỊ THANH",
      specialization: "Sản Phụ Khoa",
      exp: "30 năm kinh nghiệm",
      img: tranthithanhLogo,
      highlight: "Chuyên gia đầu ngành Phụ sản và Hiếm muộn với trái tim nhân hậu. Bà đã hỗ trợ thành công cho hơn 5.000 cặp vợ chồng đón thiên thần nhỏ nhờ ứng dụng các phương pháp hỗ trợ sinh sản tiên tiến và thấu hiểu tâm lý bệnh nhân."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === doctorList.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [doctorList.length]);

  return (
    <section id="bac-si" className="doctors-carousel-section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="premium-tag">BOARD OF DIRECTORS</span>
          <h2 className="premium-title">Hội Đồng <span className="gold-text">Chuyên Gia</span></h2>
          <div className="premium-accent-line"></div>
        </div>

        <div className="carousel-wrapper">
          {doctorList.map((doc, index) => (
            <div 
              key={doc.id} 
              className={`doctor-slide ${index === currentIndex ? "active" : ""}`}
            >
              <div className="row align-items-center">
                <div className="col-lg-5 text-center">
                  <div className="expert-portrait-frame">
                    {/* SỬA LỖI: Thuộc tính object-position: top để nhìn rõ mặt bác sĩ */}
                    <img 
                      src={doc.img} 
                      alt={doc.name} 
                      className="expert-img" 
                      style={{ objectPosition: "top center" }} 
                    />
                    <div className="exp-badge-float">{doc.exp}</div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <div className="expert-bio-box">
                    <span className="bio-spec">{doc.specialization}</span>
                    <h3 className="bio-name">{doc.name}</h3>
                    <div className="bio-divider"></div>
                    <p className="bio-text">{doc.highlight}</p>
                    
                    <div className="carousel-nav">
                      {doctorList.map((_, i) => (
                        <button 
                          key={i} 
                          className={`nav-dot ${i === currentIndex ? "active" : ""}`}
                          onClick={() => setCurrentIndex(i)}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .doctors-carousel-section {
          padding: 100px 0;
          background-color: #002d52;
          min-height: 800px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .premium-tag { color: #b8965d; letter-spacing: 5px; font-size: 12px; font-weight: 700; display: block; margin-bottom: 10px; }
        .premium-title { color: #ffffff; font-size: 3rem; font-weight: 900; margin: 0; }
        .gold-text { color: #b8965d; }
        .premium-accent-line { width: 60px; height: 3px; background: #b8965d; margin: 20px auto 0; }

        .carousel-wrapper { position: relative; height: 480px; margin-top: 60px; }

        .doctor-slide {
          position: absolute;
          width: 100%;
          opacity: 0;
          visibility: hidden;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(20px);
        }

        .doctor-slide.active { opacity: 1; visibility: visible; transform: translateY(0); }

        .expert-portrait-frame {
          position: relative;
          width: 350px;
          height: 350px;
          margin: 0 auto;
          border: 3px solid #b8965d;
          border-radius: 50%;
          padding: 15px;
        }

        .expert-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .exp-badge-float {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: #b8965d;
          color: white;
          padding: 10px 25px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 800;
        }

        .expert-bio-box { padding-left: 60px; color: white; text-align: left; }
        .bio-spec { color: #b8965d; font-size: 14px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; }
        .bio-name { font-size: 2.5rem; font-weight: 900; margin: 15px 0; }
        .bio-divider { width: 80px; height: 4px; background: #b8965d; margin-bottom: 30px; }
        .bio-text { font-size: 1.1rem; line-height: 1.8; color: #e2e8f0; max-width: 650px; margin-bottom: 45px; }

        .carousel-nav { display: flex; gap: 15px; }
        .nav-dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.2); border: none; cursor: pointer; transition: 0.3s; }
        .nav-dot.active { background: #b8965d; width: 50px; border-radius: 10px; }

        @media (max-width: 991px) {
          .expert-bio-box { padding-left: 0; text-align: center; margin-top: 50px; }
          .bio-name { font-size: 2rem; }
          .carousel-wrapper { height: auto; }
          .doctor-slide { position: relative; display: none; }
          .doctor-slide.active { display: block; }
          .bio-divider { margin: 0 auto 30px; }
          .carousel-nav { justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default Doctors;