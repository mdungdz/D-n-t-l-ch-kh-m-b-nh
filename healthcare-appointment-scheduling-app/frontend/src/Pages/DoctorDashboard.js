import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsideDoctor";
import Footer from "../Basic/Footer";
// Đã xóa Scrollbar thừa để hết báo lỗi Line 6:8

// IMPORT 4 COMPONENT CON
import TodaysSchedule from "../Doctor/TodaysSchedule";
import PatientAppointments from "../Doctor/PatientAppointments";
import DoctorProfileContent from "../Doctor/DoctorProfileContent";
import PaymentHistory from "../Doctor/PaymentHistory";

const DoctorDashboard = () => {
  const location = useLocation();
  
  // LẤY TÊN BÁC SĨ: Ưu tiên lấy từ LocalStorage để khớp với dữ liệu đăng nhập
  const doctorName =
    window.localStorage.getItem("doctorName") || 
    window.localStorage.getItem("name") || 
    "Nguyễn Mạnh Dũng";

  const path = location.pathname.toLowerCase();

  useEffect(() => {
    // Chỉ khởi tạo nếu localStorage trống hoàn toàn
    if (!localStorage.getItem("appointments")) {
      localStorage.setItem("appointments", JSON.stringify([]));
    }
  }, []);

  const renderMainContent = () => {
    // Truyền doctorName để các con biết lọc đúng dữ liệu
    if (path.includes("personal"))
      return <DoctorProfileContent doctorName={doctorName} />;
    
    if (path.includes("history") || path.includes("payment"))
      return <PaymentHistory doctorName={doctorName} />;
    
    if (path.includes("patient-appointments")) 
      return <PatientAppointments doctorName={doctorName} />;
    
    // Mặc định hiện lịch trực hôm nay - TRUYỀN TÊN CHÍNH XÁC XUỐNG ĐÂY
    return <TodaysSchedule doctorName={doctorName} />;
  };

  const getTitle = () => {
    if (path.includes("personal")) return "🏛️ HỒ SƠ CHUYÊN GIA";
    if (path.includes("patient-appointments")) return "👥 DANH SÁCH LỊCH HẸN";
    if (path.includes("history") || path.includes("payment"))
      return "📜 LỊCH SỬ CA KHÁM";
    return "🏥 QUẢN LÝ LỊCH TRỰC";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        width: "100%",
        backgroundColor: "#f8fafc",
      }}
    >
      <Navbar />
      <div style={{ display: "flex", flex: 1, height: "calc(100vh - 78px)" }}>
        <div
          style={{
            width: "280px",
            minWidth: "280px",
            backgroundColor: "#0f172a",
            height: "100%",
            overflowY: "hidden"
          }}
        >
          <Leftside />
        </div>
        <div
          style={{
            flex: 1,
            height: "100%",
            overflowY: "auto",
            borderLeft: "6px solid #fdbb2d",
          }}
        >
          <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4 p-4">
              <div>
                <h3 className="font-weight-bold text-dark mb-1 text-uppercase">
                  {getTitle()}
                </h3>
                <div
                  style={{
                    height: "5px",
                    width: "40px",
                    background: "#fdbb2d",
                    borderRadius: "10px",
                  }}
                ></div>
                {/* Dòng check tên bác sĩ - Bạn có thể xóa sau khi chạy được */}
                <small className="text-muted">Bác sĩ: <b>{doctorName}</b></small>
              </div>
              <div
                className="badge p-2 px-4 text-dark font-weight-bold shadow-sm"
                style={{ backgroundColor: "#fdbb2d" }}
              >
                BÁC SĨ
              </div>
            </div>
            
            <div style={{ width: "100%" }}>
              {renderMainContent()}
            </div>

            <div style={{ marginTop: "20px", width: "100%" }}>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;