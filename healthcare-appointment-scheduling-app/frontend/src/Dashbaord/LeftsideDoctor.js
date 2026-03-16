// LeftsideDoctor.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const LeftsideDoctor = () => {
  const location = useLocation();
  const path = location.pathname;

  // Lấy tên bác sĩ từ localStorage
  const doctorName = window.localStorage.getItem("doctorName") || "GS. TS. MẠNH DŨNG";

  const renderMenuItem = (icon, text, routePath) => {
    const isActive = path.includes(routePath);
    
    return (
      <div style={{
        backgroundColor: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
        color: isActive ? "#fff" : "#a1a1aa",
        borderLeft: isActive ? "4px solid #fdbb2d" : "4px solid transparent",
        padding: "16px 25px",
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: isActive ? "700" : "500",
        transition: "0.2s all ease",
        cursor: "pointer",
        width: "100%"
      }}>
        <span style={{ marginRight: "15px", fontSize: "18px", opacity: isActive ? 1 : 0.7 }}>{icon}</span>
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div style={{ 
        backgroundColor: "#0f172a", 
        // --- FIX CỨNG ĐỂ KHÔNG BỊ TRÔI ---
        height: "100%", 
        position: "sticky",
        top: 0,
        left: 0,
        // --------------------------------
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // Không cho sidebar tự hiện scroll riêng nếu không cần
        borderRight: "1px solid rgba(255,255,255,0.05)",
        zIndex: 1000
    }}>
      
      {/* Header Sidebar */}
      <div className="p-4 mb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ color: "#fdbb2d", fontSize: "10px", fontWeight: "900", letterSpacing: "1.5px", marginBottom: "8px", textTransform: "uppercase" }}>
            Hệ thống quản lý
        </div>
        <div style={{ color: "#fff", fontWeight: "800", fontSize: "17px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {doctorName}
        </div>
        <div className="mt-3" style={{ height: "3px", background: "#fdbb2d", width: "40%" }}></div>
      </div>

      {/* Menu điều hướng */}
      <nav className="d-flex flex-column" style={{ flex: 1 }}>
        <Link to="/doctor/dashboard" style={{ textDecoration: "none" }}>
          {renderMenuItem("📅", "Lịch trực hôm nay", "/doctor/dashboard")}
        </Link>

        <Link to="/doctor/patient-appointments" style={{ textDecoration: "none" }}>
          {renderMenuItem("👥", "Lịch hẹn bệnh nhân", "/doctor/patient-appointments")}
        </Link>

        <Link to="/doctor/personaldetails" style={{ textDecoration: "none" }}>
          {renderMenuItem("👤", "Hồ sơ cá nhân", "/doctor/personaldetails")}
        </Link>

        <Link to="/doctor/payment-history" style={{ textDecoration: "none" }}>
          {renderMenuItem("📜", "Lịch sử ca khám", "/doctor/payment-history")}
        </Link>

        {/* Phần Thoát hệ thống nằm dưới đáy */}
        <div style={{ marginTop: "auto" }}>
            <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.05)", margin: "15px 25px" }}></div>
            
            <Link to="/" onClick={() => window.localStorage.clear()} style={{ textDecoration: "none" }}>
                <div style={{ 
                    padding: "18px 25px", 
                    color: "#ef4444", 
                    fontSize: "13px", 
                    fontWeight: "bold", 
                    display: "flex", 
                    alignItems: "center", 
                    backgroundColor: "rgba(239, 68, 68, 0.05)",
                    transition: "0.2s all ease"
                }}>
                  <span style={{ marginRight: "15px", fontSize: "16px" }}>🚪</span> THOÁT HỆ THỐNG
                </div>
            </Link>
            
            <div className="p-3 text-center" style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "1px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                SYSTEM VERSION 4.0.1
            </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftsideDoctor;