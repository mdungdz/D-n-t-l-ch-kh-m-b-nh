import React, { useState, useEffect } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; 
import { Table, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";

const ALL_DOCTORS = [
    { name: "GS. TS. NGUYỄN MẠNH DŨNG" }, { name: "PGS. TS. PHẠM MINH TUẤN" }, { name: "TS. BS. LÊ THU HÀ" },
    { name: "PGS. TS. NGUYỄN THU HÀ" }, { name: "TS. BS. VŨ HOÀNG YẾN" }, { name: "PGS. TS. TRỊNH CÔNG SƠN" },
    { name: "TS. BS. ALEX NGUYỄN" }, { name: "PGS. TS. HOÀNG VĂN THÁI" }, { name: "TS. BS. LÊ HOÀNG NAM" },
    { name: "TS. BS. PHẠM ĐĂNG KHOA" }, { name: "PGS. TS. TRẦN NHẬT MINH" }, { name: "TS. BS. TRẦN THỊ THANH" },
    { name: "PGS. TS. LÊ QUANG ĐẠO" }, { name: "TS. BS. NGUYỄN KIM CHI" }, { name: "PGS. TS. PHẠM VĂN ĐỨC" },
    { name: "TS. BS. ĐẶNG HỒNG ANH" }, { name: "PGS. TS. VŨ MINH QUÂN" }, { name: "TS. BS. TRẦN THANH TÂM" },
    { name: "PGS. TS. LÊ HỒNG ĐĂNG" }, { name: "TS. BS. HOÀNG BẢO LONG" }, { name: "BS. Nguyễn Văn An" },
    { name: "BS. Trần Thị Bình" }, { name: "BS. Lê Văn Cường" }, { name: "BS. Phạm Thị Dung" },
    { name: "BS. Hoàng Văn Em" }, { name: "BS. Phan Thị Giang" }, { name: "BS. Vũ Văn Hải" },
    { name: "BS. Đặng Thị Hoa" }, { name: "BS. Bùi Văn Hùng" }, { name: "BS. Đỗ Thị Lan" },
    { name: "BS. Ngô Văn Minh" }, { name: "BS. Lý Thị Ngọc" }, { name: "BS. Dương Văn Phúc" },
    { name: "BS. Đào Thị Quỳnh" }, { name: "BS. Hà Văn Sơn" }, { name: "BS. Chu Thị Trang" },
    { name: "BS. Đoàn Văn Tú" }, { name: "BS. Lâm Thị Uyên" }, { name: "BS. Trịnh Văn Việt" },
    { name: "BS. Phùng Thị Xuân" }, { name: "BS. Mai Văn Yên" }, { name: "BS. Cao Thị Anh" },
    { name: "BS. Đinh Văn Bắc" }, { name: "BS. Kim Thị Chúc" }, { name: "BS. Quách Văn Danh" },
    { name: "BS. Lương Thị Đào" }, { name: "BS. Nghiêm Văn Gia" }, { name: "BS. Tạ Thị Hằng" },
    { name: "BS. Vi Văn Hỷ" }, { name: "BS. Diệp Thị Ích" }, { name: "BS. Kha Văn Kỷ" },
    { name: "BS. Nông Thị Liên" }, { name: "BS. Âu Văn Mạnh" }, { name: "BS. Bế Thị Nga" },
    { name: "BS. Lục Văn Oanh" }, { name: "BS. Mạc Thị Phương" }, { name: "BS. Thạch Văn Quân" },
    { name: "BS. La Thị Rinh" }, { name: "BS. Kiều Văn Sang" }, { name: "BS. Lều Thị Thảo" },
    { name: "BS. Văn Văn Uẩn" }, { name: "BS. Khổng Thị Vân" }, { name: "BS. Sầm Văn Xuyên" },
    { name: "BS. Tòng Thị Ý" }, { name: "BS. Bạc Văn Zui" }, { name: "BS. Nguyễn Kiều Chinh" },
    { name: "BS. Phạm Minh Đăng" }, { name: "BS. Lê Thị Diễm" }, { name: "BS. Hoàng Ngọc Duy" },
    { name: "BS. Trần Hoài Giang" }, { name: "BS. Nguyễn Nhật Huy" }, { name: "BS. Vũ Thu Huyền" },
    { name: "BS. Phan Bảo Khánh" }, { name: "BS. Đặng Thụy Lâm" }, { name: "BS. Bùi Khánh Ly" },
    { name: "BS. Đỗ Hoàng Long" }, { name: "BS. Ngô Thanh Nga" }, { name: "BS. Lý Hồng Nhung" },
    { name: "BS. Dương Tuấn Phong" }, { name: "BS. Đào Minh Quân" }, { name: "BS. Hà Kiều Anh" },
    { name: "BS. Chu Minh Sang" }, { name: "BS. Đoàn Thu Thủy" }, { name: "BS. Lâm Bảo Tín" },
    { name: "BS. Trịnh Uyên Thư" }, { name: "BS. Phùng Thế Vinh" }, { name: "BS. Cao Thanh Xuân" },
    { name: "BS. Đinh Trọng Hiếu" }, { name: "BS. Kim Bảo Ngân" }, { name: "BS. Quách Tuấn Kiệt" },
    { name: "BS. Lương Minh Triết" }, { name: "BS. Nghiêm Thùy Chi" }, { name: "BS. Tạ Anh Dũng" },
    { name: "BS. Vi Kim Liên" }, { name: "BS. Diệp Bảo Ngọc" }, { name: "BS. Kha Chấn Đông" },
    { name: "BS. Nông Thúy Hằng" }, { name: "Âu Minh Tuấn" }, { name: "Bế Thanh Huyền" },
    { name: "Lục Bảo Nam" }, { name: "ThS. BS. Nguyễn Hoài An" }, { name: "Chuyên gia Lê Minh Tâm" },
    { name: "BS. Trịnh Thúy Quỳnh" }, { name: "ThS. Đỗ Tuấn Kiệt" }, { name: "PGS. TS. Trần Bảo Ngọc" },
    { name: "BS. Vũ Hoàng Long" }, { name: "Chuyên gia Hà Anh Tuấn" }, { name: "BS. Phan Thanh Thảo" },
    { name: "BS. Nguyễn Minh Đức" }, { name: "ThS. BS. Lê Thu Trang" }, { name: "BS. Hoàng Gia Bảo" },
    { name: "BS. Phạm Minh Anh" }, { name: "PGS. TS. Đặng Hữu Nam" }, { name: "BS. Trần Văn Hùng" },
    { name: "BS. Lý Thanh Hằng" }, { name: "ThS. BS. Ngô Quốc Việt" }, { name: "BS. Bùi Minh Tuấn" },
    { name: "BS. Đỗ Hồng Liên" }, { name: "TS. BS. Võ Văn Kiệt" }, { name: "BS. Nguyễn Thái Sơn" },
    { name: "ThS. BS. Đào Mỹ Linh" }, { name: "BS. Trần Nhật Hoàng" }, { name: "BS. Lê Quang Vinh" },
    { name: "BS. Nguyễn Thị Tâm" }, { name: "TS. BS. Phạm Gia Huy" }, { name: "BS. Đặng Thu Thủy" },
    { name: "BS. Phan Văn Trị" }, { name: "PGS. TS. Lâm Thế Vinh" }, { name: "Chuyên gia Hà Kim Chi" },
    { name: "BS. Trương Minh Nhật" }
];

const AppointmentStatus = () => {
    const [appointments, setAppointments] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail"); 
        
        if (!userEmail) {
            console.error("Không tìm thấy email người dùng!");
            return;
        }

        // GỌI ĐÚNG LINK BACKEND ĐÃ SỬA
        fetch(`http://localhost:5000/appointments?bookedBy=${userEmail}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setAppointments(data);
                }
            })
            .catch(err => console.error("Lỗi lấy lịch:", err));
    }, []);

    const formatCurrency = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num || 0);

    const displayDoctorName = (inputName) => {
        if (!inputName) return "Bác sĩ chuyên khoa";
        const cleanInput = inputName.replace(/^(BS\.|GS\.|TS\.|PGS\.|ThS\.|Chuyên gia)\s+/i, "").toUpperCase().trim();
        const matched = ALL_DOCTORS.find(doc => doc.name.toUpperCase().includes(cleanInput));
        return matched ? matched.name : (inputName.includes(".") ? inputName : `BS. ${inputName}`);
    };

    const deleteAppointment = (index) => {
        const targetApp = appointments[index];
        const appId = targetApp._id || targetApp.id;

        if (window.confirm("Xác nhận xóa lịch hẹn này?")) {
            fetch(`http://localhost:5000/appointments/${appId}`, {
                method: "DELETE",
            })
            .then(res => {
                if (res.ok) {
                    const updatedApps = appointments.filter((_, i) => i !== index);
                    setAppointments(updatedApps);
                    alert("Đã xóa vĩnh viễn lịch hẹn!");
                }
            })
            .catch(err => alert("Không thể kết nối đến server."));
        }
    };

    const goToPayment = (app) => {
        history.push({
            pathname: "/patient/payment",
            state: { 
                appointment: {
                    ...app,
                    fee: app.fee || app.amount || 450000 
                }
            }
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "#f8fafc" }}>
            <Navbar />
            <div style={{ display: "flex", flex: 1, width: "100%", overflow: "hidden" }}>
                <div style={{ width: "280px", minWidth: "280px", backgroundColor: "#0f172a" }}>
                    <Leftside />
                </div>

                <div style={{ flex: 1, height: "100%", overflowY: "auto", borderLeft: "6px solid #fdbb2d", display: "flex", flexDirection: "column" }}>
                    <div className="container-fluid p-0" style={{ width: "100%", padding: "40px" }}>
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <div>
                                <h3 className="font-weight-bold text-dark mb-1 text-uppercase" style={{ letterSpacing: "1px" }}>🏥 Trạng thái lịch hẹn</h3>
                                <div style={{ height: "5px", width: "40px", background: "#fdbb2d", borderRadius: "10px" }}></div>
                            </div>
                            <div className="badge p-2 px-4 text-dark font-weight-bold shadow-sm" style={{ backgroundColor: "#fdbb2d", borderRadius: "5px" }}>LỊCH TRÌNH</div>
                        </div>

                        <div className="card border-0 shadow-sm" style={{ borderRadius: "24px", overflow: "hidden" }}>
                            <div className="p-4 bg-white border-bottom d-flex justify-content-between align-items-center">
                                <h5 className="font-weight-bold mb-0 text-dark">DANH SÁCH LỊCH KHÁM</h5>
                                <small className="text-muted">Tổng số: {appointments.length} lịch hẹn</small>
                            </div>
                            
                            <div style={{ height: "65vh" }} className="p-2">
                                <Scrollbar noScrollX style={{ width: "100%", height: "100%" }}>
                                    <Table hover borderless className="align-middle mb-0">
                                        <thead style={{ backgroundColor: "#f8fafc" }}>
                                            <tr className="text-muted small text-uppercase">
                                                <th className="py-3 px-4">Thời gian</th>
                                                <th className="py-3">Thông tin khám</th>
                                                <th className="py-3">Ghi chú/Lý do</th>
                                                <th className="py-3 text-center">Chi phí</th>
                                                <th className="py-3 text-center">Trạng thái</th>
                                                <th className="py-3 text-center">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.length > 0 ? appointments.map((app, index) => {
                                                const isPaid = app.paymentStatus === "ĐÃ THANH TOÁN" || app.status === "Finished";
                                                let displayTime = app.slotTime || "Chưa có giờ";

                                                return (
                                                    <tr key={index} className="border-bottom">
                                                        <td className="py-4 px-4">
                                                            <span className="d-block font-weight-bold text-dark">{app.date}</span>
                                                            <small className="text-primary font-weight-bold">{displayTime}</small>
                                                        </td>
                                                        <td className="py-4">
                                                            <div className="font-weight-bold text-dark text-uppercase">{app.patientName}</div>
                                                            <small className="text-muted">{displayDoctorName(app.doctorName)}</small>
                                                        </td>
                                                        <td className="py-4">
                                                            <div style={{ maxWidth: "180px", fontSize: "13px", color: "#64748b", fontStyle: "italic" }}>
                                                                {app.description || "Không có ghi chú"}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-center text-danger font-weight-bold">
                                                            {formatCurrency(app.fee || app.amount || 0)}
                                                        </td>
                                                        <td className="py-4 text-center">
                                                            {isPaid ? (
                                                                <span className="badge px-3 py-2" style={{backgroundColor: "#dcfce7", color: "#15803d", borderRadius: "8px"}}>ĐÃ THANH TOÁN</span>
                                                            ) : (
                                                                <span className="badge px-3 py-2" style={{backgroundColor: "#fee2e2", color: "#b91c1c", borderRadius: "8px"}}>CHƯA THANH TOÁN</span>
                                                            )}
                                                        </td>
                                                        <td className="py-4 text-center">
                                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                                {isPaid ? (
                                                                    <Button 
                                                                        color="info" size="sm" className="px-3 shadow-sm font-weight-bold" 
                                                                        style={{ borderRadius: "10px", backgroundColor: "#0ea5e9", border: "none" }} 
                                                                        onClick={() => goToPayment(app)}
                                                                    >
                                                                        XEM BILL
                                                                    </Button>
                                                                ) : (
                                                                    <>
                                                                        <Button 
                                                                            color="warning" size="sm" className="px-3 shadow-sm font-weight-bold text-dark" 
                                                                            style={{ borderRadius: "10px", backgroundColor: "#fdbb2d", border: "none" }} 
                                                                            onClick={() => goToPayment(app)}
                                                                        >
                                                                            THANH TOÁN
                                                                        </Button>
                                                                        <Button 
                                                                            color="link" className="text-danger p-0 font-weight-bold small ms-2" 
                                                                            style={{ textDecoration: "none" }} 
                                                                            onClick={() => deleteAppointment(index)}
                                                                        >
                                                                            XÓA
                                                                        </Button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-5 text-muted">
                                                        <div className="py-5">
                                                            <span style={{ fontSize: "50px", display: "block" }}>📅</span>
                                                            <p>Chưa có dữ liệu lịch hẹn của bạn</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Scrollbar>
                            </div>
                        </div>
                        <div className="mt-5"><Footer /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentStatus;