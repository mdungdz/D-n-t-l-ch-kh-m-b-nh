import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import axios from "axios";

const PatientList = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const [currentPatient, setCurrentPatient] = useState("");

  // 1. LẤY DỮ LIỆU THỰC TẾ TỪ DATABASE
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/appointments");
        setAllAppointments(res.data);
      } catch (err) {
        console.error("Lỗi khi kết nối Database:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // 2. LỌC: Chỉ lấy những ca có trạng thái "Finished" (không phân biệt hoa thường)
  const finishedApps = allAppointments.filter(
    (app) => app.status && app.status.toLowerCase() === "finished"
  );

  // Gom nhóm: lấy danh sách bệnh nhân duy nhất dựa trên Email (chính xác hơn tên)
  const uniqueEmails = [...new Set(finishedApps.map((app) => app.bookedBy))];

  const toggle = () => setModal(!modal);

  // Hàm mở hồ sơ chi tiết
  const handleViewHistory = (email) => {
    const history = finishedApps.filter((app) => app.bookedBy === email);
    const pName = history[0]?.patientName || "Bệnh nhân";
    setSelectedHistory(history);
    setCurrentPatient(pName);
    toggle();
  };

  if (loading) return <div className="text-center p-5"><Spinner color="danger" /> Đang tải kho hồ sơ...</div>;

  return (
    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "20px", backgroundColor: "#fff" }}>
      <h5 className="font-weight-bold mb-4 text-uppercase text-primary">📂 Kho Hồ Sơ Bệnh Nhân Dùng Chung</h5>
      <div className="row">
        {uniqueEmails.length > 0 ? (
          uniqueEmails.map((email, index) => {
            const patientApps = finishedApps.filter(a => a.bookedBy === email);
            const name = patientApps[0].patientName;
            const visitCount = patientApps.length;

            return (
              <div className="col-md-4 mb-3" key={index}>
                <div className="border p-3 rounded shadow-sm hover-card" style={{ borderLeft: "5px solid #007bff", backgroundColor: "#f8f9fa" }}>
                  <h6 className="font-weight-bold mb-1 text-dark">{name}</h6>
                  <p className="small text-muted mb-0">Email: {email}</p>
                  <p className="small text-info mb-2">Số lần khám: <b>{visitCount}</b></p>
                  <button 
                    className="btn btn-sm btn-primary btn-block rounded-pill font-weight-bold"
                    onClick={() => handleViewHistory(email)}
                  >
                    Xem chi tiết bệnh sử
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center py-5">
            <i className="fa fa-folder-open fa-3x text-muted mb-3"></i>
            <p className="text-muted">Chưa có hồ sơ nào được hoàn thành.</p>
          </div>
        )}
      </div>

      {/* MODAL CHI TIẾT LỊCH SỬ KHÁM */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle} className="bg-light font-weight-bold">
          📜 LỊCH SỬ KHÁM BỆNH: {currentPatient}
        </ModalHeader>
        <ModalBody>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="bg-dark text-white">
                <tr className="small">
                  <th>Ngày khám</th>
                  <th>Bác sĩ / Gói khám</th>
                  <th>Loại hình</th>
                  <th>Chi phí</th>
                </tr>
              </thead>
              <tbody>
                {selectedHistory.map((h, i) => (
                  <tr key={i}>
                    <td>{h.date} <br/><small className="text-muted">{h.slotTime}</small></td>
                    <td className="font-weight-bold">{h.doctorName}</td>
                    <td>
                        <span className={`badge ${h.type === 'package' ? 'badge-success' : 'badge-info'}`}>
                            {h.type === 'package' ? 'Gói khám' : 'Theo bác sĩ'}
                        </span>
                    </td>
                    <td className="text-danger font-weight-bold">
                      {h.fee?.toLocaleString() || "0"} VNĐ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModalBody>
      </Modal>

      <style>{`
        .hover-card:hover { transform: translateY(-3px); transition: 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
};

export default PatientList;