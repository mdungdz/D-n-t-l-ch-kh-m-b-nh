import React, { useState, useEffect } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài axios (npm install axios)

const AppointmentControl = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. LẤY DỮ LIỆU TỪ DATABASE KHI TRANG LOAD
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Gọi API với tham số isAdmin=true mà mình vừa sửa ở Backend
        const response = await axios.get("http://localhost:5000/appointments?isAdmin=true");
        setAllAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy lịch hẹn:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // 2. XỬ LÝ XÁC NHẬN HOÀN THÀNH (CẬP NHẬT DATABASE)
  const handleComplete = async (id) => {
    try {
      // Gửi lệnh PUT lên Backend để cập nhật trạng thái trong MongoDB
      await axios.put(`http://localhost:5000/appointments/${id}`, {
        status: "FINISHED"
      });

      // Cập nhật lại giao diện ngay lập tức
      setAllAppointments(allAppointments.filter(app => app._id !== id));
      alert("Ca khám đã hoàn thành! Dữ liệu đã được cập nhật trên hệ thống.");
    } catch (error) {
      alert("Không thể cập nhật trạng thái. Vui lòng thử lại!");
    }
  };

  if (loading) return <div className="text-center p-5">Đang tải dữ liệu...</div>;

  return (
    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "20px", backgroundColor: "#fff" }}>
      <div className="mb-4">
        <h5 className="font-weight-bold mb-0">LỊCH HẸN KHÁM BỆNH (TỔNG HỢP)</h5>
        <small className="text-muted">Dữ liệu thực tế từ hệ thống Database</small>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="thead-dark">
            <tr className="text-uppercase" style={{ fontSize: "12px" }}>
              <th>Thời gian</th>
              <th>Bệnh nhân</th>
              <th>Bác sĩ / Gói khám</th> {/* Sửa tiêu đề cho bao quát */}
              <th>Trạng thái</th>
              <th className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments.length > 0 ? (
              allAppointments.map((app) => (
                <tr key={app._id}> {/* MongoDB dùng _id */}
                  <td className="font-weight-bold text-primary">
                    {app.date} <br/> <small>{app.slotTime}</small>
                  </td>
                  <td>{app.patientName}</td>
                  {/* HIỆN BÁC SĨ HOẶC GÓI KHÁM Ở ĐÂY */}
                  <td>
                    {app.doctorName || <span className="text-info">{app.description || "Gói dịch vụ"}</span>}
                  </td>
                  <td>
                    <span className="badge badge-info p-2">{app.status}</span>
                  </td>
                  <td className="text-center">
                    <button 
                      className="btn btn-sm btn-success px-3" 
                      onClick={() => handleComplete(app._id)}
                    >
                      XÁC NHẬN KHÁM XONG
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-muted">
                  Hiện không có lịch hẹn nào cần xử lý.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentControl;