import React, { useState } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import "react-calendar/dist/Calendar.css";
import { Button, Table } from "reactstrap";
import Calendar from "react-calendar";

const Selectdate = (props) => {
  const [date, setDate] = useState(new Date());
  const [showSlots, setShowSlots] = useState(false);

  const selectedDoctor = props.location?.doctor?.doctor || {
    name: "GS. TS. NGUYỄN MẠNH DŨNG",
  };

  // 1. DANH SÁCH KHUNG GIỜ DÀY ĐẶC (GIỐNG BỆNH VIỆN THỰC TẾ)
  const allSlots = [
    { id: 1, time: "07:30 AM" }, { id: 2, time: "07:45 AM" },
    { id: 3, time: "08:00 AM" }, { id: 4, time: "08:15 AM" },
    { id: 5, time: "08:30 AM" }, { id: 6, time: "08:45 AM" },
    { id: 7, time: "09:00 AM" }, { id: 8, time: "09:15 AM" },
    { id: 9, time: "09:30 AM" }, { id: 10, time: "09:45 AM" },
    { id: 11, time: "10:00 AM" }, { id: 12, time: "10:15 AM" },
    { id: 13, time: "10:45 AM" }, { id: 14, time: "11:00 AM" },
    { id: 15, time: "13:30 PM" }, { id: 16, time: "14:00 PM" },
    { id: 17, time: "14:30 PM" }, { id: 18, time: "15:00 PM" },
    { id: 19, time: "15:30 PM" }, { id: 20, time: "16:00 PM" },
  ];

  // 2. KHÓA CÁC GIỜ BỆNH NHÂN GIẢ LẬP ĐANG CHIẾM (7:30 ĐẾN 10:15)
  const busySlots = [
    "07:30 AM", "07:45 AM", "08:00 AM", "08:15 AM", 
    "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM", 
    "09:30 AM", "09:45 AM", "10:00 AM", "10:15 AM"
  ];

  // Logic chặn ngày cũ
  var previous = new Date();
  previous.setHours(0,0,0,0); 

  const isSlotBusy = (time) => {
    const todayStr = new Date().toLocaleDateString('vi-VN');
    const selectedDateStr = date.toLocaleDateString('vi-VN');
    // Nếu là ngày hiện tại, khóa các giờ bận
    return selectedDateStr === todayStr && busySlots.includes(time);
  };

  const handleBooking = (slotTime) => {
    const appointmentInfo = {
      patientName: "Bệnh Nhân Demo",
      date: date.toLocaleDateString('vi-VN'),
      time: slotTime,
      doctorName: selectedDoctor.name,
      status: "Confirmed",
      service: "Khám chuyên khoa"
    };

    const allApps = JSON.parse(localStorage.getItem("allAppointments") || "[]");
    allApps.push(appointmentInfo);
    localStorage.setItem("allAppointments", JSON.stringify(allApps));

    alert(`Đặt lịch thành công! Mã số khám của bạn đã được ưu tiên vào lúc ${slotTime}.`);
    props.history.push("/patient/appointment-status");
  };

  return (
    <div className="bg-dark" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="row m-5" style={{ maxWidth: "100%" }}>
        <div className="col-3 col-md-3 p-4 bg-white" style={{ height: "80vh" }}>
          <Leftside />
        </div>

        <div
          className="col-9 col-md-9 p-4 text-white text-center"
          style={{
            border: "15px solid yellow",
            minHeight: "80vh",
            backgroundColor: "#6c757d",
          }}
        >
          {!showSlots ? (
            <div>
              <h2 className="mb-4 text-uppercase font-weight-bold">Chọn ngày khám</h2>
              <div className="d-flex justify-content-center">
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", color: "black" }}>
                  <Calendar
                    tileDisabled={({ date }) => date.getDay() === 0 || date < previous}
                    onChange={setDate}
                    value={date}
                  />
                  <p className="mt-3 font-weight-bold text-primary">Ngày chọn: {date.toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
              <Button color="primary" className="mt-5 px-5 btn-lg shadow" onClick={() => setShowSlots(true)}>
                Xem khung giờ trống
              </Button>
            </div>
          ) : (
            <div>
              <h4 className="mb-3 text-uppercase">Khung giờ của bác sĩ {selectedDoctor.name}</h4>
              <p className="small mb-4 text-light">Hệ thống tự động cập nhật các slot còn trống theo thời gian thực</p>
              
              <div className="mx-auto" style={{ maxWidth: "90%", height: "50vh", overflowY: "auto", border: "1px solid #dee2e6", borderRadius: "8px" }}>
                <Table dark hover bordered className="mb-0">
                  <thead className="bg-primary" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    <tr>
                      <th>Giờ Khám</th>
                      <th>Trạng Thái</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSlots.map((slot) => {
                      const busy = isSlotBusy(slot.time);
                      return (
                        <tr key={slot.id}>
                          <td className="align-middle font-weight-bold">{slot.time}</td>
                          <td className="align-middle">
                            {busy ? (
                              <span className="badge badge-danger">Đã có người đặt</span>
                            ) : (
                              <span className="badge badge-success">Sẵn sàng</span>
                            )}
                          </td>
                          <td>
                            <Button
                              color={busy ? "secondary" : "success"}
                              disabled={busy}
                              size="sm"
                              onClick={() => handleBooking(slot.time)}
                            >
                              {busy ? "Hết chỗ" : "Chọn ca này"}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>

              <Button color="danger" className="mt-4 shadow" onClick={() => setShowSlots(false)}>
                ← Quay lại chọn ngày
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Selectdate;