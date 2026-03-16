import React, { useState, useEffect } from "react";
import Scrollbar from "react-scrollbars-custom";
import { Modal } from "react-bootstrap";

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const loadHistoryData = async () => {
      const idCuaBacSi = localStorage.getItem("doctorId");
      if (!idCuaBacSi) return;

      try {
        const res = await fetch("http://localhost:5000/doctors/appointment-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doctorId: idCuaBacSi })
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setHistory(data);
        }
      } catch (err) {
        console.error("Lỗi lấy lịch sử:", err);
      }
    };

    loadHistoryData();
  }, []);

  const formatVNTime = (dateStr) => {
    if(!dateStr) return "";
    const parts = dateStr.split("-");
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateStr;
  };

  return (
    <div style={{ height: "82vh" }}>
      <Scrollbar noScrollX>
        <table className="table table-hover border bg-white shadow-sm">
          <thead className="bg-dark text-white">
            <tr>
              <th className="py-3 px-4 border-0">Ngày & Giờ</th>
              <th className="py-3 border-0">Bệnh Nhân</th>
              <th className="py-3 border-0 text-center">Đánh giá</th>
              <th className="py-3 border-0 text-center">Phản hồi</th>
              <th className="py-3 border-0 text-center">Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((app, i) => (
                <tr key={app._id || i}>
                  <td className="py-3 px-4">
                    <span className="font-weight-bold">{formatVNTime(app.date)}</span>
                    <br/>
                    <small className="text-muted">{app.slotTime}</small>
                  </td>
                  <td className="py-3 font-weight-bold text-primary text-uppercase">
                    {app.patientName}
                  </td>
                  {/* CHỐT: Dùng stars theo đúng MongoDB Compass */}
                  <td className="py-3 text-center text-warning">
                    {app.feedback?.stars > 0 ? (
                      "⭐".repeat(app.feedback.stars)
                    ) : (
                      <small className="text-muted italic">Chưa đánh giá</small>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    <button 
                      className="btn btn-sm btn-outline-dark shadow-sm" 
                      onClick={() => { setSelected(app); setShow(true); }}
                      style={{ borderRadius: "8px" }}
                    >
                      Chi tiết
                    </button>
                  </td>
                  <td className="py-3 text-center">
                    <span className="badge badge-success px-3 py-2" style={{ borderRadius: "12px", fontSize: "0.75rem" }}>
                      HOÀN THÀNH
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center py-5 text-muted">Đang tải dữ liệu...</td></tr>
            )}
          </tbody>
        </table>
      </Scrollbar>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white border-0">
          <Modal.Title className="h6">PHẢN HỒI BỆNH NHÂN</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5 text-center">
          {/* CHỐT: Dùng stars trong Modal */}
          <div className="mb-3 text-warning" style={{ fontSize: "1.5rem" }}>
              {selected?.feedback?.stars > 0 ? "⭐".repeat(selected.feedback.stars) : <span className="text-muted h6">Chưa có đánh giá</span>}
          </div>
          <h5 className="font-weight-bold text-uppercase">{selected?.patientName}</h5>
          
          {/* CHỐT: Dùng review theo đúng MongoDB Compass */}
          <p className="text-dark font-italic mt-3" style={{ fontSize: "1.1rem", backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "10px" }}>
            {selected?.feedback?.review ? `"${selected.feedback.review}"` : "Bệnh nhân hiện chưa để lại ý kiến đóng góp."}
          </p>
          
          <hr/>
          <small className="text-muted">
            Khám ngày: {formatVNTime(selected?.date)} lúc {selected?.slotTime}
          </small>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaymentHistory;