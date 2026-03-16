import React, { useState, useEffect } from "react"; 
import Navbar from "../Basic/Navbar";
import LeftsidePatient from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; 
import { Button, Row, Col, Input, FormGroup, Card, CardBody } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";

const BookingCheckout = () => {
  const history = useHistory();
  const location = useLocation();

  // 1. LẤY DỮ LIỆU TỪ ROUTE (Bác sĩ hoặc Gói khám)
  const { selectedDoctor, selectedPackage, isPackage } = location.state || {};
  const displayData = isPackage ? selectedPackage : selectedDoctor;

  // 2. XỬ LÝ CHI PHÍ
  const currentFee = displayData?.fee || displayData?.fees || 0;

  const today = new Date().toISOString().split("T")[0];
  const [bookingDate, setBookingDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]); 

  const [formData, setFormData] = useState({ 
    patientName: "", 
    gender: "Nam", 
    phone: "", 
    birthYear: "", 
    email: "", 
    address: "", 
    description: ""
  });

  const timeSlots = [
    "08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00", 
    "10:00 - 10:30", "10:30 - 11:00", "13:30 - 14:00", "14:00 - 14:30", 
    "14:30 - 15:00", "15:00 - 15:30", "15:30 - 16:00", "16:00 - 16:30"
  ];

  // CHECK LỊCH TRÙNG TỪ SERVER
  useEffect(() => {
    if (displayData?.name && bookingDate) {
      const encodedName = encodeURIComponent(displayData.name.trim());
      // Lưu ý: Endpoint này phải trả về danh sách lịch đã đặt để khóa nút
      const url = `http://localhost:5000/appointments?doctorName=${encodedName}&date=${bookingDate}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if(Array.isArray(data)){
            const slots = data.map(ap => ap.slotTime.trim()); 
            setBookedSlots(slots);
          }
        })
        .catch(err => console.error("Lỗi fetch lịch hẹn:", err));
    }
  }, [bookingDate, displayData?.name]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const isTimePassed = (slot) => {
//     // Luôn trả về false để không ca nào bị mờ (disable)
//     return false; 
// };

  // // Kiểm tra giờ đã trôi qua trong ngày hôm nay
   const isTimePassed = (slot) => {
     if (bookingDate !== today) return false;
     const currentTime = new Date();
     const [startTime] = slot.split(" - ");
     const [hours, minutes] = startTime.split(":").map(Number);
     const slotDateTime = new Date();
     slotDateTime.setHours(hours, minutes, 0, 0);
     return currentTime > slotDateTime;
   };

  // XỬ LÝ XÁC NHẬN ĐẶT LỊCH
  const handleConfirmBooking = () => {
    // Lấy thông tin định danh từ LocalStorage
    const userEmail = localStorage.getItem("userEmail");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Validation cơ bản
    if (!selectedTime || !formData.patientName || !formData.phone) { 
      alert("Vui lòng nhập đầy đủ: Họ tên, Số điện thoại và Chọn khung giờ!"); 
      return; 
    }

    if (bookedSlots.includes(selectedTime)) {
      alert("Khung giờ này vừa được người khác đặt!");
      return;
    }

    // ĐÓNG GÓI DỮ LIỆU GỬI LÊN MONGODB
    const bookingData = {
      ...formData,
      bookedBy: userEmail || formData.email, // QUAN TRỌNG: Dùng cái này để lọc ở trang Trạng thái
      patientId: user._id || user.id || "GUEST_ID", 
      doctorId: displayData?.id || displayData?._id || "DOCTOR_ID",
      doctorName: displayData?.name || "Bác sĩ",
      fee: Number(currentFee), 
      date: bookingDate,
      slotTime: selectedTime,
      status: "pending",
      paymentStatus: "CHƯA THANH TOÁN",
      type: isPackage ? "package" : "doctor",
      createdAt: new Date().toISOString()
    };

    fetch("http://localhost:5000/appointments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    })
    .then(async (res) => {
      if (res.ok) {
        alert("🎉 Đặt lịch thành công! Hệ thống đang chuyển hướng...");
        history.push("/patient/appointment-status");
      } else {
        const errorData = await res.json();
        alert("Lỗi: " + (errorData.message || "Không thể lưu lịch hẹn"));
      }
    })
    .catch(err => alert("Không thể kết nối tới Backend! Vui lòng kiểm tra server."));
  };

  if (!displayData) return <div className="p-5 text-center">Đang tải dữ liệu bác sĩ...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1, width: "100%", overflow: "hidden" }}>
        <div style={{ width: "280px", minWidth: "280px", backgroundColor: "#0f172a", flexShrink: 0 }}>
          <LeftsidePatient />
        </div>

        <div style={{ flex: 1, height: "100%", overflowY: "auto", borderLeft: "6px solid #fdbb2d", display: "flex", flexDirection: "column" }}>
          <div className="container-fluid p-0" style={{ width: "100%", padding: "40px" }}>
            
            <div className="d-flex align-items-center mb-4" style={{ gap: "16px" }}>
              <button onClick={() => history.goBack()} style={{ padding: "8px 16px", borderRadius: "12px", backgroundColor: "#fff", border: "1px solid #e2e8f0", cursor: "pointer", fontWeight: "600" }}>
                <i className="fa fa-chevron-left mr-2"></i> QUAY LẠI
              </button>
              <h3 className="font-weight-bold text-dark m-0 text-uppercase">🏥 XÁC NHẬN ĐẶT LỊCH KHÁM</h3>
            </div>

            <Row className="mx-0">
              <Col md="12">
                <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: "24px" }}>
                  {/* Header Card: Thông tin bác sĩ/gói dịch vụ */}
                  <div className="p-4 d-flex align-items-center border-bottom bg-white" style={{ borderRadius: "24px 24px 0 0" }}>
                    <img src={displayData.img || "https://via.placeholder.com/100"} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "3px solid #fdbb2d" }} alt="dr" />
                    <div className="ml-4">
                      <h4 className="font-weight-bold m-0 text-dark">{displayData.name}</h4>
                      <div className="mt-1">
                        <span className="text-muted mr-2">Phí dịch vụ:</span>
                        <b className="text-danger" style={{ fontSize: "20px" }}>{currentFee.toLocaleString('vi-VN')} VNĐ</b>
                      </div>
                    </div>
                  </div>

                  <CardBody className="p-4">
                    <Row>
                      {/* Cột 1: Chọn thời gian */}
                      <Col lg="5" className="border-right">
                        <h6 className="font-weight-bold mb-3"><i className="fa fa-calendar-alt text-primary mr-2"></i> 1. CHỌN NGÀY & GIỜ KHÁM</h6>
                        <FormGroup>
                          <Input type="date" min={today} value={bookingDate} onChange={e => { setBookingDate(e.target.value); setSelectedTime(""); }} className="mb-4" style={{ borderRadius: "10px", height: "45px" }} />
                        </FormGroup>
                        <div className="time-grid">
                          {timeSlots.map(slot => {
                              const isBooked = bookedSlots.includes(slot.trim());
                              const isPassed = isTimePassed(slot);
                              const isDisabled = isBooked || isPassed;
                              return (
                                <button 
                                  key={slot} 
                                  disabled={isDisabled} 
                                  onClick={() => setSelectedTime(slot)}
                                  className={`slot-btn ${selectedTime === slot ? 'active' : ''} ${isDisabled ? 'taken' : ''}`}
                                >
                                  {isBooked ? "Hết chỗ" : isPassed ? "Đã qua" : slot}
                                </button>
                              );
                          })}
                        </div>
                        {selectedTime && <div className="mt-3 text-success font-weight-bold"><i className="fa fa-check-circle mr-1"></i> Đã chọn: {selectedTime}</div>}
                      </Col>

                      {/* Cột 2: Form thông tin */}
                      <Col lg="7" className="pl-lg-4 mt-4 mt-lg-0">
                        <h6 className="font-weight-bold mb-3"><i className="fa fa-edit text-primary mr-2"></i> 2. THÔNG TIN BỆNH NHÂN</h6>
                        <Row>
                          <Col md="12"><Input placeholder="Họ và tên bệnh nhân (Bắt buộc)" name="patientName" className="mb-3 custom-inp" onChange={handleInputChange} /></Col>
                          <Col md="6">
                            <Input type="select" name="gender" className="mb-3 custom-inp" onChange={handleInputChange}>
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                            </Input>
                          </Col>
                          <Col md="6"><Input placeholder="Năm sinh (VD: 1995)" name="birthYear" className="mb-3 custom-inp" onChange={handleInputChange} /></Col>
                          <Col md="12"><Input placeholder="Số điện thoại liên lạc" name="phone" className="mb-3 custom-inp" onChange={handleInputChange} /></Col>
                          <Col md="12"><Input placeholder="Email nhận kết quả" name="email" className="mb-3 custom-inp" onChange={handleInputChange} /></Col>
                          <Col md="12"><Input type="textarea" placeholder="Triệu chứng hoặc yêu cầu đặc biệt..." name="description" rows="3" onChange={handleInputChange} style={{borderRadius:"12px"}}/></Col>
                        </Row>
                        <Button color="primary" block className="py-3 mt-4 shadow-sm" style={{ borderRadius: "12px", background: "#0f172a", border: "none", fontSize: "16px", fontWeight: "700" }} onClick={handleConfirmBooking}>
                          XÁC NHẬN ĐẶT LỊCH NGAY
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Footer />
          </div>
        </div>
      </div>

      <style>{`
        .custom-inp { border-radius: 10px !important; height: 48px !important; border: 1px solid #e2e8f0 !important; }
        .time-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .slot-btn { padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; transition: 0.3s; font-weight: 600; font-size: 13px; color: #475569; }
        .slot-btn.active { background: #0f172a !important; color: #fff !important; border-color: #0f172a !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .slot-btn.taken { background: #f1f5f9 !important; color: #cbd5e1 !important; cursor: not-allowed; border-style: dashed; }
        .slot-btn:hover:not(.taken):not(.active) { border-color: #fdbb2d; background: #fffdf5; }
      `}</style>
    </div>
  );
};

export default BookingCheckout;