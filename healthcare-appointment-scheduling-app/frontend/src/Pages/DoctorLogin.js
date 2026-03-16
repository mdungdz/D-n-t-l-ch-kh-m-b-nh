import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Basic/Footer';
import Navbar from '../Basic/Navbar';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const DoctorLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    // Mảng dữ liệu bác sĩ
    const fixedDoctors = [
        { id: 1, name: "GS. TS. NGUYỄN MẠNH DŨNG", specialization: ["Giám đốc BV"] },
        { id: 2, name: "PGS. TS. PHẠM MINH TUẤN", specialization: ["Tim mạch", "Nội khoa"] },
        { id: 3, name: "TS. BS. LÊ THU HÀ", specialization: ["Sản Phụ khoa", "Siêu âm thai"] },
        { id: 4, name: "PGS. TS. NGUYỄN THU HÀ", specialization: ["Nhi khoa", "Tiểu đường - Nội tiết"] },
        { id: 5, name: "TS. BS. VŨ HOÀNG YẾN", specialization: ["Da liễu", "Thẩm mỹ", "Da liễu thẩm mỹ"] },
        { id: 6, name: "PGS. TS. TRỊNH CÔNG SƠN", specialization: ["Cơ Xương Khớp", "Chấn thương", "Cột sống"] },
        { id: 7, name: "TS. BS. ALEX NGUYỄN", specialization: ["Ngoại thần kinh", "Thần kinh"] },
        { id: 8, name: "PGS. TS. HOÀNG VĂN THÁI", specialization: ["Tiêu hóa", "Bệnh Viêm gan", "Nội soi Tiêu hóa"] },
        { id: 9, name: "TS. BS. LÊ HOÀNG NAM", specialization: ["Nam học", "Thận - Tiết niệu"] },
        { id: 10, name: "TS. BS. PHẠM ĐĂNG KHOA", specialization: ["Thần kinh", "Sức khỏe tâm thần"] },
        { id: 11, name: "PGS. TS. TRẦN NHẬT MINH", specialization: ["Tai Mũi Họng", "Hô hấp - Phổi"] },
        { id: 12, name: "TS. BS. TRẦN THỊ THANH", specialization: ["Y học Cổ truyền", "Châm cứu"] },
        { id: 13, name: "PGS. TS. LÊ QUANG ĐẠO", specialization: ["Chuyên khoa Mắt"] },
        { id: 14, name: "TS. BS. NGUYỄN KIM CHI", specialization: ["Ung bướu", "Chuyên khoa Vú"] },
        { id: 15, name: "PGS. TS. PHẠM VĂN ĐỨC", specialization: ["Cộng hưởng từ", "Cắt lớp vi tính", "Chụp X-quang"] },
        { id: 16, name: "TS. BS. ĐẶNG HỒNG ANH", specialization: ["Vô sinh - Hiếm muộn", "Sản Phụ khoa"] },
        { id: 17, name: "PGS. TS. VŨ MINH QUÂN", specialization: ["Phục hồi chức năng", "Ngoại khoa"] },
        { id: 18, name: "TS. BS. TRẦN THANH TÂM", specialization: ["Trị liệu Tâm lý", "Sức khỏe tâm thần"] },
        { id: 19, name: "PGS. TS. LÊ HỒNG ĐĂNG", specialization: ["Nha khoa", "Niềng răng", "Bọc răng sứ"] },
        { id: 20, name: "TS. BS. HOÀNG BẢO LONG", specialization: ["Trồng răng Implant", "Nhổ răng khôn", "Nha khoa tổng quát"] },
        { id: 21, name: "BS. Nguyễn Văn An", specialization: ["Nha khoa trẻ em", "Nha khoa"] },
        { id: 22, name: "BS. Trần Thị Bình", specialization: ["Tuyến giáp"] },
        { id: 23, name: "BS. Lê Văn Cường", specialization: ["Dị ứng miễn dịch"] },
        { id: 24, name: "BS. Phạm Thị Dung", specialization: ["Truyền nhiễm"] },
        { id: 25, name: "BS. Hoàng Văn Em", specialization: ["Cơ Xương Khớp"] },
        { id: 26, name: "BS. Phan Thị Giang", specialization: ["Thần kinh"] },
        { id: 27, name: "BS. Vũ Văn Hải", specialization: ["Tiêu hóa"] },
        { id: 28, name: "BS. Đặng Thị Hoa", specialization: ["Tim mạch"] },
        { id: 29, name: "BS. Bùi Văn Hùng", specialization: ["Tai Mũi Họng"] },
        { id: 30, name: "BS. Đỗ Thị Lan", specialization: ["Cột sống"] },
        { id: 31, name: "BS. Ngô Văn Minh", specialization: ["Y học Cổ truyền"] },
        { id: 32, name: "BS. Lý Thị Ngọc", specialization: ["Châm cứu"] },
        { id: 33, name: "BS. Dương Văn Phúc", specialization: ["Sản Phụ khoa"] },
        { id: 34, name: "BS. Đào Thị Quỳnh", specialization: ["Siêu âm thai"] },
        { id: 35, name: "BS. Hà Văn Sơn", specialization: ["Nhi khoa"] },
        { id: 36, name: "BS. Chu Thị Trang", specialization: ["Da liễu"] },
        { id: 37, name: "BS. Đoàn Văn Tú", specialization: ["Bệnh Viêm gan"] },
        { id: 38, name: "BS. Lâm Thị Uyên", specialization: ["Sức khỏe tâm thần"] },
        { id: 39, name: "BS. Trịnh Văn Việt", specialization: ["Dị ứng miễn dịch"] },
        { id: 40, name: "BS. Phùng Thị Xuân", specialization: ["Hô hấp - Phổi"] },
        { id: 41, name: "BS. Mai Văn Yên", specialization: ["Ngoại thần kinh"] },
        { id: 42, name: "BS. Cao Thị Anh", specialization: ["Nam học"] },
        { id: 43, name: "BS. Đinh Văn Bắc", specialization: ["Chuyên khoa Mắt"] },
        { id: 44, name: "BS. Kim Thị Chúc", specialization: ["Thận - Tiết niệu"] },
        { id: 45, name: "BS. Quách Văn Danh", specialization: ["Nội khoa"] },
        { id: 46, name: "BS. Lương Thị Đào", specialization: ["Nha khoa"] },
        { id: 47, name: "BS. Nghiêm Văn Gia", specialization: ["Tiểu đường - Nội tiết"] },
        { id: 48, name: "BS. Tạ Thị Hằng", specialization: ["Phục hồi chức năng"] },
        { id: 49, name: "BS. Vi Văn Hỷ", specialization: ["Cộng hưởng từ"] },
        { id: 50, name: "BS. Diệp Thị Ích", specialization: ["Cắt lớp vi tính"] },
        { id: 51, name: "BS. Kha Văn Kỷ", specialization: ["Nội soi Tiêu hóa"] },
        { id: 52, name: "BS. Nông Thị Liên", specialization: ["Ung bướu"] },
        { id: 53, name: "BS. Âu Văn Mạnh", specialization: ["Da liễu thẩm mỹ"] },
        { id: 54, name: "BS. Bế Thị Nga", specialization: ["Truyền nhiễm"] },
        { id: 55, name: "BS. Lục Văn Oanh", specialization: ["Thẩm mỹ"] },
        { id: 56, name: "BS. Mạc Thị Phương", specialization: ["Trị liệu Tâm lý"] },
        { id: 57, name: "BS. Thạch Văn Quân", specialization: ["Vô sinh - Hiếm muộn"] },
        { id: 58, name: "BS. La Thị Rinh", specialization: ["Chấn thương"] },
        { id: 59, name: "BS. Kiều Văn Sang", specialization: ["Niềng răng", "Nha khoa"] },
        { id: 60, name: "BS. Lều Thị Thảo", specialization: ["Bọc răng sứ", "Nha khoa"] },
        { id: 61, name: "BS. Văn Văn Uẩn", specialization: ["Trồng răng Implant", "Nha khoa"] },
        { id: 62, name: "BS. Khổng Thị Vân", specialization: ["Nhổ răng khôn", "Nha khoa"] },
        { id: 63, name: "BS. Sầm Văn Xuyên", specialization: ["Nha khoa tổng quát", "Nha khoa"] },
        { id: 64, name: "BS. Tòng Thị Ý", specialization: ["Nha khoa trẻ em", "Nha khoa"] },
        { id: 65, name: "BS. Bạc Văn Zui", specialization: ["Tuyến giáp"] },
        { id: 130, name: "BS. Trương Minh Nhật", specialization: ["Bác sĩ Thần kinh từ xa"] }
    ];

    useEffect(() => {
        const data = sessionStorage.getItem("myAppointments");
        if (data) {
            try {
                const appointments = JSON.parse(data);
                if (appointments.length > 0) {
                    const latestDoctor = appointments[appointments.length - 1].doctorName;
                    setUsername(latestDoctor);
                }
            } catch (e) { console.error(e); }
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault(); 
        
        // BIẾN ĐÃ FIX: dùng fixedDoctors thay vì doctorsData
        const found = fixedDoctors.find(dr => 
            dr.name === username && username === password
        );
        
        if (found) {
            window.localStorage.setItem("doctorId", found.id);
            window.localStorage.setItem("doctorName", found.name);
            window.localStorage.setItem("doctorSpec", found.specialization.join(", "));
            window.localStorage.setItem("role", "doctor");
            alert(`Chào bác sĩ ${found.name}! Đăng nhập thành công.`);
            history.push("/doctor/dashboard"); 
        } else {
            alert("Tên bác sĩ hoặc mật khẩu không đúng. Lưu ý: Mật khẩu chính là tên bác sĩ!");
        }
    };

    return (
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", minHeight: "100vh", backgroundColor: "#1a1a1a" }}>
            <Navbar />
            <div style={{ display: "flex", alignItems: "center", padding: "50px 0" }}>
                <Container>
                    <Row className="justify-content-center m-0">
                        <Col md="5" className="bg-white p-4 shadow-lg" style={{ borderRadius: "15px" }}>
                            <div className="text-center mb-4">
                                <h4 className="text-dark font-weight-bold">BÁC SĨ ĐĂNG NHẬP</h4>
                                <div style={{ height: "3px", width: "50px", backgroundColor: "#007bff", margin: "10px auto" }}></div>
                            </div>
                            <Form onSubmit={handleLogin}>
                                <FormGroup>
                                    <Label className="text-dark font-weight-bold">Bác sĩ trực</Label>
                                    <Input 
                                        type="text" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Nhập tên bác sĩ"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="mt-3">
                                    <Label className="text-dark font-weight-bold">Mật khẩu xác nhận</Label>
                                    <Input 
                                        type="password" 
                                        placeholder="Mật khẩu là tên bác sĩ" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                </FormGroup>
                                <Button color="primary" block className="mt-4 py-2 font-weight-bold" type="submit">
                                    VÀO BẢNG ĐIỀU KHIỂN
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default DoctorLogin;