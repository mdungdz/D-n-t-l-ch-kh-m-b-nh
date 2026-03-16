import React from "react";

const PatientStories = () => {
  const stories = [
    {
      id: 1,
      title: "Ánh sáng cuối con đường cho đôi mắt mờ đục",
      patient: "Bà Nguyễn Thị Hòa (65 tuổi - Hà Nam)",
      diagnosis: "Phẫu thuật Phaco thay thủy tinh thể",
      content: "Gần hai năm qua, thế giới của tôi chỉ là những mảng màu mờ ảo. Tôi không còn dám tự đi chợ hay bế cháu vì sợ ngã. Đã có lúc tôi nghĩ mình phải chấp nhận cảnh mù lòa tuổi già. Nhưng sau khi được con cái đưa đến NMD Medical, sự tận tâm của đội ngũ bác sĩ đã thay đổi tất cả. Bác sĩ không chỉ tư vấn về chuyên môn mà còn ngồi lại trấn an tâm lý cho một người già sợ mổ như tôi suốt gần 1 tiếng đồng hồ. Ca đại phẫu diễn ra nhẹ nhàng, không đau đớn như tôi tưởng. Sáng hôm sau khi tháo băng, tôi đã bật khóc khi nhìn rõ khuôn mặt của các con mình sau bao năm xa cách.",
      quote: "Ở cái tuổi xế chiều này, được nhìn thấy rõ mặt con cháu là món quà vô giá nhất.",
      img: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "Tháng 12, 2025"
    },
    {
      id: 2,
      title: "Hồi sinh sau cơn đột quỵ bất ngờ",
      patient: "Anh Trần Hoàng Nam (42 tuổi - Hà Nội)",
      diagnosis: "Can thiệp mạch vành cấp cứu",
      content: "Là một kỹ sư xây dựng, tôi luôn tự tin vào sức khỏe của mình cho đến một buổi chiều định mệnh. Cơn đau ngực dữ dội khiến tôi gục ngã. May mắn thay, tôi được đưa đến NMD Medical trong 'giờ vàng'. Quy trình siêu tốc tại đây thực sự đáng kinh ngạc, từ lúc xe cấp cứu cập bến đến khi tôi nằm trên bàn can thiệp chỉ mất chưa đầy 30 phút. Bác sĩ Alexander Pierce cùng ekip đã làm việc không nghỉ để thông lại mạch máu nuôi tim cho tôi. Nhìn lại khoảnh khắc sinh tử đó, tôi mới hiểu giá trị của một hệ thống y tế chuyên nghiệp và phản ứng nhanh.",
      quote: "Nếu không có sự quyết đoán và trang thiết bị hiện đại tại đây, có lẽ tôi đã không còn cơ hội này.",
      img: "https://images.pexels.com/photos/3825410/pexels-photo-3825410.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "Tháng 01, 2026"
    }
  ];

  return (
    <section id="y-kien" className="py-5 bg-light-soft" style={{ scrollMarginTop: '90px' }}>
      <div className="container py-lg-5">
        <div className="text-center mb-5">
          <span className="subtitle-main text-primary font-weight-bold">NHẬT KÝ CHỮA LÀNH</span>
          <h2 className="navy-title-premium mt-2">SỰ HỒI SINH TỪ NHỮNG NIỀM TIN</h2>
          <div className="premium-line"></div>
        </div>

        <div className="row justify-content-center">
          {stories.map((story) => (
            <div className="col-lg-11 mb-5" key={story.id}>
              <div className="story-card-premium shadow-lg">
                <div className="row no-gutters">
                  <div className="col-lg-5 col-md-12">
                    <div className="story-image-wrapper">
                      <img src={story.img} alt="Patient Story" className="img-doc-story" />
                      <div className="story-date-tag">{story.date}</div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12 bg-white">
                    <div className="p-4 p-lg-5">
                      <span className="badge badge-warning px-3 py-2 rounded-pill mb-3" style={{fontWeight: '700'}}>{story.diagnosis}</span>
                      <h3 className="mb-3" style={{color: '#002d52', fontWeight: '800', fontSize: '1.6rem'}}>{story.title}</h3>
                      <p className="text-muted mb-4" style={{fontSize: '1rem', lineHeight: '1.8', textAlign: 'justify'}}>
                        {story.content}
                      </p>
                      <div className="story-quote-box mb-4">
                        <p className="mb-0 font-italic" style={{color: '#007bff', fontWeight: '600'}}>
                          <i className="fa fa-quote-left mr-3"></i>
                          {story.quote}
                        </p>
                      </div>
                      <div className="d-flex align-items-center pt-4 border-top">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mr-3" style={{width:'45px', height:'45px'}}>
                          <i className="fa fa-user"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 font-weight-bold text-dark">{story.patient}</h6>
                          <small className="text-success font-weight-bold"><i className="fa fa-check-circle mr-1"></i> Đã hồi phục</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .bg-light-soft { background-color: #f8fbff; }
        .story-card-premium { border-radius: 25px; overflow: hidden; background: #fff; border: 1px solid #eef2f6; transition: 0.3s; }
        .story-card-premium:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,45,82,0.1) !important; }
        .story-image-wrapper { height: 100%; min-height: 400px; position: relative; }
        .img-doc-story { width: 100%; height: 100%; object-fit: cover; }
        .story-date-tag { position: absolute; bottom: 20px; right: 20px; background: #fff; padding: 5px 15px; border-radius: 50px; font-weight: 700; font-size: 11px; }
        .story-quote-box { background: #f0f7ff; padding: 20px; border-radius: 12px; border-left: 5px solid #007bff; }
        .premium-line { width: 60px; height: 4px; background: #ffc107; margin: 15px auto 0; border-radius: 10px; }
        @media (max-width: 991px) { .story-image-wrapper { min-height: 300px; } }
      `}</style>
    </section>
  );
};

export default PatientStories;