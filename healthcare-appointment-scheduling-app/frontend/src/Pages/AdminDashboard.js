import React, { useState } from "react";
// Tất cả cùng nằm trong thư mục Pages nên chỉ cần dùng ./
import AdminSidebar from "./AdminSidebar"; 
import AdminSummary from "./AdminSummary"; 
import DoctorManagement from "./DoctorManagement";
import AppointmentControl from "./AppointmentControl";
import PatientList from "./PatientList";

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");

  return (
    <div style={{ backgroundColor: "#f4f7fe", minHeight: "100vh", display: "flex" }}>
      {/* 1. THANH SIDEBAR */}
      <AdminSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* 2. NỘI DUNG CHÍNH */}
      <div style={{ marginLeft: "280px", flex: 1, padding: "40px" }}>
        <div className="animate__animated animate__fadeIn">
          {currentTab === "dashboard" && <AdminSummary />}
          {currentTab === "doctors" && <DoctorManagement />}
          {currentTab === "appointments" && <AppointmentControl />}
          {currentTab === "patients" && <PatientList />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;