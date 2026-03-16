import React, { useState, useEffect } from "react";

const TodaysSchedule = () => {
  const [appointments, setAppointments] = useState([]);

  // 1. Hàm tải dữ liệu lịch trực
  const loadData = async () => {
    const idCuaBacSi = localStorage.getItem("doctorId");

    if (!idCuaBacSi) {
      console.log("Đợi bác sĩ đăng nhập...");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/doctors/todays-appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId: idCuaBacSi })
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        const sorted = data.sort((a, b) => 
          (a.slotTime || "").localeCompare(b.slotTime || "")
        );

        setAppointments(
          sorted.map((app, index) => ({
            ...app,
            stt: index + 1
          }))
        );
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

  // 2. Hàm xử lý khi nhấn nút KHÁM (Hoàn thành ca khám)
  const handleFinishExam = async (app) => {
    const xacNhan = window.confirm(`Xác nhận hoàn thành ca khám cho: ${app.patientName}?`);
    
    if (xacNhan) {
      try {
        const res = await fetch("http://localhost:5000/doctors/finish-appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentId: app._id }) // Gửi ID của lịch hẹn lên server
        });

        const result = await res.json();

        if (result.success) {
          alert("Ca khám đã được lưu vào lịch sử!");
          // Xóa ca này khỏi danh sách đang hiển thị để bảng sạch luôn
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
    <div 
 className="animate__animated animate__fadeIn"
 style={{ 
   marginTop: "10px",
   minHeight: "calc(100vh - 100px)",
   width: "100%",
   maxWidth: "100%"
 }}
>
      <div 
 className="card border-0 shadow-sm"
 style={{ 
   borderRadius: "24px",
   overflow: "hidden",
   width: "100%"
 }}
>
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
                <th className="py-4 border-0">LÝ DO KHÁM</th>
                <th className="py-4 border-0 text-center">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((app) => (
                  <tr key={app._id}>
                    <td className="py-4 px-4 font-weight-bold text-primary">#{app.stt}</td>
                    <td className="py-4 font-weight-bold">{app.slotTime}</td>
                    <td className="py-4">
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle mr-2 bg-info text-white d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", marginRight: "10px" }}>
                                {app.patientName?.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-weight-bold text-uppercase">{app.patientName}</span>
                        </div>
                    </td>
                    <td className="py-4 text-muted small" style={{ fontStyle: "italic" }}>
                        {app.note || app.description || "1"}
                    </td>
                    <td className="py-4 text-center">
                      <button 
                        onClick={() => handleFinishExam(app)} 
                        className="btn btn-success btn-sm px-4 font-weight-bold"
                        style={{ borderRadius: "10px" }}
                      >
                        KHÁM
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <h5>Hôm nay chưa có ca khám nào hoặc bác đã khám xong hết rồi! ☕</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodaysSchedule;