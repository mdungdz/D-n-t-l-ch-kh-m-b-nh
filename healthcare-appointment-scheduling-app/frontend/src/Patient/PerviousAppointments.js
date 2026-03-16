import React, { useState, useEffect } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; 
import { Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { FaStar, FaUserMd, FaCalendarAlt, FaClock } from "react-icons/fa"; 

const PerviousAppointments = () => {
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const toggle = () => setModal(!modal);

  // 1. LẤY DỮ LIỆU (Đã sửa logic lọc trạng thái)
  const fetchHistoryFromDB = async () => {
    const userEmail = localStorage.getItem("userEmail"); 
    if (!userEmail) return;

    try {
      const res = await fetch("http://localhost:5000/appointments");
      const allData = await res.json();
      
      if (Array.isArray(allData)) {
        const myHistory = allData.filter(app => 
          app.bookedBy === userEmail && 
          // CHỐT: Phải có "Finished" thì ca khám xong mới không bị mất
          ["Confirmed", "Completed", "Finished"].includes(app.status)
        );
        setHistory(myHistory);
      }
    } catch (err) {
      console.error("Lỗi kết nối server:", err);
    }
  };

  useEffect(() => {
    fetchHistoryFromDB();
  }, []);

  const handleFeedbackOpen = (app) => {
    setSelectedApp(app);
    setRating(app.feedback?.stars || 0);
    setFeedback(app.feedback?.review || "");
    toggle();
  };

  // 2. GỬI ĐÁNH GIÁ (Dùng PUT và cập nhật đúng cấu trúc DB)
  const submitFeedback = async () => {
    if (rating === 0) { alert("Vui lòng chọn số sao!"); return; }

    try {
      const res = await fetch(`http://localhost:5000/appointments/${selectedApp._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedback: {
            given: true,
            stars: rating,
            review: feedback,
            updatedAt: new Date()
          }
        })
      });

      if (res.ok) {
        alert("Cảm ơn bạn đã đánh giá!");
        toggle();
        fetchHistoryFromDB(); 
      } else {
        alert("Server từ chối lưu dữ liệu!");
      }
    } catch (err) {
      console.error("Lỗi:", err);
      alert("Không kết nối được tới Server!");
    }
  };

  return (
    <div style={{ 
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#f4f7fe"
}}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <div 
  style={{ 
    width: "280px",
    minWidth: "280px",
    height: "calc(100vh - 78px)",
    position: "sticky",
    top: "78px",
    backgroundColor: "#0f172a"
  }}
>
  <Leftside />
</div>

       <div style={{ 
  flex: 1,
  height: "calc(100vh - 78px)",
  overflowY: "auto",
  borderLeft: "6px solid #fdbb2d",
  display: "flex",
  flexDirection: "column"
}}>
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                  <h2 className="font-weight-bold text-dark mb-2">LỊCH SỬ KHÁM BỆNH</h2>
                  <div style={{ height: "4px", width: "50px", background: "#fdbb2d", borderRadius: "10px" }}></div>
                </div>
                <Badge color="primary" className="px-3 py-2" style={{ borderRadius: "10px" }}>
                    TỔNG SỐ CA: {history.length}
                </Badge>
            </div>

          <div style={{ flex: 1 }}>
            <div className="row mx-0">
              {history.length > 0 ? history.map((app, index) => (
                <div key={index} className="col-xl-4 col-lg-6 mb-4">
                  <div className="appointment-card bg-white shadow-sm h-100 p-4" style={{ borderRadius: "24px" }}>
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div className="d-flex align-items-center">
                        <div className="mr-3 p-3 text-primary" style={{ backgroundColor: "#eff6ff", borderRadius: "16px" }}>
                          <FaUserMd size={22} />
                        </div>
                        <div>
                          <div className="font-weight-bold text-dark">{app.doctorName}</div>
                          <small className="text-muted">Bác sĩ chuyên khoa</small>
                        </div>
                      </div>
                      <Badge pill color="success" className="px-2 py-1">
                        {app.status === "Finished" ? "HOÀN THÀNH" : "ĐÃ XÁC NHẬN"}
                      </Badge>
                    </div>

                    <div className="row bg-light mx-0 mb-4 py-3" style={{ borderRadius: "16px" }}>
                      <div className="col-6 border-right text-center">
                        <small className="text-muted d-block">Ngày khám</small>
                        <span className="font-weight-bold" style={{ fontSize: "13px" }}><FaCalendarAlt className="mr-1 text-primary"/> {app.date}</span>
                      </div>
                      <div className="col-6 text-center">
                        <small className="text-muted d-block">Giờ khám</small>
                        <span className="font-weight-bold" style={{ fontSize: "13px" }}><FaClock className="mr-1 text-primary"/> {app.slotTime}</span>
                      </div>
                    </div>

                    <Button
                      block
                      className={`font-weight-bold py-3 ${app.feedback?.stars > 0 ? 'btn-rated' : 'btn-not-rated'}`}
                      style={{ borderRadius: "14px" }}
                      onClick={() => handleFeedbackOpen(app)}
                    >
                      {app.feedback?.stars > 0 ? `⭐ ${app.feedback.stars} SAO - XEM LẠI` : "⭐ ĐÁNH GIÁ DỊCH VỤ"}
                    </Button>
                  </div>
                </div>
              )) : (
                <div className="col-12 text-center py-5">
                   <FaCalendarAlt size={50} color="#cbd5e1" className="mb-3"/>
                   <h5 className="text-muted">Chưa có lịch sử khám bệnh.</h5>
                </div>
              )}
            </div>
          </div>
            <Footer />
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className="border-0">🌟 CẢM NHẬN CỦA BẠN</ModalHeader>
        <ModalBody className="pt-0 text-center">
          <p className="text-muted mb-4">Vui lòng để lại đánh giá để chúng tôi cải thiện dịch vụ.</p>
          <div className="mb-4 bg-light py-4" style={{ borderRadius: "20px" }}>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={35}
                color={(i + 1) <= (hover || rating) ? "#fdbb2d" : "#e2e8f0"}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(i + 1)}
                style={{ cursor: "pointer", margin: "0 4px" }}
              />
            ))}
          </div>
          <Input 
            type="textarea" 
            placeholder="Dịch vụ của bác sĩ thế nào?..." 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)} 
            style={{ borderRadius: "16px", minHeight: "120px" }}
          />
        </ModalBody>
        <ModalFooter className="border-0">
          <Button color="link" onClick={toggle}>ĐỂ SAU</Button>
          <Button color="warning" onClick={submitFeedback} style={{ borderRadius: "12px", background: "#fdbb2d", fontWeight: "bold" }}>GỬI ĐÁNH GIÁ</Button>
        </ModalFooter>
      </Modal>

      <style>{`
        .btn-rated { background-color: #ecfdf5 !important; color: #059669 !important; border: 1px solid #10b981 !important; }
        .btn-not-rated { background: #0f172a !important; color: #fff !important; }
      `}</style>
    </div>
  );
};

export default PerviousAppointments;