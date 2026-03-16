// file 3 bác sĩ
import React, { useState, useRef } from "react"; // Thêm useRef để trigger input file
import { FaCamera, FaAward, FaUniversity, FaUserTie, FaQuoteLeft, FaBriefcase, FaStethoscope, FaMicroscope } from "react-icons/fa";

const DoctorProfileContent = ({ doctorName }) => {
  // 1. DỮ LIỆU CHI TIẾT THEO CHUYÊN KHOA (ĐỂ FLEX CHUẨN)
  const specialtyDetails = {
    "Tim Mạch": {
      edu: ["Tiến sĩ Y khoa - ĐH Oxford (UK)", "Bác sĩ Nội trú Tim mạch - ĐH Y Hà Nội"],
      exp: ["Cố vấn cấp cao Hội Tim mạch Hoa Kỳ (AHA)", "Trưởng khoa Can thiệp Mạch máu"],
      skills: ["Ghép tim & Phổi", "Can thiệp mạch vành", "Sửa van tim nội soi", "Robot phẫu thuật"],
      quote: "Trái tim khỏe mạnh là cội nguồn của sự sống."
    },
    "Nội Tổng Quát": {
      edu: ["Thạc sĩ Quản lý Y tế - ĐH Harvard (USA)", "Bác sĩ Đa khoa - ĐH Y Hà Nội"],
      exp: ["Giám đốc điều hành Hệ thống Y tế NMD", "20 năm nghiên cứu bệnh lý nội khoa phức tạp"],
      skills: ["Tầm soát ung thư sớm", "Điều trị bệnh mãn tính", "Chẩn đoán hình ảnh cao cấp"],
      quote: "Chăm sóc toàn diện, tận tâm vì sức khỏe cộng đồng."
    },
    "Tiêu Hóa": {
      edu: ["Tu nghiệp Nội soi can thiệp tại Nhật Bản", "Bác sĩ chuyên khoa II - ĐH Y Dược"],
      exp: ["Bậc thầy nội soi tiêu hóa", "Chuyên gia điều trị Ung thư đường tiêu hóa"],
      skills: ["Nội soi không đau", "Cắt polyp đại tràng", "Điều trị HP kháng thuốc"],
      quote: "Hệ tiêu hóa khỏe là chìa khóa của hệ miễn dịch."
    },
    "Sản Phụ Khoa": {
      edu: ["Chứng chỉ Phẫu thuật nội soi phụ khoa (Pháp)", "Bác sĩ Nội trú Sản khoa"],
      exp: ["Chuyên gia đầu ngành Phụ sản Việt Nam", "Cố vấn chuyên môn các bệnh viện Phụ sản lớn"],
      skills: ["Quản lý thai kỳ nguy cơ cao", "Phẫu thuật nội soi phụ khoa", "Hỗ trợ sinh sản"],
      quote: "Đồng hành cùng mẹ tròn con vuông."
    },
    "Nhi Khoa": {
      edu: ["Chứng chỉ Nhi khoa nâng cao (Úc)", "Bác sĩ chuyên khoa Nhi - ĐH Y Hà Nội"],
      exp: ["Chuyên gia phẫu thuật nhi tài năng", "Hơn 15 năm kinh nghiệm điều trị nhi khoa"],
      skills: ["Cấp cứu nhi khoa", "Điều trị bệnh lý sơ sinh", "Tư vấn dinh dưỡng chuyên sâu"],
      quote: "Tương lai trẻ thơ bắt đầu từ sức khỏe hôm nay."
    }
  };

  // 2. DANH SÁCH BÁC SĨ (KHỚP VỚI FILE SEARCHDOCTOR)
  const doctorsList = [
    { id: 1, name: "GS. TS. NGUYỄN MẠNH DŨNG", specialization: "Nội Tổng Quát", exp: "Trên 30 năm", achi: "+15.000 ca thành công" },
    { id: 2, name: "GS. ALEXANDER NGUYỄN", specialization: "Tim Mạch", exp: "Trên 25 năm", achi: "+10.000 ca thành công" },
    { id: 3, name: "TS. BS. TRẦN NHẬT MINH", specialization: "Tiêu Hóa", exp: "Trên 15 năm", achi: "+5.000 ca thành công" },
    { id: 4, name: "GS. TS. TRẦN THỊ THANH", specialization: "Sản Phụ Khoa", exp: "Trên 20 năm", achi: "+8.000 ca thành công" },
    { id: 6, name: "BS. PHẠM ĐĂNG KHOA", specialization: "Nhi Khoa", exp: "Trên 12 năm", achi: "+3.000 ca thành công" }
  ];

  const currentDoctor = doctorsList.find(doc => doc.name === doctorName) || {
    name: doctorName,
    specialization: "Nội Tổng Quát",
    exp: "Trên 10 năm",
    achi: "Nhiều thành tựu y khoa"
  };

  const details = specialtyDetails[currentDoctor.specialization] || specialtyDetails["Nội Tổng Quát"];
  const [avatar, setAvatar] = useState(localStorage.getItem(`avatar_${doctorName}`) || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png");
  
  // Ref để mở file input
  const fileInputRef = useRef(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatar(base64String);
        localStorage.setItem(`avatar_${doctorName}`, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn" style={{ marginTop: "20px" }}>
      <div className="card border-0 shadow-lg" style={{ borderRadius: "30px", overflow: "hidden", background: "#ffffff" }}>
        <div className="row no-gutters flex-row-reverse"> 
          
          {/* CỘT PHẢI: AVATAR & QUOTE */}
          <div className="col-md-4 d-flex flex-column align-items-center justify-content-center text-white p-4" 
               style={{ background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)", minHeight: "650px" }}>
            
            {/* PHẦN SỬA: Bấm vào ảnh hoặc icon để đổi avatar */}
            <div className="position-relative mb-4" style={{ cursor: "pointer" }} onClick={() => fileInputRef.current.click()}>
              <img src={avatar} className="rounded-circle bg-white p-2" style={{ width: "185px", height: "185px", objectFit: "cover", border: "4px solid rgba(255,255,255,0.2)" }} alt="Doctor Avatar" />
              <div className="position-absolute d-flex align-items-center justify-content-center" 
                   style={{ bottom: "10px", right: "10px", background: "#f59e0b", width: "45px", height: "45px", borderRadius: "50%", border: "3px solid #1e3a8a" }}>
                <FaCamera size={20} />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} style={{ display: "none" }} accept="image/*" />
            </div>

            <h3 className="font-weight-bold text-center mb-2">{currentDoctor.name}</h3>
            <div className="badge badge-warning px-4 py-2 mb-4 text-dark font-weight-bold shadow-sm">CHUYÊN GIA TUYẾN ĐẦU</div>
            <div className="text-center px-4 w-100" style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "20px" }}>
              <FaQuoteLeft className="mb-2 opacity-50" size={18} />
              <p className="small mb-0 font-italic opacity-90">"{details.quote}"</p>
            </div>
          </div>

          {/* CỘT TRÁI: THÔNG TIN CHI TIẾT THEO CHUYÊN KHOA */}
          <div className="col-md-8 px-5 py-5 bg-white">
            <div className="row mb-5">
              <div className="col-lg-7">
                <h6 className="text-primary font-weight-bold text-uppercase mb-3 d-flex align-items-center"><FaUserTie className="mr-2" /> Vị trí hiện tại</h6>
                <ul className="list-unstyled pl-1">
                  <li className="mb-2">● <b>Chuyên gia cao cấp</b> - Khoa {currentDoctor.specialization}</li>
                  <li className="mb-2">● <b>Hội đồng khoa học</b> Hệ thống Y tế NMD</li>
                  {currentDoctor.id === 1 && <li>● <b>Giám đốc điều hành</b> Bệnh viện</li>}
                </ul>
              </div>
              <div className="col-lg-5">
                <div className="p-3 bg-light rounded-lg border mb-3 shadow-sm">
                   <div className="d-flex align-items-center"><FaAward className="text-warning mr-2" /> <small className="font-weight-bold text-muted">KINH NGHIỆM</small></div>
                   <h5 className="font-weight-bold mb-0 ml-4">{currentDoctor.exp}</h5>
                </div>
                <div className="p-3 bg-light rounded-lg border shadow-sm" style={{borderColor: "#a7f3d0 !important"}}>
                   <div className="d-flex align-items-center"><FaStethoscope className="text-success mr-2" /> <small className="font-weight-bold text-success">THÀNH TỰU</small></div>
                   <h5 className="font-weight-bold text-success mb-0 ml-4">{currentDoctor.achi}</h5>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <h6 className="text-primary font-weight-bold text-uppercase mb-3 d-flex align-items-center"><FaUniversity className="mr-2" /> Đào tạo & Bằng cấp</h6>
                {details.edu.map((e, idx) => <p key={idx} className="small mb-2 border-left pl-2 border-primary"><b>{e}</b></p>)}
              </div>
              <div className="col-md-6 mb-4">
                <h6 className="text-primary font-weight-bold text-uppercase mb-3 d-flex align-items-center"><FaBriefcase className="mr-2" /> Quá trình công tác</h6>
                {details.exp.map((ex, idx) => <p key={idx} className="small mb-2 border-left pl-2 border-info">{ex}</p>)}
              </div>
            </div>

            <div className="mt-2">
                <h6 className="text-primary font-weight-bold text-uppercase mb-3 d-flex align-items-center"><FaMicroscope className="mr-2" /> Lĩnh vực chuyên sâu</h6>
                <div className="d-flex flex-wrap">
                    {details.skills.map((s, idx) => (
                        <span key={idx} className="badge badge-light border py-2 px-3 mr-2 mb-2" style={{ borderRadius: "10px", background: "#f1f5f9" }}>{s}</span>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileContent;