import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Basic/Footer';
import Navbar from '../Basic/Navbar';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const PatientLogin = () => {
    // Đổi biến 'name' thành 'email' cho đúng bản chất
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(""); 
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(""); 

        const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

        // CHỖ NÀY QUAN TRỌNG: Tìm theo Email thay vì tìm theo Tên
        const user = allUsers.find(u => u.email === email && u.password === password);

        if (user) {
            // Lưu vào LocalStorage để các trang khác dùng
            window.localStorage.setItem("userEmail", user.email); 
            window.localStorage.setItem("patientName", user.name);
            window.localStorage.setItem("patientPhone", user.phone || "");
            window.localStorage.setItem("role", "patient");

            alert(`Chào ${user.name}, đăng nhập thành công!`);
            history.push("/patient");
        } else {
            setError("Email hoặc Mật khẩu không đúng!");
        }
    };

    return (
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", minHeight: "100vh", backgroundColor: "#1a1a1a" }}>
            <Navbar />
            <div style={{ display: "flex", alignItems: "center", padding: "60px 0" }}>
                <Container>
                    <Row className="justify-content-center m-0">
                        <Col md="5" className="bg-white p-0 shadow" style={{ borderRadius: "15px", overflow: "hidden" }}>
                            <div className="bg-primary text-white text-center py-4">
                                <h5 className="mb-0 font-weight-bold text-uppercase">Bệnh nhân đăng nhập</h5>
                            </div>
                            <div className="p-4">
                                <Form onSubmit={handleLogin}>
                                    <FormGroup>
                                        {/* ĐỔI NHÃN Ở ĐÂY */}
                                        <Label className="text-dark font-weight-bold">Email đăng nhập</Label>
                                        <Input 
                                            type="email" // Đổi type thành email
                                            placeholder="Ví dụ: abc@gmail.com" 
                                            onChange={(e) => setEmail(e.target.value)} // Cập nhật vào biến email
                                            required 
                                            className="py-2"
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-3">
                                        <Label className="text-dark font-weight-bold">Mật khẩu</Label>
                                        <Input 
                                            type="password" 
                                            placeholder="Nhập mật khẩu..." 
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                            className="py-2"
                                        />
                                    </FormGroup>

                                    {error && (
                                        <div className="mt-3 text-center" style={{ color: "#dc3545", fontSize: "14px", fontWeight: "bold" }}>
                                            {error}
                                        </div>
                                    )}

                                    <Button color="primary" block className="mt-4 py-2 font-weight-bold text-uppercase" type="submit">
                                        XÁC NHẬN
                                    </Button>

                                    <div className="mt-4 text-center" style={{ fontSize: "14px" }}>
                                        <span className="text-muted">Chưa có tài khoản? </span>
                                        <span 
                                            onClick={() => history.push("/registration")} 
                                            style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
                                        >
                                            Đăng ký ngay
                                        </span>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default PatientLogin;