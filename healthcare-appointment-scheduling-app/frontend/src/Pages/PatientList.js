import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Spinner, Collapse, Row, Col } from "reactstrap"; // Thêm Row, Col để chia cột thông tin
import axios from "axios";

const PatientList = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const [currentPatient, setCurrentPatient] = useState("");
  const [openDetailId, setOpenDetailId] = useState(null); // Trạng thái đóng mở chi tiết từng ca khám

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

  const finishedApps = allAppointments.filter(
    (app) => app.status && app.status.toLowerCase() === "finished"
  );

  const uniqueEmails = [...new Set(finishedApps.map((app) => app.bookedBy))];

  const toggle = () => {
    setModal(!modal);
    setOpenDetailId(null); // Reset khi đóng modal
  };

  const handleViewHistory = (email) => {
    const history = finishedApps.filter((app) => app.bookedBy === email);
    const pName = history[0]?.patientName || "Bệnh nhân";
    setSelectedHistory(history);
    setCurrentPatient(pName);
    toggle();
  };

  const toggleDetail = (id) => {
    setOpenDetailId(openDetailId === id ? null : id);
  };

  if (loading) return <div className="text-center p-5"><Spinner color="danger" /> Đang tải kho hồ sơ...</div>;

  return (
    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "20px", backgroundColor: "#fff" }}>
      <h5 className="font-weight-bold mb-4 text-uppercase text-primary">📂 Kho Hồ Sơ Bệnh Nhân Tổng hợp</h5>
      <div className="row">
        {uniqueEmails.length > 0 ? (
          uniqueEmails.map((email, index) => {
            const patientApps = finishedApps.filter(a => a.bookedBy === email);
            const name = patientApps[0].patientName;
            const visitCount = patientApps.length;

            return (
              <div className="col-md-4 mb-3" key={index}>
                <div className="border p-3 rounded shadow-sm hover-card" style={{ borderLeft: "5px solid #007bff", backgroundColor: "#f8f9fa" }}>
                  <h6 className="font-weight-bold mb-1 text-dark text-uppercase">{name}</h6>
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
        <ModalHeader toggle={toggle} className="bg-light font-weight-bold text-primary">
          📜 LỊCH SỬ KHÁM BỆNH: <span className="text-dark text-uppercase">{currentPatient}</span>
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "#fcfcfc" }}>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="bg-dark text-white">
                <tr className="small">
                  <th>Ngày khám</th>
                  <th>Bác sĩ / Gói khám</th>
                  <th>Phí khám</th>
                  <th className="text-center">Hồ sơ</th>
                </tr>
              </thead>
              <tbody>
                {selectedHistory.map((h, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{h.date} <br/><small className="text-muted">{h.slotTime}</small></td>
                      <td>
                        <div className="font-weight-bold">{h.doctorName}</div>
                        <span className={`badge ${h.type === 'package' ? 'badge-success' : 'badge-info'}`} style={{fontSize: '10px'}}>
                          {h.type === 'package' ? 'Gói khám' : 'Theo bác sĩ'}
                        </span>
                      </td>
                      <td className="text-danger font-weight-bold">
                        {h.fee?.toLocaleString() || "0"} VNĐ
                      </td>
                      <td className="text-center">
                        <button 
                           className={`btn btn-sm ${openDetailId === h._id ? 'btn-danger' : 'btn-outline-primary'}`}
                           onClick={() => toggleDetail(h._id)}
                        >
                           {openDetailId === h._id ? 'Đóng' : 'Xem chi tiết'}
                        </button>
                      </td>
                    </tr>
                    
                    {/* PHẦN HIỂN THỊ CHI TIẾT KHI BẤM NÚT */}
                    <tr>
                      <td colSpan="4" className="p-0 border-0">
                        <Collapse isOpen={openDetailId === h._id}>
                          <div className="p-3 m-2 rounded shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid #dee2e6" }}>
                            {h.medicalDetails ? (
                              <>
                                {/* PHẦN THÔNG TIN CÁ NHÂN MỚI THÊM */}
                                <div className="mb-3 p-2 border-bottom" style={{ backgroundColor: "#fff9f0", borderRadius: "8px" }}>
                                  <p className="mb-1 text-warning font-weight-bold small text-uppercase">👤 Thông tin bệnh nhân:</p>
                                  <Row className="mx-0">
                                    <Col md="6" className="px-1">
                                      <div className="small"><b>Họ tên:</b> {h.patientName}</div>
                                      <div className="small"><b>Ngày sinh:</b> {h.medicalDetails.dob || "N/A"}</div>
                                    </Col>
                                    <Col md="6" className="px-1">
                                      <div className="small"><b>Giới tính:</b> {h.medicalDetails.gender || "N/A"}</div>
                                      <div className="small"><b>Quê quán:</b> {h.medicalDetails.hometown || "N/A"}</div>
                                    </Col>
                                  </Row>
                                </div>

                                <div className="row">
                                  <div className="col-md-6 border-right">
                                    <p className="mb-1 text-primary font-weight-bold small">1. Triệu chứng & Tiền sử:</p>
                                    <div className="bg-light p-2 rounded mb-2 small" style={{minHeight: '40px'}}>
                                      <b>Triệu chứng:</b> {h.medicalDetails.symptoms || "N/A"}<br/>
                                      <b>Tiền sử:</b> {h.medicalDetails.history || "N/A"}
                                    </div>

                                    <p className="mb-1 text-danger font-weight-bold small">2. Chỉ định cận lâm sàng (MỚI):</p>
                                    <div className="bg-light p-2 rounded mb-2 small text-dark font-italic" style={{borderLeft: '3px solid red'}}>
                                      {h.medicalDetails.tests || "Không có chỉ định"}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <p className="mb-1 text-success font-weight-bold small">3. Chẩn đoán & Điều trị:</p>
                                    <div className="p-2 rounded mb-2 small" style={{backgroundColor: "#e8f5e9"}}>
                                      <b>Chẩn đoán:</b> <span className="text-danger font-weight-bold">{h.medicalDetails.diagnosis || "Chưa xác định"}</span><br/>
                                      <b>Đơn thuốc:</b> <pre className="mt-1" style={{whiteSpace: 'pre-wrap', fontSize: '11px'}}>{h.medicalDetails.prescription || "Không có đơn thuốc"}</pre>
                                    </div>
                                    <p className="mb-1 text-info font-weight-bold small">4. Lời dặn:</p>
                                    <div className="bg-light p-2 rounded small font-italic">
                                      {h.medicalDetails.advice || "Không có ghi chú"}
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="text-center py-3 text-muted">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                Ca khám này chỉ được đặt lịch, chưa có hồ sơ bệnh án điện tử.
                              </div>
                            )}
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </ModalBody>
      </Modal>

      <style>{`
        .hover-card:hover { transform: translateY(-3px); transition: 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important; }
        .table td { vertical-align: middle; }
      `}</style>
    </div>
  );
};

export default PatientList;