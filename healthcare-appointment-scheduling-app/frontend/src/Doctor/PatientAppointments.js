import React, { useState, useEffect } from "react";
import Scrollbar from "react-scrollbars-custom";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [weekDays, setWeekDays] = useState([]);
  const [currentWeekTop, setCurrentWeekTop] = useState(new Date());

  const getISODate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // 1. LẤY DỮ LIỆU TỪ DATABASE (Thay vì localStorage)
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/appointments");
      const data = await res.json();
      if (Array.isArray(data)) {
        setAppointments(data);
      }
    } catch (err) {
      console.error("Lỗi kết nối API:", err);
    }
  };

  const generateWeek = (anchorDate) => {
    const dayOfWeek = anchorDate.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(anchorDate);
    monday.setDate(anchorDate.getDate() - diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push({
        isoDate: getISODate(d), 
        dayName: d.toLocaleDateString('vi-VN', { weekday: 'short' }),
        dateNum: d.getDate()
      });
    }
    setWeekDays(days);
    const todayISO = getISODate(new Date());
    const hasToday = days.find(d => d.isoDate === todayISO);
    setSelectedDate(hasToday ? todayISO : days[0].isoDate);
  };

  useEffect(() => {
    fetchAppointments(); // Gọi dữ liệu từ DB khi load trang
    generateWeek(new Date());
  }, []);

  const changeWeek = (direction) => {
    const newDate = new Date(currentWeekTop);
    newDate.setDate(currentWeekTop.getDate() + (direction * 7));
    setCurrentWeekTop(newDate);
    generateWeek(newDate);
  };

  // 2. LOGIC LỌC DỮ LIỆU (So khớp Database)
  const filteredData = appointments.filter(app => {
    const currentDoctorLoggedIn = localStorage.getItem("doctorName") || "";
    
    // Loại bỏ ca đã Finished hoặc Cancelled
    if (app.status === "Finished" || app.status === "cancelled") return false;

    // Lọc theo ngày đang chọn trên lịch
    if (app.date !== selectedDate) return false;

    // Khớp tên bác sĩ (Xử lý chuỗi để so sánh chuẩn)
    const cleanCurrentDoc = currentDoctorLoggedIn.replace(/GS\.?\s?TS\.?/gi, '').trim().toUpperCase();
    const cleanAppDoc = (app.doctorName || "").replace(/GS\.?\s?TS\.?/gi, '').trim().toUpperCase();

    return cleanAppDoc === cleanCurrentDoc;
  });

  const handleStartClinic = (app) => {
    alert(`Bắt đầu khám cho bệnh nhân: ${app.patientName}`);
    // Bác có thể điều hướng sang trang khám bệnh tại đây
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <h5 className="mb-0 font-weight-bold text-uppercase" style={{ color: "#0f172a", fontSize: "16px" }}>
          <i className="far fa-calendar-alt mr-2"></i> 
          Tháng {currentWeekTop.getMonth() + 1} năm {currentWeekTop.getFullYear()}
        </h5>
      </div>

      <div className="d-flex align-items-center mb-4 px-1">
        <button className="btn btn-dark btn-sm rounded-circle shadow-sm" style={{ width: "35px", height: "35px" }} onClick={() => changeWeek(-1)}>{"<"}</button>
        <div className="d-flex justify-content-between flex-grow-1 mx-2 p-1 bg-white rounded shadow-sm border">
          {weekDays.map((item, index) => {
            const isSelected = selectedDate === item.isoDate;
            const isToday = item.isoDate === getISODate(new Date());
            return (
              <div key={index} onClick={() => setSelectedDate(item.isoDate)} style={{
                cursor: "pointer", flex: 1, textAlign: "center", padding: "8px 2px", borderRadius: "10px", transition: "0.2s",
                background: isSelected ? "#0f172a" : (isToday ? "#f1f5f9" : "transparent"),
                color: isSelected ? "#fff" : (isToday ? "#0f172a" : "#475569"),
                border: isToday && !isSelected ? "1px dashed #0f172a" : "none"
              }}>
                <div style={{ fontSize: "10px", fontWeight: "600", textTransform: "uppercase" }}>{item.dayName}</div>
                <div style={{ fontSize: "19px", fontWeight: "800" }}>{item.dateNum}</div>
              </div>
            );
          })}
        </div>
        <button className="btn btn-dark btn-sm rounded-circle shadow-sm" style={{ width: "35px", height: "35px" }} onClick={() => changeWeek(1)}>{">"}</button>
      </div>

      <div style={{ height: "60vh" }}>
        <Scrollbar noScrollX>
          <div className="px-1">
            <table className="table table-hover border bg-white shadow-sm" style={{ borderRadius: "15px", overflow: "hidden" }}>
  <thead style={{ background: "#0f172a", color: "white" }}>
    <tr>
      <th className="py-3 px-4">Giờ</th>
      <th className="py-3">Bệnh Nhân</th>
      <th className="py-3">Lý Do Khám</th> {/* Cột mới thêm */}
      <th className="py-3 text-center">Thao tác</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.length > 0 ? (
      filteredData.map((app) => (
        <tr key={app._id}>
          <td className="py-3 px-4 font-weight-bold" style={{ color: "#1e293b" }}>{app.slotTime}</td>
          <td className="py-3">
            <div className="font-weight-bold" style={{ fontSize: "15px" }}>{app.patientName}</div>
            <small className="text-muted">ID: {app._id.slice(-6)}</small>
          </td>
          <td className="py-3">
            {/* Hiển thị lý do khám từ trường description trong Database */}
            <div style={{ fontSize: "14px", color: "#475569" }}>
              {app.description || "Khám định kỳ"}
            </div>
          </td>
          <td className="py-3 text-center">
            {selectedDate === getISODate(new Date()) ? (
              <button className="btn btn-primary btn-sm px-4 rounded-pill shadow-sm" onClick={() => handleStartClinic(app)}>BẮT ĐẦU KHÁM</button>
            ) : (
              <button className="btn btn-warning btn-sm px-4 font-weight-bold rounded-pill shadow-sm text-dark" disabled>CHỜ KHÁM</button>
            )}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        {/* Quan trọng: colSpan phải là 4 vì đã thêm 1 cột */}
        <td colSpan="4" className="text-center py-5">
          <div className="text-muted font-italic">Không có lịch hẹn nào vào ngày này.</div>
        </td>
      </tr>
    )}
  </tbody>
</table>
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

export default PatientAppointments;