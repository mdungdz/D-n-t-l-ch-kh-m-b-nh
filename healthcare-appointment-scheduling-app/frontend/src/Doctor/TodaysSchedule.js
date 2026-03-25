import React, { useState, useEffect } from "react";


const TodaysSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); 
  const [medicalRecordApp, setMedicalRecordApp] = useState(null); 


  // --- QUẢN LÝ DỮ LIỆU NHẬP TRÊN PHIẾU KHÁM ---
  const [examData, setExamData] = useState({});

  const handleUpdateExamField = (appointmentId, field, value) => {
    setExamData(prev => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        [field]: value
      }
    }));
  };

  // --- PHẦN THÊM MỚI: HÀM LƯU PHIẾU KHÁM VÀO DATABASE ---
  const handleSaveMedicalRecord = async (appId) => {
    // SỬA 1: Đảm bảo dataToSave luôn là object để không lỗi crash khi bác sĩ chưa nhập gì
    const dataToSave = examData[appId] || {}; 
    
    // Kiểm tra nếu chưa nhập chẩn đoán thì nhắc nhở
    if (!dataToSave.diagnosis || dataToSave.diagnosis.trim() === "") {
      alert("Bác sĩ vui lòng nhập Chẩn đoán trước khi lưu nhé!");
      return;
    }

    const currentService = (medicalRecordApp.selectedServices && medicalRecordApp.selectedServices.length > 0)
    ? medicalRecordApp.selectedServices[0].name 
    : (medicalRecordApp.serviceName || "Khám nội tổng quát");

    try {
      const res = await fetch("http://localhost:5000/appointments/save-medical-record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: appId,
          serviceName: currentService,
          patientName: medicalRecordApp.patientName,
          // SỬA 2: Gán giá trị mặc định cho các trường hành chính nếu bác sĩ không nhập
          gender: dataToSave.gender || "Nam", 
          dob: dataToSave.dob || "",
          hometown: dataToSave.hometown || "",
          ...dataToSave 
        })
      });

      const result = await res.json();
      if (result.success) {
        alert("Đã lưu phiếu khám thành công!");
        setMedicalRecordApp(null); 
        loadData(); 
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (err) {
      console.error("Lỗi lưu DB:", err);
      alert("Không thể kết nối Server để lưu phiếu!");
    }
  };

  // 1. Hàm tải dữ liệu lịch trực (Lấy dữ liệu thật từ DB)
  const loadData = async () => {
    const idCuaBacSi = localStorage.getItem("doctorId");
    if (!idCuaBacSi) return;

    try {
      const res = await fetch("http://localhost:5000/doctors/todays-appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId: idCuaBacSi })
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        const sorted = data.sort((a, b) => (a.slotTime || "").localeCompare(b.slotTime || ""));
        setAppointments(sorted.map((app, index) => ({ ...app, stt: index + 1 })));
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Lỗi kết nối Server:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. Hàm xử lý khi nhấn nút KHÁM (GIỮ NGUYÊN GỐC CỦA DŨNG)
  const handleFinishExam = async (app) => {
    const xacNhan = window.confirm(`Xác nhận hoàn thành ca khám cho: ${app.patientName}?`);
    if (xacNhan) {
      try {
        const res = await fetch("http://localhost:5000/doctors/finish-appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentId: app._id })
        });
        const result = await res.json();
        if (result.success) {
          alert("Ca khám đã được lưu vào lịch sử!");
          setAppointments(prev => prev.filter(item => item._id !== app._id));
        }
      } catch (err) {
        console.error("Lỗi khi kết thúc ca khám:", err);
        alert("Không thể cập nhật trạng thái, bác kiểm tra lại server nhé!");
      }
    }
  };

  const formatVNTime = (dateStr) => {
    if(!dateStr) return "";
    const parts = dateStr.split("-");
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateStr;
  };

  return (
    <div className="animate__animated animate__fadeIn" style={{ marginTop: "10px", minHeight: "calc(100vh - 100px)", width: "100%" }}>
      <div className="card border-0 shadow-sm" style={{ borderRadius: "24px", overflow: "hidden", width: "100%" }}>
        <div className="px-3 py-2 bg-white border-bottom d-flex justify-content-between align-items-center">
            <h5 className="font-weight-bold mb-0 text-dark">📋 LỊCH TRỰC HÔM NAY </h5>
            <span className="badge badge-primary p-2">Ngày: {formatVNTime(new Date().toISOString().split('T')[0])}</span>
        </div>
        
        <div className="table-responsive" style={{ width: "100%" }}>
          <table className="table table-hover mb-0">
            <thead style={{ backgroundColor: "#0f172a", color: "#ffffff" }}>
              <tr>
                <th className="py-2 px-3 border-0">STT</th>
                <th className="py-4 border-0">GIỜ</th>
                <th className="py-4 border-0">BỆNH NHÂN</th>
                <th className="py-4 border-0">DỊCH VỤ</th>
                <th className="py-4 border-0 text-center">LÝ DO</th>
                <th className="py-4 border-0 text-center">PHIẾU KHÁM</th>
                <th className="py-4 border-0 text-center">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((app) => (
                  <tr key={app._id}>
                    <td className="py-4 px-4 font-weight-bold text-primary">#{app.stt}</td>
                    <td className="py-4 font-weight-bold">{app.slotTime}</td>
                    <td className="py-4 font-weight-bold text-uppercase">{app.patientName}</td>
                    <td className="py-4 font-weight-bold text-success">
                      {(app.selectedServices && app.selectedServices.length > 0)
                        ? app.selectedServices[0].name 
                        : (app.serviceName || "Khám nội tổng quát")}
                    </td>
                    
                    <td className="py-4 text-center">
                        <i className="fas fa-comment-dots text-info" style={{ cursor: "pointer", fontSize: "20px" }}
                           onClick={() => setSelectedNote(app.note || app.description || "Không có ghi chú")}></i>
                    </td>

                    <td className="py-4 text-center">
                        <i className="fas fa-file-medical text-danger" style={{ cursor: "pointer", fontSize: "22px" }}
                           onClick={() => setMedicalRecordApp(app)}></i>
                    </td>

                    <td className="py-4 text-center">
                      <button onClick={() => handleFinishExam(app)} className="btn btn-success btn-sm px-4 font-weight-bold" style={{ borderRadius: "10px" }}>
                        KHÁM
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="text-center py-5 text-muted"><h5>Hôm nay chưa có ca khám nào! ☕</h5></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedNote && (
        <div className="modal-custom-overlay" onClick={() => setSelectedNote(null)}>
          <div className="modal-mini shadow-lg" onClick={e => e.stopPropagation()}>
            <h6 className="font-weight-bold border-bottom pb-2 mb-3">💬 Lý do khám</h6>
            <p className="text-dark bg-light p-3 rounded">{selectedNote}</p>
            <div className="text-right"><button className="btn btn-dark btn-sm px-4" onClick={() => setSelectedNote(null)}>Đóng</button></div>
          </div>
        </div>
      )}

      {medicalRecordApp && (
        <div className="modal-custom-overlay">
          <div className="modal-giant animate__animated animate__slideInUp" onClick={e => e.stopPropagation()}>
            <div className="modal-giant-header d-flex justify-content-between align-items-center">
              <h4 className="m-0 font-weight-bold"><i className="fas fa-file-prescription mr-2"></i> PHIẾU KHÁM BỆNH CHI TIẾT</h4>
              <button className="close-giant-btn" onClick={() => setMedicalRecordApp(null)}>&times;</button>
            </div>
            
            <div className="modal-giant-body">
              <div className="row mb-4 p-3 rounded shadow-sm" style={{backgroundColor: "#f0f9ff"}}>
                <div className="col-md-12 mb-2"><h6 className="font-weight-bold text-primary">I. THÔNG TIN HÀNH CHÍNH</h6></div>
                <div className="col-md-4 mb-2">
                    <label className="small font-weight-bold">Họ tên bệnh nhân:</label>
                    <input className="form-control form-control-sm text-uppercase font-weight-bold" value={medicalRecordApp.patientName} readOnly />
                </div>
                <div className="col-md-2 mb-2">
                    <label className="small font-weight-bold">Giới tính:</label>
                    <select className="form-control form-control-sm" 
                      value={examData[medicalRecordApp._id]?.gender || "Nam"} 
                      onChange={(e) => handleUpdateExamField(medicalRecordApp._id, 'gender', e.target.value)}>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
                <div className="col-md-3 mb-2">
                    <label className="small font-weight-bold">Ngày sinh:</label>
                    <input type="date" className="form-control form-control-sm" 
                      value={examData[medicalRecordApp._id]?.dob || ""} 
                      onChange={(e) => handleUpdateExamField(medicalRecordApp._id, 'dob', e.target.value)} />
                </div>
                <div className="col-md-3 mb-2">
                    <label className="small font-weight-bold">Quê quán:</label>
                    <input className="form-control form-control-sm" placeholder="Địa chỉ thường trú..." 
                      value={examData[medicalRecordApp._id]?.hometown || ""} 
                      onChange={(e) => handleUpdateExamField(medicalRecordApp._id, 'hometown', e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label className="small font-weight-bold">Giờ khám:</label>
                    <input className="form-control form-control-sm" value={medicalRecordApp.slotTime} readOnly />
                </div>
                <div className="col-md-8">
                  <label className="small font-weight-bold">Dịch vụ đăng ký:</label>
                  <input 
                    className="form-control form-control-sm font-weight-bold text-primary" 
                    value={
                      (medicalRecordApp.selectedServices && medicalRecordApp.selectedServices.length > 0)
                        ? medicalRecordApp.selectedServices[0].name
                        : (medicalRecordApp.serviceName || "Khám nội tổng quát")
                    } 
                    readOnly 
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12"><h6 className="font-weight-bold text-primary">II. NỘI DUNG CHUYÊN MÔN</h6></div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold small">1. Triệu chứng lâm sàng:</label>
                  <textarea className="form-control" rows="3" placeholder="Ghi nhận các triệu chứng..."
                    value={examData[medicalRecordApp._id]?.symptoms || ""} 
                    onChange={(e) => handleUpdateExamField(medicalRecordApp._id, 'symptoms', e.target.value)}></textarea>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="font-weight-bold small">2. Tiền sử bệnh lý:</label>
                  <textarea className="form-control" rows="3" placeholder="Các bệnh mãn tính..."
                    value={examData[medicalRecordApp._id]?.history || ""} 
                    onChange={(e) => handleUpdateExamField(medicalRecordApp._id, 'history', e.target.value)}></textarea>
                </div>

                <div className="col-md-12 mb-3">
                  <label className="font-weight-bold small text-danger">3. Chỉ định cận lâm sàng (Xét nghiệm, Chẩn đoán hình ảnh):</label>
                  <textarea className="form-control border-warning" rows="3" placeholder="Ví dụ: Xét nghiệm máu, Siêu âm bụng, Chụp X-quang phổi..."
                    value={examData[medicalRecordApp._id]?.tests || ""} 
                    onChange={(e) => handleUpdateExamField(medicalRecordApp._id, 'tests', e.target.value)}></textarea>
                </div>

                <div className="col-md-12 mb-3">
                  <label className="font-weight-bold small">4. Chẩn đoán xác định (*):</label>
                  <textarea className="form-control font-weight-bold border-danger" rows="2" placeholder="Tên bệnh chính..."
                    value={examData[medicalRecordApp._id]?.diagnosis || ""} 
                    onChange={(e) => handleUpdateExamField(medicalRecordApp._id, 'diagnosis', e.target.value)}></textarea>
                </div>
                <div className="col-md-12 mb-3">
                  <label className="font-weight-bold small">5. Chỉ định đơn thuốc & Liều dùng:</label>
                  <textarea className="form-control font-italic bg-light" rows="6" placeholder="Nhập đơn thuốc..."
                    value={examData[medicalRecordApp._id]?.prescription || ""} 
                    onChange={(e) => handleUpdateExamField(medicalRecordApp._id, 'prescription', e.target.value)}></textarea>
                </div>
                <div className="col-md-12">
                  <label className="font-weight-bold small">6. Lời dặn & Kết luận của bác sĩ:</label>
                  <textarea className="form-control border-primary" rows="3" placeholder="Dặn dò tái khám..."
                    value={examData[medicalRecordApp._id]?.advice || ""} 
                    onChange={(e) => handleUpdateExamField(medicalRecordApp._id, 'advice', e.target.value)}></textarea>
                </div>
              </div>
            </div>

            <div className="modal-giant-footer text-right">
              <button className="btn btn-outline-secondary mr-2 px-4 shadow-sm" onClick={() => setMedicalRecordApp(null)}>ĐÓNG</button>
              <button className="btn btn-primary px-5 font-weight-bold shadow" onClick={() => handleSaveMedicalRecord(medicalRecordApp._id)}>
                <i className="fas fa-save mr-2"></i> LƯU & IN PHIẾU
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-custom-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.7); display: flex; justify-content: center; align-items: center; z-index: 10000; backdrop-filter: blur(4px); }
        .modal-mini { background: white; padding: 20px; border-radius: 20px; width: 380px; animation: zoomIn 0.2s; }
        .modal-giant { background: white; width: 1100px; max-width: 95%; height: 92vh; border-radius: 24px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .modal-giant-header { padding: 15px 30px; background: #1e293b; color: white; }
        .modal-giant-body { padding: 30px; flex: 1; overflow-y: auto; background: #fff; }
        .modal-giant-footer { padding: 15px 30px; background: #f8fafc; border-top: 1px solid #e2e8f0; }
        .close-giant-btn { background: none; border: none; color: white; font-size: 30px; cursor: pointer; }
        .form-control:focus { border-color: #3b82f6; box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25); }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default TodaysSchedule;