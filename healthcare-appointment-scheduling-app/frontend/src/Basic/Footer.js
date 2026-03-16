import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaComments,
  FaFacebook,
  FaLinkedin,
  FaPaperPlane,
  FaTimes,
  FaRobot,
} from "react-icons/fa";

const Footer = ({ isChatOpen, setIsChatOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  
  // State mới cho Modal Admin
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  const suggestions = [
    "Tôi muốn đặt lịch khám gấp",
    "Bác sĩ có lịch khám hôm nay không?",
    "Chi phí khám tổng quát là bao nhiêu?",
    "Hướng dẫn tôi cách xem lịch sử khám",
  ];

  // Logic kiểm tra mật khẩu
  const checkAdminPass = () => {
    if (adminPass === "admin123") {
      window.location.href = "/admin/dashboard";
    } else {
      alert("Sai mã truy cập!");
      setAdminPass("");
    }
  };

  const handleSendMessage = async (text) => {
    const message = text || inputValue;
    if (!message) return;
    setChatMessage("Đang kết nối bác sĩ AI...");
    setInputValue("");
    try {
      const response = await fetch("http://localhost:5000/api/ai/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: message }),
      });
      const data = await response.json();
      if (data.advice) {
        setChatMessage(data.advice);
      } else {
        setChatMessage("Bác sĩ AI đang bận, thử lại sau nhé!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setChatMessage("Lỗi kết nối Server! M đã chạy 'node server.js' ở cổng 5000 chưa?");
    }
  };

  return (
    <footer
      className="bg-dark text-white pt-3 pb-2" 
      style={{ borderTop: "5px solid #007bff", position: "relative" }}
    >
      <div className="container ">
        <div className="row text-center text-md-left">
          <div className="col-md-4 mt-2">
            <h5 className="text-uppercase mb-3 font-weight-bold text-primary" style={{ fontSize: "1.1rem" }}>
              Hệ Thống Y Tế NMD
            </h5>
            <p
              style={{
                lineHeight: "1.6",
                fontSize: "0.9rem",
                color: "#f8f9fa",
                marginBottom: "10px"
              }}
            >
              Tiên phong trong việc ứng dụng công nghệ số vào quản lý y tế.
              Chúng tôi cam kết mang lại trải nghiệm khám chữa bệnh nhanh chóng
              và tận tâm.
            </p>
          </div>

          <div className="col-md-4 mt-2 text-md-left">
            <h5 className="text-uppercase mb-3 font-weight-bold text-primary" style={{ fontSize: "1.1rem" }}>
              Liên Hệ
            </h5>
            <p className="mb-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none footer-link"
                style={{ color: "#f8f9fa", fontSize: "0.9rem" }}
              >
                <FaMapMarkerAlt className="mr-2 text-primary" /> Huyện Sóc Sơn,
                TP. Hà Nội
              </a>
            </p>
            <p className="mb-2">
              <a
                href="mailto:contact@nmd-hospital.vn"
                className="text-decoration-none footer-link"
                style={{ color: "#f8f9fa", fontSize: "0.9rem" }}
              >
                <FaEnvelope className="mr-2 text-primary" /> Email:
                contact@nmd-hospital.vn
              </a>
            </p>
            <p className="mb-2">
              <a
                href="tel:19006789"
                className="text-decoration-none footer-link font-weight-bold"
                style={{ color: "#f8f9fa", fontSize: "0.9rem" }}
              >
                <FaPhoneAlt className="mr-2 text-primary" /> Hotline: 1900 6789
              </a>
            </p>
          </div>

          <div className="col-md-4 mt-2 text-center">
            <h5 className="text-uppercase mb-3 font-weight-bold text-primary" style={{ fontSize: "1.1rem" }}>
              Kết Nối
            </h5>
            <div className="d-flex justify-content-center mt-2">
              <a href="#!" className="mx-3 text-white social-icon-hover">
                <FaFacebook size={22} />
              </a>
              <span
                className="mx-3 text-white social-icon-hover font-weight-bold"
                style={{ cursor: "pointer", fontSize: "0.9rem" }}
              >
                Zalo
              </span>
              <a href="#!" className="mx-3 text-white social-icon-hover">
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-2" style={{ backgroundColor: "#495057" }} />
        
        <div className="text-center pb-1">
          <p className="small mb-0" style={{ color: "#ced4da", fontSize: "0.8rem" }}>
            © 2026 Bản quyền thuộc về{" "}
            <strong 
              className="text-primary" 
              onClick={() => setShowAdminModal(true)} 
              style={{ cursor: "pointer" }}
              title="Quản trị viên"
            >
              GS.TS Nguyễn Mạnh Dũng
            </strong>
          </p>
        </div>
      </div>

      {isChatOpen && (
        <div className="chat-window-ai shadow-lg animate-slide-up">
          <div className="chat-header-ai bg-primary text-white">
            <span>
              <FaRobot className="mr-2" /> Trợ lý AI NMD
            </span>
            <FaTimes
              onClick={() => {
                setIsChatOpen(false);
                setChatMessage("");
              }}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="chat-body-ai">
            {!chatMessage ? (
              <>
                <p
                  className="small text-muted mb-3"
                  style={{ fontWeight: "500" }}
                >
                  Chào bạn! Bạn cần trợ giúp gì ạ?
                </p>
                <div className="suggestion-box">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      className="suggestion-btn"
                      onClick={() => handleSendMessage(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="ai-response-box animate-fade-in">
                <p className="ai-text">{chatMessage}</p>
                <button
                  className="btn btn-sm btn-link p-0 text-primary"
                  style={{ fontSize: "12px" }}
                  onClick={() => setChatMessage("")}
                >
                  Quay lại câu hỏi
                </button>
              </div>
            )}

            <div className="chat-input-box mt-3">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <FaPaperPlane
                className="send-btn"
                onClick={() => handleSendMessage()}
              />
            </div>
          </div>
        </div>
      )}

      <div
        className={`nmd-main-bubble ${isChatOpen ? "is-active" : "pulse-animation"}`}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? <FaTimes size={25} /> : <FaComments size={28} />}
        {!isChatOpen && <span className="nmd-tooltip">Hỗ trợ AI 24/7</span>}
      </div>

      {/* MODAL NHẬP MÃ ADMIN BẢO MẬT */}
      {showAdminModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 20000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="bg-white p-4 rounded shadow-lg" style={{ width: '300px' }}>
            <h6 className="text-dark mb-3 text-center">Xác thực Quản trị viên</h6>
            <input 
              type="password" 
              className="form-control mb-3"
              placeholder="Nhập mã..."
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAdminPass()}
              autoFocus
            />
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary btn-sm mr-2" onClick={() => { setShowAdminModal(false); setAdminPass(""); }}>Hủy</button>
              <button className="btn btn-primary btn-sm" onClick={checkAdminPass}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .footer-link:hover { color: #007bff !important; transform: translateX(5px); transition: 0.3s; }
        .social-icon-hover:hover { color: #007bff !important; transform: scale(1.2); transition: 0.3s; }
        .chat-window-ai { position: fixed; bottom: 100px; right: 30px; width: 320px; background: white; border-radius: 15px; z-index: 9999; overflow: hidden; border: 1px solid #007bff; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .chat-header-ai { padding: 15px; display: flex; justify-content: space-between; font-weight: bold; align-items: center; }
        .chat-body-ai { padding: 15px; background: #fdfdfd; }
        .suggestion-btn { display: block; width: 100%; text-align: left; background: #fff; border: 1px solid #007bff; color: #007bff; padding: 8px 12px; margin-bottom: 8px; border-radius: 20px; font-size: 12px; transition: 0.3s; cursor: pointer; }
        .suggestion-btn:hover { background: #007bff; color: white; }
        .ai-response-box { background: #e7f3ff; padding: 12px; border-radius: 10px; border-left: 4px solid #007bff; margin-bottom: 10px; }
        .ai-text { font-size: 13px; color: #333; margin-bottom: 5px; line-height: 1.5; }
        .chat-input-box { display: flex; align-items: center; background: #eee; padding: 8px 15px; border-radius: 25px; }
        .chat-input-box input { border: none; background: transparent; flex: 1; outline: none; font-size: 13px; color: #333; }
        .send-btn { color: #007bff; cursor: pointer; transition: 0.2s; }
        .send-btn:hover { transform: scale(1.2); }
        .nmd-main-bubble { position: fixed; bottom: 30px; right: 30px; width: 65px; height: 65px; background: #007bff; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10000; box-shadow: 0 5px 20px rgba(0,123,255,0.4); transition: 0.3s; }
        .nmd-main-bubble.is-active { background: #dc3545; transform: rotate(90deg); }
        .pulse-animation { animation: nmd-pulse 2s infinite; }
        @keyframes nmd-pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(0, 123, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
        }
        .animate-slide-up { animation: slideUp 0.3s ease-out; }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .nmd-tooltip { position: absolute; right: 80px; background: #333; color: white; padding: 5px 12px; border-radius: 5px; font-size: 12px; white-space: nowrap; opacity: 0; transition: 0.3s; pointer-events: none; }
        .nmd-main-bubble:hover .nmd-tooltip { opacity: 1; }
      `}</style>
    </footer>
  );
};

export default Footer;