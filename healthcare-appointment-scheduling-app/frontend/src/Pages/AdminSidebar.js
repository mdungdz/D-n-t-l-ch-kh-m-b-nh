import React from "react";
import { useLocation } from "react-router-dom";

const AdminSidebar = ({ currentTab, setCurrentTab }) => {
  // Hàm render item giống hệt logic bạn đưa ra nhưng dùng cho State (Tab)
  const renderMenuItem = (icon, text, tabId) => {
    const isActive = currentTab === tabId;
    
    return (
      <div 
        onClick={() => setCurrentTab(tabId)}
        style={{
          backgroundColor: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
          color: isActive ? "#fff" : "#a1a1aa",
          borderLeft: isActive ? "4px solid #ef4444" : "4px solid transparent", // Đổi sang màu đỏ Admin
          padding: "16px 25px",
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          fontWeight: isActive ? "700" : "500",
          transition: "0.2s all ease",
          cursor: "pointer",
          width: "100%"
        }}
      >
        <span style={{ marginRight: "15px", fontSize: "18px", opacity: isActive ? 1 : 0.7 }}>{icon}</span>
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column shadow-lg" style={{ 
        backgroundColor: "#0f172a", 
        borderRight: "1px solid rgba(255,255,255,0.05)", 
        width: "280px", // Độ rộng cố định cho Sidebar
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        overflow: "hidden",
    }}>
      
      {/* Phần Header Admin */}
      <div className="p-4 mb-3 border-bottom" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div style={{ color: "#ef4444", fontSize: "10px", fontWeight: "900", letterSpacing: "1.5px", marginBottom: "8px", textTransform: "uppercase" }}>Hệ thống quản trị</div>
        <div style={{ color: "#fff", fontWeight: "800", fontSize: "17px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Admin Dashboard</div>
        <div className="mt-3" style={{ height: "3px", background: "#ef4444", width: "40%", borderRadius: "0" }}></div>
      </div>

      {/* Menu Navigation */}
      <nav className="d-flex flex-column" style={{ flex: 1 }}>
        {renderMenuItem("📊", "Bảng điều khiển", "dashboard")}
        {renderMenuItem("👨‍⚕️", "Quản lý Bác sĩ", "doctors")}
        {renderMenuItem("📅", "Quản lý Lịch hẹn", "appointments")}
        {renderMenuItem("👥", "Quản lý Bệnh nhân", "patients")}

        {/* Phần dưới cùng */}
        <div style={{ marginTop: "auto" }}>
            <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.05)", margin: "15px 25px" }}></div>
            
            <div 
                onClick={() => {
                    window.localStorage.clear();
                    window.location.href = "/";
                }}
                style={{ 
                    padding: "18px 25px", 
                    color: "#ef4444", 
                    fontSize: "13px", 
                    fontWeight: "bold", 
                    display: "flex", 
                    alignItems: "center", 
                    backgroundColor: "rgba(239, 68, 68, 0.05)",
                    transition: "0.2s all ease",
                    cursor: "pointer"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.05)"}
            >
              <span style={{ marginRight: "15px", fontSize: "16px" }}>🚪</span> THOÁT HỆ THỐNG
            </div>
            
            <div className="p-3 text-center border-top" style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "1px", borderColor: "rgba(255,255,255,0.05)" }}>SYSTEM VERSION 4.0.1</div>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;