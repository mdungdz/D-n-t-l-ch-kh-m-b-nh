import React from "react";
import { Link, useLocation } from "react-router-dom";

const LeftsidePatient = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderMenuItem = (icon, text, routePath, exact = false) => {
    const isActive = exact ? path === routePath : path.includes(routePath);
    
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
    <div className="d-flex flex-column shadow-lg" style={{ 
        backgroundColor: "#0f172a", 
        borderRight: "1px solid rgba(255,255,255,0.05)", 
        // --- PHẦN SỬA ĐỂ DÃN KỊCH BÊN TRÁI ---
        flex: "1 1 auto", 
        minHeight: "100%", 
        // ------------------------------------
        width: "100%",
        borderRadius: "0", 
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
    }}>
      
      {/* Phần Header */}
      <div className="p-4 mb-3 border-bottom" style={{ borderColor: "rgba(255,255,255,0.05) !important" }}>
        <div style={{ color: "#fdbb2d", fontSize: "10px", fontWeight: "900", letterSpacing: "1.5px", marginBottom: "8px", textTransform: "uppercase" }}>Hệ thống quản lý</div>
        <div style={{ color: "#fff", fontWeight: "800", fontSize: "17px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Hồ sơ bệnh nhân</div>
        <div className="mt-3" style={{ height: "3px", background: "#fdbb2d", width: "40%", borderRadius: "0" }}></div>
      </div>

      {/* Thêm flex: 1 ở đây để nav chiếm trọn không gian còn lại và đẩy phần dưới xuống */}
      <nav className="d-flex flex-column" style={{ flex: 1 }}>
        <Link to="/patient" style={{ textDecoration: "none" }}>
            {renderMenuItem("👤", "Thông tin cá nhân", "/patient", true)}
        </Link>
        
        {/* 2. Dịch vụ toàn diện - CHÈN NGAY TẠI ĐÂY */}
        <Link to="/patient/services" style={{ textDecoration: "none" }}>
            {renderMenuItem("✨", "Dịch vụ toàn diện", "/patient/services")}
        </Link>
        
        <Link to="/patient/searchdoctor" style={{ textDecoration: "none" }}>
            {renderMenuItem("🔍", "Tìm kiếm bác sĩ", "/patient/searchdoctor")}
        </Link>

        <Link to="/patient/searchpackage" style={{ textDecoration: "none" }}>
            {renderMenuItem("📦", "Tìm kiếm gói dịch vụ", "/patient/searchpackage")}
        </Link>
        
        <Link to="/patient/appointment-status" style={{ textDecoration: "none" }}>
            {renderMenuItem("📅", "Trạng thái lịch hẹn", "/patient/appointment-status")}
        </Link>
        
        <Link to="/patient/history" style={{ textDecoration: "none" }}>
            {renderMenuItem("📜", "Lịch sử khám bệnh", "/patient/history")}
        </Link>

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
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.05)"}
                >
                  <span style={{ marginRight: "15px", fontSize: "16px" }}>🚪</span> THOÁT HỆ THỐNG
                </div>
            </Link>
            
            <div className="p-3 text-center border-top" style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "1px", borderColor: "rgba(255,255,255,0.05) !important" }}>SYSTEM VERSION 4.0.1</div>
        </div>
      </nav>
    </div>
  );
};

export default LeftsidePatient;