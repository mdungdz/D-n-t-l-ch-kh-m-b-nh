import React, { useState } from "react"; 
import { useHistory } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import Footer from "../Basic/Footer";

const Registration = () => {
  // Khởi tạo giá trị rỗng để không bị dính dữ liệu tự động điền cũ
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [phone, setPhone] = useState(""); 
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // 1. Tạo object tài khoản mới đầy đủ thông tin
    const newUser = { 
      name: name, 
      email: email, 
      phone: phone, 
      password: password 
    };

    // 2. Lấy danh sách tài khoản đã có
    const existingUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

    // 3. Kiểm tra trùng Email
    const isExisted = existingUsers.some(user => user.email === email);
    if (isExisted) {
      alert("Email này đã được đăng ký. Vui lòng dùng Email khác!");
      return;
    }

    // 4. Lưu vào danh sách tổng
    existingUsers.push(newUser);
    window.localStorage.setItem("allUsers", JSON.stringify(existingUsers));
    
    // 5. Lưu thông tin cá nhân hiện tại để các trang Profile/Checkout dùng được luôn
    window.localStorage.setItem("patientName", name);
    window.localStorage.setItem("patientEmail", email);
    window.localStorage.setItem("patientPhone", phone);
    window.localStorage.setItem("userAccount", JSON.stringify(newUser));

    alert("Đăng ký thành công! Bây giờ bạn có thể đăng nhập.");
    history.push("/patientlogin");
  };

  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh" }}>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center" style={{ padding: "50px 0" }}>
        <div className="card shadow-lg" style={{ width: "500px", borderRadius: "15px", overflow: "hidden", border: "none" }}>
          <div className="card-header bg-success text-white text-center py-4">
            <h4 className="mb-0 font-weight-bold text-uppercase">Tạo tài khoản bệnh nhân</h4>
          </div>
          <div className="card-body p-4 bg-white">
            {/* autoComplete="off" để ngăn chặn trình duyệt tự điền thông tin bác sĩ */}
            <form onSubmit={handleRegister} autoComplete="off">
              
              <div className="form-group mb-3">
                <label className="font-weight-bold text-dark">Họ và Tên</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Ví dụ: Nguyễn Văn A" 
                  value={name}
                  required 
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group mb-3">
                <label className="font-weight-bold text-dark">Email </label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Ví dụ: abc@gmail.com" 
                  value={email}
                  required 
                  onChange={(e) => setEmail(e.target.value)} 
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group mb-3">
                <label className="font-weight-bold text-dark">Số điện thoại</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Nhập số điện thoại" 
                  value={phone}
                  required 
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group mb-4">
                <label className="font-weight-bold text-dark">Mật khẩu</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Nhập mật khẩu của bạn" 
                  value={password}
                  required 
                  onChange={(e) => setPassword(e.target.value)} 
                  autoComplete="new-password"
                />
              </div>

              <button type="submit" className="btn btn-success w-100 py-3 shadow-sm font-weight-bold text-uppercase">
                Đăng Ký Ngay
              </button>

              <div className="text-center mt-3">
                <span className="text-muted">Đã có tài khoản? </span>
                <span 
                  onClick={() => history.push("/patientlogin")} 
                  style={{ color: "#28a745", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
                >
                  Đăng nhập
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;