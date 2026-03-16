// đăng nhập bệnh nhân file 1 thông tin cá nhân
import React, { useContext, useState, useEffect, useRef } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; 
import Axios from "axios";
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";

const PaitentDashboard = () => {
  // 1. Khởi tạo State: Ưu tiên lấy từ localStorage để chuyển trang không bị mất dữ liệu
  const [patient, setPatient] = useState({
    name: window.localStorage.getItem("patientName") || "Nguyễn Văn Duy",
    email: window.localStorage.getItem("patientEmail") || "",
    phoneNumber: window.localStorage.getItem("patientPhone") || "",
    picture: window.localStorage.getItem("patientPicture") || "", 
    _id: window.localStorage.getItem("patientId") || "",
    bmi: window.localStorage.getItem("patientBMI") || "22.5",
    bloodGroup: window.localStorage.getItem("patientBlood") || "O+"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState({ 
    email: patient.email, 
    phoneNumber: patient.phoneNumber 
  });

  const fileInputRef = useRef(null);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const { googleId } = useContext(AuthContext);

  // 2. Đồng bộ tempInfo khi patient thay đổi (để khi load từ local xong tempInfo cũng có dữ liệu luôn)
  useEffect(() => {
    setTempInfo({
      email: patient.email,
      phoneNumber: patient.phoneNumber
    });
  }, [patient]);

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const localId = window.localStorage.getItem("patientId");
        const idToUse = googleId || localId;
        if (idToUse) {
          const res = await Axios.get(`${process.env.REACT_APP_SERVER_URL}/patients/getPatientDetails/${idToUse}`);
          if (res.status === 200 && res.data) {
            const data = res.data;
            setPatient(data);
            
            // 3. Cập nhật localStorage mỗi khi Fetch dữ liệu mới từ Server thành công
            window.localStorage.setItem("patientName", data.name || "");
            window.localStorage.setItem("patientEmail", data.email || "");
            window.localStorage.setItem("patientPhone", data.phoneNumber || "");
            window.localStorage.setItem("patientBMI", data.bmi || "22.5");
            window.localStorage.setItem("patientBlood", data.bloodGroup || "O+");
            if (data._id) window.localStorage.setItem("patientId", data._id);
            if (data.picture) window.localStorage.setItem("patientPicture", data.picture);
          }
        }
      } catch (err) { console.log("Sử dụng dữ liệu Local"); }
    };
    getPatientDetails();
  }, [googleId]);

  const handleSave = async () => {
    try {
      // 4. Lưu vào máy (localStorage) trước để giao diện mượt mà
      window.localStorage.setItem("patientEmail", tempInfo.email);
      window.localStorage.setItem("patientPhone", tempInfo.phoneNumber);
      
      await Axios.post(`${process.env.REACT_APP_SERVER_URL}/patients/update-profile/${patient._id}`, tempInfo);
      
      setPatient({ ...patient, email: tempInfo.email, phoneNumber: tempInfo.phoneNumber });
      setIsEditing(false);
      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      // Trường hợp Server lỗi vẫn cho phép lưu tạm ở máy
      setPatient({ ...patient, email: tempInfo.email, phoneNumber: tempInfo.phoneNumber });
      setIsEditing(false);
      alert("Đã lưu thay đổi vào trình duyệt!");
    }
  };

  // Hàm xử lý khi chọn ảnh (nếu ông muốn lưu cả ảnh vào localStorage)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPatient(prev => ({ ...prev, picture: base64String }));
        window.localStorage.setItem("patientPicture", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1, width: "100%", overflow: "hidden" }}>
        <div style={{ width: "280px", minWidth: "280px", backgroundColor: "#0f172a" }}><Leftside /></div>
        <div style={{ flex: 1, height: "100%", overflowY: "auto", borderLeft: "6px solid #fdbb2d", display: "flex", flexDirection: "column" }}>
          
          <div className="container-fluid p-0" style={{ width: "100%", padding: "40px" }}>
            
            {/* TIÊU ĐỀ */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                  <h3 className="font-weight-bold text-dark mb-1 text-uppercase" style={{ letterSpacing: "1px" }}>📋 Bảng điều khiển</h3>
                  <div style={{ height: "5px", width: "40px", background: "#fdbb2d", borderRadius: "10px" }}></div>
                </div>
                <div className="badge p-2 px-4 text-dark font-weight-bold shadow-sm" style={{ backgroundColor: "#fdbb2d", borderRadius: "5px" }}>BỆNH NHÂN</div>
            </div>
            
            {/* THẺ CHỈ SỐ */}
            <div className="row mx-0 g-4" style={{ display: "flex", flexWrap: "wrap" }}> 
              <div className="col-md-4 mb-4 d-flex">
                <div className="card border-0 shadow-sm text-white p-4 w-100 stat-card" style={{ borderRadius: "24px", background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)", position: "relative", overflow: "hidden" }}>
                  <div className="stat-icon">⚖️</div>
                  <h6 className="text-uppercase small font-weight-bold opacity-75 mb-3">Chỉ số BMI</h6>
                  <h2 className="font-weight-bold display-4 mb-0">{patient.bmi}</h2>
                  <div className="mt-3 small px-3 py-1 d-inline-block" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }}>Tình trạng: Bình thường</div>
                </div>
              </div>

              <div className="col-md-4 mb-4 d-flex">
                <div className="card border-0 shadow-sm text-white p-4 w-100 stat-card" style={{ borderRadius: "24px", background: "linear-gradient(135deg, #059669 0%, #10b981 100%)", position: "relative", overflow: "hidden" }}>
                  <div className="stat-icon">🩸</div>
                  <h6 className="text-uppercase small font-weight-bold opacity-75 mb-3">Nhóm máu</h6>
                  <h2 className="font-weight-bold display-4 mb-0">{patient.bloodGroup}</h2>
                  <div className="mt-3 small px-3 py-1 d-inline-block" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }}>Hệ thống: 2026</div>
                </div>
              </div>

              <div className="col-md-4 mb-4 d-flex">
                <div className="card border-0 shadow p-4 w-100 stat-card" style={{ borderRadius: "24px", background: "#fff", border: "1px solid #e2e8f0", position: "relative", overflow: "hidden" }}>
                  <div className="stat-icon" style={{ opacity: "0.1" }}>📅</div>
                  <h6 className="text-uppercase small font-weight-bold text-muted mb-3">Lịch hẹn sắp tới</h6>
                  <h2 className="font-weight-bold display-4 mb-0" style={{ color: "#fdbb2d" }}>{appointmentCount < 10 ? `0${appointmentCount}` : appointmentCount}</h2>
                  <div className="mt-3 small font-weight-bold text-secondary">Lịch chờ khám</div>
                </div>
              </div>
            </div>

            {/* THÔNG TIN CHI TIẾT */}
            <div className="row mx-0 mt-4">
              <div className="col-lg-8 mb-4">
                <div className="p-4 bg-white shadow-sm h-100" style={{ borderRadius: "24px", border: "1px solid #e2e8f0" }}>
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                    <h5 className="font-weight-bold mb-0 text-dark">THÔNG TIN CHI TIẾT</h5>
                    <button 
                      className={`btn btn-sm px-4 font-weight-bold ${isEditing ? 'btn-success shadow' : 'btn-dark'}`}
                      style={{ borderRadius: "12px", transition: "0.3s" }}
                      onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    >
                      {isEditing ? "✓ XÁC NHẬN" : "✎ CHỈNH SỬA"}
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <p className="text-muted small font-weight-bold mb-1">HỌ VÀ TÊN</p>
                      <p className="font-weight-bold h3 text-dark mb-0">{patient.name}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <p className="text-muted small font-weight-bold mb-1 text-uppercase">Email</p>
                      {isEditing ? (
                        <input 
                          type="email" 
                          className="form-control custom-input" 
                          placeholder="Nhập email của bạn..." 
                          value={tempInfo.email} 
                          onChange={(e) => setTempInfo({...tempInfo, email: e.target.value})} 
                        />
                      ) : (
                        <p className="font-weight-bold text-secondary h5">{patient.email || "Chưa cập nhật"}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <p className="text-muted small font-weight-bold mb-1 text-uppercase">Số điện thoại</p>
                      {isEditing ? (
                        <input 
                          type="text" 
                          className="form-control custom-input" 
                          placeholder="Nhập số điện thoại..." 
                          value={tempInfo.phoneNumber} 
                          onChange={(e) => setTempInfo({...tempInfo, phoneNumber: e.target.value})} 
                        />
                      ) : (
                        <p className="font-weight-bold text-secondary h5">{patient.phoneNumber || "Chưa cập nhật"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4 mb-4 text-center">
                <div className="p-4 bg-white shadow-sm h-100" style={{ borderRadius: "24px", border: "1px solid #e2e8f0" }}>
                   <div className="avatar-wrapper mx-auto mb-3" onClick={() => fileInputRef.current.click()}>
                      <img src={patient.picture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="User" />
                      <div className="upload-overlay">📷</div>
                   </div>
                   <h4 className="font-weight-bold text-dark mb-1">{patient.name}</h4>
                   <p className="badge badge-light text-muted p-2">Bệnh nhân chính thức</p>
                   <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleAvatarChange} />
                </div>
              </div>
            </div>
            <div className="mt-5"><Footer /></div>
          </div>
        </div>
      </div>

      <style>{`
        .stat-card { transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: default; }
        .stat-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }
        .stat-icon { position: absolute; right: -10px; top: -10px; font-size: 80px; opacity: 0.15; }
        
        .custom-input { 
            border-radius: 12px !important; 
            border: 2px solid #e2e8f0 !important; 
            padding: 12px 15px !important; 
            transition: all 0.3s;
        }
        .custom-input:focus { 
            border-color: #fdbb2d !important; 
            box-shadow: 0 0 0 4px rgba(253, 187, 45, 0.1) !important; 
        }
        .custom-input::placeholder { color: #cbd5e1; font-style: italic; }

        .avatar-wrapper {
            width: 160px; height: 160px; border-radius: 50%; position: relative;
            cursor: pointer; border: 6px solid #f8fafc; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .avatar-wrapper img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
        .avatar-wrapper:hover img { filter: brightness(0.8); }
        .upload-overlay {
            position: absolute; bottom: 5px; right: 5px; background: #0f172a; color: #fff;
            width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center;
            justify-content: center; border: 3px solid #fff;
        }
      `}</style>
    </div>
  );
};

export default PaitentDashboard;              