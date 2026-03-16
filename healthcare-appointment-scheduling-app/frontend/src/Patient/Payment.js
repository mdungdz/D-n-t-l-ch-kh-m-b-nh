import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Table, Row, Col } from "reactstrap";
import Navbar from "../Basic/Navbar";
import LeftsidePatient from "../Dashbaord/LeftsidePatient";
import Scrollbar from "react-scrollbars-custom";
import Footer from "../Basic/Footer";

const Payment = (props) => {
    const location = useLocation();
    const history = useHistory();

    const [modal, setModal] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const myAccountName = window.localStorage.getItem("patientName") || "Bệnh nhân";

    const [lastBooking, setLastBooking] = useState({
        doctorName: "Bác sĩ",
        doctorFees: 0,
        selectedServices: [],
        date: "",
        totalAmount: 0,
        status: "Pending Payment",
        patientName: ""
    });

    const toggle = () => {
        setModal(!modal);
        setShowQR(false);
    };

    const formatCurrency = (num) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num || 0);

    /* ===================== NHẬN DỮ LIỆU TỪ APPOINTMENT STATUS ===================== */
    useEffect(() => {
        const appointmentData = location.state?.appointment;

        if (appointmentData) {
            // Chốt dữ liệu từ state truyền sang
            setLastBooking({
                ...appointmentData,
                // Ưu tiên các trường dữ liệu từ MongoDB (_id, fee, amount)
                id: appointmentData._id || appointmentData.id,
                doctorFees: appointmentData.doctorFees || appointmentData.fee || 0,
                totalAmount: appointmentData.totalAmount || appointmentData.amount || appointmentData.fee || 0,
                patientName: appointmentData.patientName || myAccountName
            });
        } else {
            // Nếu F5, quét lại danh sách trong local để không bị trắng trang
            const appointments = JSON.parse(localStorage.getItem("myAppointments") || "[]");
            const currentApp = appointments.findLast(app => 
                app.status === "Pending Payment" || app.status?.includes("Pending")
            );
            if (currentApp) setLastBooking(currentApp);
        }
    }, [location, myAccountName]);

    /* ===================== LOGIC THANH TOÁN CHỐT DATABASE ===================== */
    const handleConfirm = async (method) => {
    const appointmentId = lastBooking._id || lastBooking.id;

    try {
        // SỬA TẠI ĐÂY: Bỏ "/api" để khớp với server.js của Dũng
        const response = await fetch(`http://localhost:5000/appointments/${appointmentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "Confirmed",
                paymentStatus: "ĐÃ THANH TOÁN",
                paymentMethod: method,
                finishDate: new Date().toLocaleDateString('vi-VN')
            })
        });

        if (!response.ok) throw new Error("Cập nhật Database thất bại");

        // 2. DỌN DẸP LOCALSTORAGE ĐỂ ĐỒNG BỘ UI NGAY LẬP TỨC
        let myApps = JSON.parse(localStorage.getItem("myAppointments") || "[]");
        const updatedMyApps = myApps.filter(app => (app._id || app.id) !== appointmentId);
        localStorage.setItem("myAppointments", JSON.stringify(updatedMyApps));

        window.dispatchEvent(new Event("storage"));

        alert("Thanh toán thành công! Lịch hẹn với " + lastBooking.doctorName + " đã được xác nhận.");
        setModal(false);
        history.push("/patient/appointment-status");

    } catch (error) {
        console.error("Lỗi thanh toán:", error);
        // Thông báo chi tiết hơn để Dũng dễ debug
        alert("Lỗi: Không tìm thấy đường dẫn xử lý trên Server. Dũng kiểm tra xem đã dán hàm router.put('/:id') vào file routes/appointments.js chưa nhé!");
    }
};

    const qrUrl = "../image/QRCode.jpg";
    const isPaid = 
        lastBooking.status === "Confirmed" || 
        lastBooking.status === "Finished" || 
        lastBooking.paymentStatus === "ĐÃ THANH TOÁN";

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#f8fafc" }}>
            <Navbar />
            <div style={{ display: "flex", flex: 1, width: "100%", overflow: "hidden" }}>
                <div style={{ width: "280px", minWidth: "280px", backgroundColor: "#0f172a" }}>
                    <LeftsidePatient />
                </div>

                <div style={{ flex: 1, height: "100%", overflowY: "auto", borderLeft: "6px solid #fdbb2d", display: "flex", flexDirection: "column" }}>
                    <div className="container-fluid p-0" style={{ width: "100%", padding: "40px" }}>
                        
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <div>
                                <h3 className="font-weight-bold text-dark mb-1 text-uppercase" style={{ letterSpacing: "1px" }}>💳 Chi tiết thanh toán</h3>
                                <div style={{ height: "5px", width: "40px", background: "#fdbb2d", borderRadius: "10px" }}></div>
                            </div>
                            <div className="badge p-2 px-4 text-dark font-weight-bold shadow-sm" style={{ backgroundColor: "#fdbb2d", borderRadius: "5px" }}>
                                {isPaid ? "TRẠNG THÁI: ĐÃ THANH TOÁN" : "TRẠNG THÁI: CHỜ THANH TOÁN"}
                            </div>
                        </div>

                        <div className="bg-white p-4 shadow-sm mb-4" style={{ borderRadius: "24px", border: "1px solid #e2e8f0" }}>
                            <div style={{ height: "65vh" }}>
                                <Scrollbar 
                                    noScrollX 
                                    style={{ width: "100%", height: "100%" }}
                                    thumbYProps={{ style: { backgroundColor: '#fdbb2d', borderRadius: '10px' } }}
                                >
                                <div className="p-3">
                                    <div className="bg-light text-dark p-4 p-md-5 rounded shadow-sm w-100 mx-auto"
                                        style={{ maxWidth: "750px", borderTop: "10px solid #0f172a", position: 'relative', borderRadius: "20px" }}
                                    >
                                        {isPaid && (
                                            <div style={{ position: 'absolute', top: '30px', right: '10px', border: '5px solid #10b981', color: '#10b981', padding: '10px 30px', borderRadius: '10px', transform: 'rotate(15deg)', fontWeight: 'bold', fontSize: '30px', opacity: '0.4', zIndex: '10', pointerEvents: 'none' }}>
                                                ĐÃ CHI TRẢ
                                            </div>
                                        )}

                                        <div className="text-center mb-5">
                                            <h3 className="font-weight-bold mb-0 text-dark">HÓA ĐƠN Y TẾ CHI TIẾT</h3>
                                            <small className="text-muted text-uppercase tracking-widest">Hệ thống bệnh viện quốc tế NMD</small>
                                        </div>

                                        <Row className="mb-4 border-bottom pb-3">
                                            <Col xs="6" className="text-left">
                                                <p className="mb-1 text-muted small font-weight-bold text-uppercase">Bệnh nhân:</p>
                                                <h5 className="font-weight-bold text-dark text-uppercase">{lastBooking.patientName}</h5>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <p className="mb-1 text-muted small font-weight-bold text-uppercase">Ngày khám:</p>
                                                <h6 className="font-weight-bold text-dark">{lastBooking.date}</h6>
                                            </Col>
                                        </Row>

                                        <Table borderless className="mt-2 text-dark">
                                            <thead>
                                                <tr className="border-bottom small text-muted font-weight-bold">
                                                    <th className="text-left py-3">DANH MỤC DỊCH VỤ / BÁC SĨ</th>
                                                    <th className="text-right py-3">THÀNH TIỀN</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-left py-3">
                                                        <div className="font-weight-bold">Phí khám chuyên gia</div>
                                                        <small className="text-muted">Bác sĩ: {lastBooking.doctorName}</small>
                                                    </td>
                                                    <td className="text-right align-middle font-weight-bold">
                                                        {formatCurrency(lastBooking.doctorFees)}
                                                    </td>
                                                </tr>

                                                {lastBooking.selectedServices && lastBooking.selectedServices.map((service, index) => (
                                                    <tr key={index}>
                                                        <td className="text-left py-2">
                                                            <div className="font-weight-bold">{service.name}</div>
                                                            <small className="text-muted">Dịch vụ kỹ thuật cao</small>
                                                        </td>
                                                        <td className="text-right align-middle text-success font-weight-bold">+{formatCurrency(service.price)}</td>
                                                    </tr>
                                                ))}

                                                <tr className="h4 font-weight-bold border-top" style={{ backgroundColor: "#fefce8" }}>
                                                    <td className="pt-4 text-dark text-left">TỔNG THANH TOÁN</td>
                                                    <td className="pt-4 text-right text-danger">{formatCurrency(lastBooking.totalAmount)}</td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                        <div className="mt-5 pt-3 d-flex flex-column gap-3">
                                            {!isPaid ? (
                                                <Button color="warning" block className="py-3 font-weight-bold shadow-sm" style={{ borderRadius: "15px", fontSize: "1.1rem" }} onClick={toggle}>
                                                    XÁC NHẬN & THANH TOÁN NGAY
                                                </Button>
                                            ) : (
                                                <Button color="success" block className="py-3 font-weight-bold shadow-sm" style={{ borderRadius: "15px" }} disabled>
                                                    ✓ GIAO DỊCH ĐÃ HOÀN TẤT
                                                </Button>
                                            )}

                                            <Button outline color="dark" block className="py-2 font-weight-bold mt-2" style={{ borderRadius: "15px" }} onClick={() => history.push("/patient/appointment-status")}>
                                                QUAY LẠI QUẢN LÝ
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                </Scrollbar>
                            </div>
                        </div>
                        <div className="mt-5"><Footer /></div>
                    </div>
                </div>
            </div>

            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle} className="border-0 font-weight-bold text-dark text-uppercase">Chọn phương thức</ModalHeader>
                <ModalBody className="p-4 text-center">
                    {!showQR ? (
                        <>
                            <div className="p-4 mb-3 border rounded shadow-sm text-dark item-payment" onClick={() => setShowQR(true)} style={{ cursor: 'pointer', borderRadius: "15px" }}>
                                <h6 className="mb-0 font-weight-bold">🏦 Chuyển khoản VietQR (Nhanh)</h6>
                            </div>
                            <div className="p-4 border rounded shadow-sm text-dark item-payment" onClick={() => handleConfirm("CASH")} style={{ cursor: 'pointer', borderRadius: "15px" }}>
                                <h6 className="mb-0 font-weight-bold">💵 Thanh toán tại quầy</h6>
                            </div>
                        </>
                    ) : (
                        <div>
                            <img src={qrUrl} alt="QR Code" className="img-fluid mb-3 shadow" style={{ maxWidth: '220px', borderRadius: "10px" }} />
                            <h5 className="text-danger font-weight-bold mb-3">{formatCurrency(lastBooking.totalAmount)}</h5>
                            <Button color="success" block className="rounded-pill font-weight-bold py-2" onClick={() => handleConfirm("QR")}>
                                TÔI ĐÃ CHUYỂN KHOẢN XONG
                            </Button>
                        </div>
                    )}
                </ModalBody>
            </Modal>

            <style>{`
                .item-payment:hover { background-color: #fefce8; border-color: #fdbb2d !important; transform: translateY(-3px); transition: 0.3s; }
                .btn-warning { background: #fdbb2d; border: none; color: #000; }
                .btn-warning:hover { background: #eab308; }
            `}</style>
        </div>
    );
};

export default Payment;