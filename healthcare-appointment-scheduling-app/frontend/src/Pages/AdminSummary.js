import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaMoneyBillWave, FaHospitalUser, FaArrowUp, FaChartBar } from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {
  const [stats, setStats] = useState({
    totalApps: 0,
    revenue: 0,
    doctors: 0,
    activeDocs: 0
  });
  const [loading, setLoading] = useState(true);

  // 1. LẤY DỮ LIỆU TỪ API BACKEND (THAY VÌ LOCALSTORAGE)
  const loadRealStats = async () => {
    try {
      // 1. Gọi API lấy stats (Cái này đang lấy dữ liệu THẬT của bác đây)
      const res = await axios.get("http://localhost:5000/appointments/stats");
      
      // 2. Cập nhật State
      setStats({
        totalApps: res.data.totalAppointments || 0, // Dữ liệu THẬT
        revenue: res.data.totalRevenue || 0,       // Dữ liệu THẬT
        doctors: 130,   // Để số ảo cố định như bác muốn, bỏ cái docRes gây lỗi đi
        activeDocs: 125 // Để số ảo cố định
      });
      
      setLoading(false);
    } catch (e) {
      console.error("Lỗi khi lấy dữ liệu:", e);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    loadRealStats();
    // Cập nhật dữ liệu mỗi 5 giây để Dashboard luôn mới
    const interval = setInterval(loadRealStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center p-5">Đang tính toán số liệu thực tế...</div>;

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="row mb-4">
        {/* THẺ TỔNG CA HẸN */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: "20px", background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)", color: "#fff" }}>
            <div className="d-flex justify-content-between">
              <div>
                <p className="small text-uppercase opacity-75 mb-1 text-white">Tổng ca hẹn hệ thống</p>
                <h2 className="font-weight-bold mb-0 text-white">{stats.totalApps}</h2>
                <small className="text-success"><FaArrowUp /> Dữ liệu thời gian thực</small>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.1)", height: "fit-content" }}>
                <FaCalendarCheck size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* THẺ DOANH THU THỰC TẾ (Lấy từ FINISHED) */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: "20px", background: "#fff" }}>
            <div className="d-flex justify-content-between">
              <div>
                <p className="small text-uppercase text-muted mb-1 font-weight-bold">Doanh thu thực tế</p>
                <h2 className="font-weight-bold mb-0" style={{ color: "#10b981" }}>
                  {stats.revenue.toLocaleString('vi-VN')} VNĐ
                </h2>
                <small className="text-muted font-italic">Chỉ tính ca đã hoàn thành</small>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: "#dcfce7", color: "#10b981", height: "fit-content" }}>
                <FaMoneyBillWave size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* THẺ NHÂN SỰ */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: "20px", background: "#fff" }}>
            <div className="d-flex justify-content-between">
              <div>
                <p className="small text-uppercase text-muted mb-1 font-weight-bold">Bác sĩ tham gia</p>
                <h2 className="font-weight-bold mb-0 text-dark">{stats.doctors} nhân sự</h2>
                <small className="text-primary font-weight-bold">Sẵn sàng: {stats.activeDocs}</small>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: "#fee2e2", color: "#ef4444", height: "fit-content" }}>
                <FaHospitalUser size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BIỂU ĐỒ GIAO DIỆN GỐC */}
      <div className="card border-0 shadow-sm p-5 text-center" style={{ borderRadius: "25px", backgroundColor: "#fff" }}>
          <h4 className="font-weight-bold" style={{ color: "#0f172a", fontSize: "1.5rem" }}>NMD Medical Dashboard</h4>
          <p className="text-muted mb-5 small">Phân tích tần suất khám bệnh theo tuần</p>
          
          <div className="d-flex justify-content-center align-items-end mb-4" style={{ height: "250px", gap: "20px" }}>
             {/* Các cột biểu đồ - Có thể giữ nguyên UI cũ của bạn */}
            {[120, 150, 180, 160, 200, 240, 230].map((h, i) => (
                <div key={i} className="d-flex flex-column align-items-center">
                    <div style={{ 
                        width: "45px", 
                        height: `${h}px`, 
                        background: i > 4 ? "#e40c0ceb" : "#e2e8f0", 
                        borderRadius: "8px",
                        boxShadow: i > 4 ? "0 4px 12px rgba(228, 12, 12, 0.2)" : "none"
                    }}></div>
                    <small className="mt-2 text-muted font-weight-bold">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </small>
                </div>
            ))}
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <span className="badge badge-light px-4 py-2" style={{ borderRadius: "10px", color: "#64748b", border: "1px solid #f1f5f9" }}>
              <FaChartBar className="mr-1" /> Đồng bộ: Database Realtime
            </span>
            <span className="badge badge-light px-4 py-2" style={{ borderRadius: "10px", color: "#64748b", border: "1px solid #f1f5f9" }}>
              🟢 Trạng thái: CONNECTED
            </span>
          </div>
      </div>
    </div>
  );
};

export default AdminSummary;