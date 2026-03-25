import React, { useState, useEffect } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; 
import { Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col } from "reactstrap";
import { FaStar, FaUserMd, FaCalendarAlt, FaClock, FaFileMedical, FaUserAlt } from "react-icons/fa"; 

const PerviousAppointments = () => {
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [detailModal, setDetailModal] = useState(false);
  const [viewingApp, setViewingApp] = useState(null);

  const toggle = () => setModal(!modal);
  const toggleDetail = () => setDetailModal(!detailModal);

  const fetchHistoryFromDB = async () => {
    const userEmail = localStorage.getItem("userEmail"); 
    if (!userEmail) return;

    try {
      const res = await fetch(`http://localhost:5000/appointments?bookedBy=${userEmail}`);
      const allData = await res.json();
      
      if (Array.isArray(allData)) {
        const myHistory = allData.filter(app => 
          ["Confirmed", "Completed", "Finished", "FINISHED"].includes(app.status)
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

  const handleViewDetail = (app) => {
    setViewingApp(app);
    toggleDetail();
  };

  const deleteAppointment = async (appId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy và xóa lịch hẹn này không?")) {
      try {
        const res = await fetch(`http://localhost:5000/appointments/${appId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (res.ok) {
          alert("Đã xóa lịch hẹn thành công!");
          setHistory(prev => prev.filter(item => item._id !== appId));
        } else {
          alert(data.message || "Không thể xóa lịch này!");
        }
      } catch (err) {
        alert("Lỗi kết nối server!");
      }
    }
  };

  const submitFeedback = async () => {
    if (rating === 0) { alert("Vui lòng chọn số sao!"); return; }

    try {
      const res = await fetch(`http://localhost:5000/appointments/${selectedApp._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedback: {
            given: true, stars: rating, review: feedback, updatedAt: new Date()
          }
        })
      });

      if (res.ok) {
        alert("Cảm ơn bạn đã đánh giá!");
        toggle();
        fetchHistoryFromDB(); 
      }
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%", backgroundColor: "#f4f7fe" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "280px", minWidth: "280px", height: "calc(100vh - 78px)", position: "sticky", top: "78px", backgroundColor: "#0f172a" }}>
          <Leftside />
        </div>

        <div style={{ flex: 1, height: "calc(100vh - 78px)", overflowY: "auto", borderLeft: "6px solid #fdbb2d", display: "flex", flexDirection: "column" }}>
            <div className="d-flex justify-content-between align-items-end mb-4 p-4">
                <div>
                  <h2 className="font-weight-bold text-dark mb-2">LỊCH SỬ KHÁM BỆNH</h2>
                  <div style={{ height: "4px", width: "50px", background: "#fdbb2d", borderRadius: "10px" }}></div>
                </div>
                <Badge color="primary" className="px-3 py-2" style={{ borderRadius: "10px" }}>
                    TỔNG SỐ CA: {history.length}
                </Badge>
            </div>

          <div style={{ flex: 1, padding: "0 20px" }}>
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
                        {["Finished", "FINISHED"].includes(app.status) ? "HOÀN THÀNH" : "ĐÃ XÁC NHẬN"}
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
                      className={`font-weight-bold py-3 mb-2 ${app.feedback?.stars > 0 ? 'btn-rated' : 'btn-not-rated'}`}
                      style={{ borderRadius: "14px" }}
                      onClick={() => handleFeedbackOpen(app)}
                    >
                      {app.feedback?.stars > 0 ? `⭐ ${app.feedback.stars} SAO - XEM LẠI` : "⭐ ĐÁNH GIÁ DỊCH VỤ"}
                    </Button>

                    <Button
                      block
                      color="info"
                      className="font-weight-bold py-3 text-white"
                      style={{ borderRadius: "14px", backgroundColor: "#0f172a", border: "none" }}
                      onClick={() => handleViewDetail(app)}
                    >
                      📄 XEM CHI TIẾT BỆNH ÁN
                    </Button>

                    {!["Finished", "FINISHED"].includes(app.status) && (
                      <Button
                        block
                        color="link"
                        className="text-danger mt-2"
                        style={{ fontSize: "13px", textDecoration: "none" }}
                        onClick={() => deleteAppointment(app._id)}
                      >
                        Hủy lịch hẹn này
                      </Button>
                    )}
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

      <Modal isOpen={detailModal} toggle={toggleDetail} size="lg" centered scrollable style={{ marginTop: "60px" }}  >
        <ModalHeader toggle={toggleDetail} className="border-bottom bg-white py-3">
           <div className="text-primary font-weight-bold text-uppercase d-flex align-items-center" style={{fontSize: "1.1rem"}}>
              <FaFileMedical className="mr-2"/> Chi tiết hồ sơ bệnh án
           </div>
        </ModalHeader>
        <ModalBody className="px-4 pb-4" style={{ backgroundColor: "#fcfcfc", paddingTop: "50px" }}>
          {viewingApp && viewingApp.medicalDetails ? (
            <>
              {/* PHẦN THÔNG TIN CÁ NHÂN (MỚI THÊM) */}
              <div className="mb-4 p-3 bg-white border rounded shadow-sm" style={{ borderLeft: "4px solid #fdbb2d" }}>
                <h6 className="text-dark font-weight-bold border-bottom pb-2 mb-3">
                  <FaUserAlt className="mr-2 text-warning"/> THÔNG TIN CÁ NHÂN
                </h6>
                <Row>
                  <Col md="6">
                    <p className="mb-2" style={{fontSize: "14px"}}><strong>Họ và tên:</strong> {viewingApp.patientName}</p>
                    <p className="mb-2" style={{fontSize: "14px"}}><strong>Ngày sinh:</strong> {viewingApp.medicalDetails.dob || "N/A"}</p>
                  </Col>
                  <Col md="6">
                    <p className="mb-2" style={{fontSize: "14px"}}><strong>Giới tính:</strong> {viewingApp.medicalDetails.gender || "N/A"}</p>
                    <p className="mb-2" style={{fontSize: "14px"}}><strong>Quê quán:</strong> {viewingApp.medicalDetails.hometown || "N/A"}</p>
                  </Col>
                </Row>
              </div>

              <div className="mb-4 p-3 bg-white border rounded shadow-sm">
                 <Row className="align-items-center">
                   <Col sm="8">
                      <h6 className="mb-1 font-weight-bold text-dark">Bác sĩ: {viewingApp.doctorName}</h6>
                      <small className="text-muted">Ngày khám: {viewingApp.date} | Giờ: {viewingApp.slotTime}</small>
                   </Col>
                   <Col sm="4" className="text-sm-right mt-2 mt-sm-0">
                      <Badge color="light" className="text-dark border p-2">Mã ca: {viewingApp._id.slice(-6).toUpperCase()}</Badge>
                   </Col>
                 </Row>
              </div>

              <Row>
                <Col md="6" className="mb-3">
                  <div className="h-100 p-3 bg-white border rounded shadow-sm">
                    <h6 className="text-primary font-weight-bold border-bottom pb-2 mb-3">1. Triệu chứng & Tiền sử</h6>
                    <p className="mb-2" style={{fontSize: "14px"}}><strong>Triệu chứng:</strong> <span className="text-secondary">{viewingApp.medicalDetails.symptoms || "N/A"}</span></p>
                    <p className="mb-0" style={{fontSize: "14px"}}><strong>Tiền sử:</strong> <span className="text-secondary">{viewingApp.medicalDetails.history || "N/A"}</span></p>
                  </div>
                </Col>
                <Col md="6" className="mb-3">
                  <div className="h-100 p-3 bg-white border rounded shadow-sm" style={{borderLeft: "4px solid #dc3545"}}>
                    <h6 className="text-danger font-weight-bold border-bottom pb-2 mb-3">2. Chỉ định cận lâm sàng</h6>
                    <div className="font-italic text-secondary" style={{fontSize: "14px"}}>
                      {viewingApp.medicalDetails.tests || "Không có chỉ định xét nghiệm."}
                    </div>
                  </div>
                </Col>
                <Col md="12" className="mb-3">
                  <div className="p-3 border rounded shadow-sm" style={{backgroundColor: "#f0fff4"}}>
                    <h6 className="text-success font-weight-bold border-bottom border-success pb-2 mb-3">3. Chẩn đoán & Đơn thuốc</h6>
                    <div className="mb-3">
                        <strong className="text-dark mr-2">Chẩn đoán:</strong> 
                        <span className="text-danger font-weight-bold">{viewingApp.medicalDetails.diagnosis || "Chưa cập nhật"}</span>
                    </div>
                    <div className="bg-white p-3 rounded border">
                        <small className="d-block font-weight-bold text-muted mb-2">ĐƠN THUỐC:</small>
                        <pre className="mb-0 text-dark" style={{whiteSpace: "pre-wrap", fontSize: "14px", fontFamily: "inherit", lineHeight: "1.5"}}>
                          {viewingApp.medicalDetails.prescription || "Trống"}
                        </pre>
                    </div>
                  </div>
                </Col>
                <Col md="12">
                  <div className="p-3 bg-white border rounded shadow-sm">
                    <h6 className="text-info font-weight-bold border-bottom pb-2 mb-2">4. Lời dặn</h6>
                    <p className="mb-0 font-italic text-secondary" style={{fontSize: "14px"}}>
                        {viewingApp.medicalDetails.advice || "Ăn uống điều độ và tái khám đúng hẹn."}
                    </p>
                  </div>
                </Col>
              </Row>

              <div className="mt-4 d-flex justify-content-between align-items-center bg-light p-3 rounded border">
                <span className="font-weight-bold text-muted">CHI PHÍ THANH TOÁN:</span>
                <span className="h5 mb-0 text-primary font-weight-bold">{new Intl.NumberFormat('vi-VN').format(viewingApp.fee || 0)} VNĐ</span>
              </div>
            </>
          ) : (
            <div className="text-center py-5 text-muted">Đang cập nhật dữ liệu...</div>
          )}
        </ModalBody>
        <ModalFooter className="border-0 bg-white">
          <Button color="primary" outline onClick={toggleDetail} className="font-weight-bold px-4">ĐÃ HIỂU</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className="border-0">🌟 CẢM NHẬN CỦA BẠN</ModalHeader>
        <ModalBody className="pt-0 text-center">
          <div className="mb-4 bg-light py-4" style={{ borderRadius: "20px" }}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={35} color={(i + 1) <= (hover || rating) ? "#fdbb2d" : "#e2e8f0"}
                onMouseEnter={() => setHover(i + 1)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i + 1)} style={{ cursor: "pointer", margin: "0 4px" }}
              />
            ))}
          </div>
          <Input type="textarea" placeholder="Dịch vụ của bác sĩ thế nào?..." value={feedback} onChange={(e) => setFeedback(e.target.value)} style={{ borderRadius: "16px", minHeight: "120px" }} />
        </ModalBody>
        <ModalFooter className="border-0">
          <Button color="link" onClick={toggle}>ĐỂ SAU</Button>
          <Button color="warning" onClick={submitFeedback} style={{ borderRadius: "12px", background: "#fdbb2d", fontWeight: "bold" }}>GỬI ĐÁNH GIÁ</Button>
        </ModalFooter>
      </Modal>

      <style>{`
        .btn-rated { background-color: #ecfdf5 !important; color: #059669 !important; border: 1px solid #10b981 !important; }
        .btn-not-rated { background: #0f172a !important; color: #fff !important; }
        .modal-body { max-height: 70vh; overflow-y: auto; }
      `}</style>
    </div>
  );
};

export default PerviousAppointments;