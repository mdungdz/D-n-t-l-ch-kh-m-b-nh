import React, { useState } from "react";
import h_img_file from "../image/benhvien(12).png";

// Thêm { onSupportClick } vào đây để nhận lệnh từ Home.js
const Jumbo = ({ onSupportClick }) => {
  const h_img = h_img_file;
  
  const [isHover, setIsHover] = useState(false);

  return (
    <div style={{ margin: "0 0 60px 0", padding: 0, background: "#fff" }}>
      
      <div style={{ 
        position: "relative", 
        height: "750px",       
        width: "100%", 
        overflow: "hidden",
        backgroundColor: "#000"
      }}>
        
        <img 
          src={h_img} 
          alt="Hospital Overview" 
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
        />

        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)",
          zIndex: 1
        }}></div>

        <div style={{
          position: "absolute",
          top: "52%",           
          left: "5%",            
          transform: "translateY(-50%)",
          zIndex: 2,
          maxWidth: "800px"
        }}>
          <div style={{ 
            color: "#4ade80", 
            fontWeight: "800", 
            fontSize: "15px", 
            marginBottom: "25px", 
            letterSpacing: "5px",
            display: "flex",
            alignItems: "center",
            gap: "15px"
          }}>
            <span style={{ width: "50px", height: "2px", background: "#4ade80" }}></span>
            TIÊU CHUẨN QUỐC TẾ
          </div>
          
          <h1 style={{ 
            fontSize: "80px",    
            lineHeight: "1", 
            margin: "0 0 30px 0", 
            color: "#ffffff", 
            fontWeight: "900",
            textShadow: "0 10px 30px rgba(0,0,0,0.5)" 
          }}>
            BỆNH VIỆN <br/> 
            ĐA KHOA NMD
          </h1>
          
          <p style={{ 
            color: "rgba(255,255,255,0.95)", 
            fontSize: "22px", 
            fontWeight: "500", 
            margin: "0 0 50px 0", 
            lineHeight: "1.8",
            maxWidth: "600px"
          }}>
            Hệ thống y tế tiên phong kỹ thuật số. <br/> 
            Sứ mệnh chăm sóc tận tâm bằng cả trái tim.
          </p>
          
          <button 
            /* GIỮ NGUYÊN HOVER VÀ THÊM ONCLICK */
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onSupportClick} 
            style={{ 
              color: "#ffffff", 
              fontWeight: "800", 
              fontSize: "16px", 
              background: "#10b981", 
              padding: "22px 60px", 
              borderRadius: "50px", 
              border: "none",
              cursor: "pointer",
              transform: isHover ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)",
              boxShadow: isHover 
                ? "0 25px 50px rgba(16, 185, 129, 0.6)" 
                : "0 20px 40px rgba(16, 185, 129, 0.4)",
              transition: "all 0.3s ease"
            }}
          >
            HỖ TRỢ TRỰC TUYẾN 24/7
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jumbo;