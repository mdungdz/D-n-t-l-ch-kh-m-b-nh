import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import các trang chính
import Home from "./Pages/Home";
import DoctorLogin from "./Pages/DoctorLogin";
import PatientLogin from "./Pages/PatientLogin";
import Registration from "./Pages/Registration"; 
import DoctorDashboard from "./Pages/DoctorDashboard";
import PaitentDashboard from "./Pages/PaitentDashboard";
import Error from "./Pages/Error";
import PhoneNumber from "./components/PhoneNumber";
import SearchDoctor from "./Patient/SearchDoctor";
import PerviousAppointments from "./Patient/PerviousAppointments";
import AppointmentStatus from "./Patient/AppointmentStatus"; 
import Payment from "./Patient/Payment"; 
import { AuthContext } from "./Auth/AuthContext";
import AdminDashboard from "./Pages/AdminDashboard"; 
import TodaysSchedule from "./Doctor/TodaysSchedule";
import MedicalServices from "./Patient/MedicalServices";
import BookingCheckout from "./Patient/BookingCheckout";
import SearchPackage from "./Patient/SearchPackage";

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [googleId, setGoogleId] = useState(window.localStorage.getItem("googleId"));

  return (
    <Router>
      <AuthContext.Provider value={{ token, setToken, googleId, setGoogleId }}>
        <Switch>
          {/* TRANG CHỦ GIỮ NGUYÊN */}
          <Route exact path="/" component={Home} />
          
          {/* --- KHU VỰC BÁC SĨ (ĐÃ SỬA ĐỂ HẾT TRẮNG MÀN HÌNH) --- */}
          <Route exact path="/doctorlogin" component={DoctorLogin} />
          
          {/* Tất cả các tính năng của Bác sĩ đều phải qua DoctorDashboard để hiển thị Sidebar/Navbar */}
          <Route exact path="/doctor/dashboard" component={DoctorDashboard} />
          
          {/* Đã sửa lỗi chính tả từ 'perosnal' thành 'personal' để khớp với Dashboard */}
          <Route exact path="/doctor/personaldetails" component={DoctorDashboard} /> 
          
          <Route exact path="/doctor/payment-history" component={DoctorDashboard} />
          <Route exact path="/doctor/patient-appointments" component={DoctorDashboard} />
          
          {/* Sửa lại cái này để nó nhận diện giao diện Dashboard chung */}
          <Route exact path="/doctor/today-schedule" component={DoctorDashboard} />
          
          {/* --- KHU VỰC KHÁCH HÀNG GIỮ NGUYÊN --- */}
          <Route exact path="/patientlogin" component={PatientLogin} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/patient" component={PaitentDashboard} />
          <Route exact path="/patient/searchdoctor" component={SearchDoctor} />
          <Route exact path="/patient/history" component={PerviousAppointments} />
          <Route exact path="/patient/previousappointments" component={PerviousAppointments} />
          <Route exact path="/patient/update-phone" component={PhoneNumber} />
          <Route exact path="/patient/appointment-status" component={AppointmentStatus} />
          <Route exact path="/patient/payment" component={Payment} />
          <Route path="/patient/services" component={MedicalServices} />
          <Route exact path="/patient/booking-checkout" component={BookingCheckout} />
          <Route path="/patient/searchpackage" component={SearchPackage} />
          
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/doctors" component={AdminDashboard} />
          <Route exact path="/admin/appointments" component={AdminDashboard} />
          <Route exact path="/admin/patients" component={AdminDashboard} />
          
          {/* TRANG LỖI 404 */}
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;


//chạy ctrinh
//cd healthcare-appointment-scheduling-app
//cd frontend
//export NODE_OPTIONS=--openssl-legacy-provider
// npm start