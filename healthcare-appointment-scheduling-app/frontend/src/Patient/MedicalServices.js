import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer";
import { Row, Col } from "reactstrap";

// --- GIỮ NGUYÊN TOÀN BỘ IMPORT ---
import coXuongKhopImg from "../image/101627-co-xuong-khop.png";
import thầnKinhImg from "../image/101739-than-kinh.png";
import tieuHoaImg from "../image/101713-tieu-hoa.png";
import timMachImg from "../image/101713-tim-mach.png";
import taiMuiHongImg from "../image/101713-tai-mui-hong.png";
import cotSongImg from "../image/101627-cot-song.png";
import yHocCoTruyenImg from "../image/101739-y-hoc-co-truyen.png";
import chamCuuImg from "../image/101627-cham-cuu.png";
import sanPhuKhoaImg from "../image/101713-san-phu-khoa.png";
import sieuAmThaiImg from "../image/101713-sieu-am-thai.png";
import nhiKhoaImg from "../image/101655-nhi-khoa.png";
import daLieuImg from "../image/101638-da-lieu.png";
import viemGanImg from "../image/101739-viem-gan.png";
import tamThanImg from "../image/101713-suc-khoe-tam-than.png";
import diUngImg from "../image/101638-di-ung-mien-dich.png";
import hoHapImg from "../image/101638-ho-hap-phoi.png";
import ngoaiThanKinhImg from "../image/101655-ngoai-than-kinh.png";
import namHocImg from "../image/101655-nam-hoc.png";
import matImg from "../image/101638-mat.png";
import thanTietNieuImg from "../image/101739-than-tiet-nieu.png";
import noiKhoaImg from "../image/101655-noi-khoa.png";
import nhaKhoaImg from "../image/101655-nha-khoa.png";
import tieuDuongImg from "../image/101713-tieu-duong.png";
import phucHoiChucNangImg from "../image/101713-phuc-hoi-chuc-nang.png";
import congHuongTuImg from "../image/101627-cong-huong-tu.png";
import catLopViTinhImg from "../image/101627-chup-cat-lop.png";
import noiSoiTieuHoaImg from "../image/101655-noi-soi-tieu-hoa.png";
import ungBuouImg from "../image/101739-ung-buou.png";
import daLieuThamMyImg from "../image/101638-da-lieu-tham-my.png";
import truyenNhiemImg from "../image/101739-truyen-nhiem.png";
import thamMyImg from "../image/101713-tao-hinh-ham-mat.png";
import triLieuTamLyImg from "../image/101739-tu-van-tam-ly.png";
import voSinhImg from "../image/101739-vo-sinh-hiem-muon.png";
import chanThuongImg from "../image/101627-chan-thuong-chinh-hinh.png";
import niengRangImg from "../image/101655-nieng-rang.png";
import rangSuImg from "../image/101627-boc-rang-su.png";
import implantImg from "../image/101739-trong-rang.png";
import rangKhonImg from "../image/101655-nho-rang-khon.png";
import nhaKhoaTongQuatImg from "../image/104709-nha-khoa-tong-quat.png";
import nhaKhoaTreEmImg from "../image/101655-nha-khoa-tre-em.png";
import tuyenGiapImg from "../image/101739-tuyen-giap.png";
import vusImg from "../image/115336-vu.png";
import ngoaiKhoaImg from "../image/094443-ngoai-khoa.png";
import xQuangImg from "../image/141654-huyen-icon-chuyen-khoa.png";
import trilieuImg from "../image/160245-tam-ly-tu-xa.png";
import tamthanhImg from "../image/103343-tam-than-tu-xa-1.png";
import dalieuImg from "../image/160245-da-lieu-tu--xa.png";
import cxkImg from "../image/160245-cxk-tu--xa.png";
import tieuhoaImg from "../image/160245-tieu-hoa-tu--xa.png";
import timmachImg from "../image/160245-tim-mach-tu--xa.png";
import taimuihongImg from "../image/160245-tai-mui-hong-tu--xa.png";
import thankinhImg from "../image/160245-than-kinh-tu-xa.png";
import phauThuatNamHocImg from "../image/144537-2.png";
import phauThuatTaiMuiHongImg from "../image/144538-4.png";
import phauThuatHauMonImg from "../image/144538-5.png";
import phauThuatMatImg from "../image/144538-3.png";
import suyGianTinhMachImg from "../image/091513-phau-thuat-than-tiet-nieu.png";
import phauThuatTuyenGiapImg from "../image/101442-f04c6394ce0871562819.jpg";
import xetNghiemTongQuatImg from "../image/181055-bo-sung-icon-goi-khamset-nghiem.png";
import xetNghiemTaiNhaImg from "../image/160139-bo-sung-icon-goi-khamtai-nha.png";
import xetNghiemUngBuouImg from "../image/160123-bo-sung-icon-goi-khamung-thu.png";
import xetNghiemNiptImg from "../image/160159-bo-sung-icon-goi-khambau-1.png";
import xetNghiemSotXuatHuyetImg from "../image/110200-huyen-icon-xet-nghiem.png";
import xetNghiemDiUngImg from "../image/180825-bo-sung-icon-goi-khamdi-ung-1.png";
import xetNghiemGanImg from "../image/160452-bo-sung-icon-goi-khamgan.png";
import xetNghiemCumImg from "../image/160505-bo-sung-icon-goi-khamom-sot.png";
import xetNghiemCovidImg from "../image/160209-bo-sung-icon-goi-khamcovid.png";
import xetNghiemGenImg from "../image/160428-bo-sung-icon-goi-khamgen.png";
import skTamThanImg from "../image/101713-suc-khoe-tam-than.png";
import tuVanTuXaImg from "../image/160245-tam-ly-tu-xa.png";
import skTamThanTuXaImg from "../image/103343-tam-than-tu-xa-1.png";
import tuVanTrucTiepImg from "../image/101739-tu-van-tam-ly.png";
import tongQuat1 from "../image/095749-khamtongquat.png"; 
import tongQuat2 from "../image/101925-iconkhamvip.png";
import tongQuat3 from "../image/181055-bo-sung-icon-goi-khamset-nghiem.png";
import tongQuat4 from "../image/095756-nam.png";
import tongQuat5 from "../image/095828-nu.png";
import tongQuat6 from "../image/095850-trem.png";
import tongQuat7 from "../image/095812-nguoigia.png";
import tongQuat8 from "../image/095844-tienhonnhan.png";
import tongQuat9 from "../image/095836-tamsoatungthu.png";
import tongQuat10 from "../image/095855-ungthuvu.png";
import tongQuat11 from "../image/093823-icon1-2.png";
import tongQuat12 from "../image/093824-icon21.png";

const MedicalServices = () => {
    const history = useHistory();
    const [showSpecialties, setShowSpecialties] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showRemote, setShowRemote] = useState(false); 
    const [showSurgery, setShowSurgery] = useState(false); 
    const [showTesting, setShowTesting] = useState(false); 
    const [showMentalHealth, setShowMentalHealth] = useState(false); 
    const [showGeneralHealth, setShowGeneralHealth] = useState(false); 

    const services = [
        { id: 'chuyen-khoa', title: "Khám Chuyên khoa", icon: "🏥", color: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" },
        { id: 'tu-xa', title: "Khám từ xa", icon: "📱", color: "linear-gradient(135deg, #059669 0%, #10b981 100%)" },
        { id: 'tong-quat', title: "Khám tổng quát", icon: "📋", color: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)" },
        { id: 'xet-nghiem', title: "Xét nghiệm y học", icon: "🧪", color: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)" },
        { id: 'tinh-than', title: "Sức khỏe tinh thần", icon: "🧠", color: "linear-gradient(135deg, #db2777 0%, #ec4899 100%)" },
        { id: 'nha-khoa', title: "Khám nha khoa", icon: "🦷", color: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)" },
        { id: 'phau-thuat', title: "Gói Phẫu thuật", icon: "🏗️", color: "linear-gradient(135deg, #4b5563 0%, #6b7280 100%)" },
        { id: 'tieu-duong', title: "Sống khỏe Tiểu đường", icon: "💉", color: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)" },
    ];

    const specialties = [
        { name: "Cơ Xương Khớp", img: coXuongKhopImg, note: "Khám xương khớp & cột sống" },
        { name: "Thần kinh", img: thầnKinhImg, note: "Sức khỏe não bộ & tiền đình" },
        { name: "Tiêu hóa", img: tieuHoaImg, note: "Dạ dày, đại tràng, gan mật" },
        { name: "Tim mạch", img: timMachImg, note: "Huyết áp, bệnh lý tim mạch" },
        { name: "Tai Mũi Họng", img: taiMuiHongImg, note: "Khám tai mũi họng người lớn & trẻ em" },
        { name: "Cột sống", img: cotSongImg, note: "Thoát vị đĩa đệm, đau lưng" },
        { name: "Y học Cổ truyền", img: yHocCoTruyenImg, note: "Khám bằng phương pháp đông y" },
        { name: "Châm cứu", img: chamCuuImg, note: "Trị liệu bằng châm cứu, bấm huyệt" },
        { name: "Sản Phụ khoa", img: sanPhuKhoaImg, note: "Sức khỏe phụ nữ & thai sản" },
        { name: "Siêu âm thai", img: sieuAmThaiImg, note: "Siêu âm định kỳ cho mẹ bầu" },
        { name: "Nhi khoa", img: nhiKhoaImg, note: "Khám sức khỏe cho trẻ em" },
        { name: "Da liễu", img: daLieuImg, note: "Điều trị các bệnh lý về da" },
        { name: "Bệnh Viêm gan", img: viemGanImg, note: "Chuyên khoa gan mật" },
        { name: "Sức khỏe tâm thần", img: tamThanImg, note: "Tư vấn tâm lý & tâm thần học" },
        { name: "Dị ứng miễn dịch", img: diUngImg, note: "Điều trị dị ứng & hệ miễn dịch" },
        { name: "Hô hấp - Phổi", img: hoHapImg, note: "Khám phổi & đường hô hấp" },
        { name: "Ngoại thần kinh", img: ngoaiThanKinhImg, note: "Phẫu thuật & điều trị thần kinh" },
        { name: "Nam học", img: namHocImg, note: "Sức khỏe nam giới" },
        { name: "Chuyên khoa Mắt", img: matImg, note: "Khám & đo thị lực" },
        { name: "Thận - Tiết niệu", img: thanTietNieuImg, note: "Bệnh lý thận & hệ tiết niệu" },
        { name: "Nội khoa", img: noiKhoaImg, note: "Khám nội tổng quát" },
        { name: "Nha khoa", img: nhaKhoaImg, note: "Răng hàm mặt thẩm mỹ" },
        { name: "Tiểu đường - Nội tiết", img: tieuDuongImg, note: "Điều trị tiểu đường & nội tiết" },
        { name: "Phục hồi chức năng", img: phucHoiChucNangImg, note: "Vật lý trị liệu & phục hồi" },
        { name: "Cộng hưởng từ", img: congHuongTuImg, note: "Chụp cộng hưởng từ MRI" },
        { name: "Cắt lớp vi tính", img: catLopViTinhImg, note: "Chụp cắt lớp CT-Scan" },
        { name: "Nội soi Tiêu hóa", img: noiSoiTieuHoaImg, note: "Nội soi dạ dày, đại tràng" },
        { name: "Ung bướu", img: ungBuouImg, note: "Tầm soát & điều trị ung thư" },
        { name: "Da liễu thẩm mỹ", img: daLieuThamMyImg, note: "Chăm sóc da & thẩm mỹ da" },
        { name: "Truyền nhiễm", img: truyenNhiemImg, note: "Bệnh truyền nhiễm & virus" },
        { name: "Thẩm mỹ", img: thamMyImg, note: "Phẫu thuật thẩm mỹ" },
        { name: "Trị liệu Tâm lý", img: triLieuTamLyImg, note: "Tư vấn & trị liệu tâm lý" },
        { name: "Vô sinh - Hiếm muộn", img: voSinhImg, note: "Hỗ trợ sinh sản" },
        { name: "Chấn thương", img: chanThuongImg, note: "Cấp cứu & điều trị chấn thương" },
        { name: "Niềng răng", img: niengRangImg, note: "Chỉnh nha thẩm mỹ" },
        { name: "Bọc răng sứ", img: rangSuImg, note: "Phục hình răng sứ chuyên sâu" },
        { name: "Trồng răng Implant", img: implantImg, note: "Phục hồi răng đã mất" },
        { name: "Nhổ răng khôn", img: rangKhonImg, note: "Tiểu phẫu răng khôn an toàn" },
        { name: "Nha khoa tổng quát", img: nhaKhoaTongQuatImg, note: "Chăm sóc răng miệng định kỳ" },
        { name: "Nha khoa trẻ em", img: nhaKhoaTreEmImg, note: "Chăm sóc răng nhi khoa" },
        { name: "Tuyến giáp", img: tuyenGiapImg, note: "Bệnh lý tuyến giáp & nội tiết" },
        { name: "Chuyên khoa Vú", img: vusImg, note: "Tầm soát & khám bệnh lý tuyến vú" },
        { name: "Ngoại khoa", img: ngoaiKhoaImg, note: "Phẫu thuật ngoại khoa tổng quát" },
        { name: "Chụp X-quang", img: xQuangImg, note: "Chẩn đoán hình ảnh X-quang" }
    ];

    const remoteServices = [
        { name: "Tư vấn, trị liệu Tâm lý từ xa", img: trilieuImg, note: "Trị liệu tâm lý qua video call" },
        { name: "Sức khỏe tâm thần từ xa", img: tamthanhImg, note: "Khám sức khỏe não bộ online" },
        { name: "Bác sĩ Da liễu từ xa", img: dalieuImg, note: "Tư vấn bệnh lý da liễu qua ảnh/video" },
        { name: "Bác sĩ Cơ-Xương-Khớp từ xa", img: cxkImg, note: "Tư vấn đau nhức xương khớp" },
        { name: "Bác sĩ Tiêu hóa từ xa", img: tieuhoaImg, note: "Dạ dày, đại tràng, gan mật" },
        { name: "Bác sĩ Tim mạch từ xa", img: timmachImg, note: "Huyết áp, bệnh lý tim mạch" },
        { name: "Bác sĩ Tai Mũi Họng từ xa", img: taimuihongImg, note: "Khám tai mũi họng người lớn & trẻ em" },
        { name: "Bác sĩ Thần kinh từ xa", img: thankinhImg, note: "Khám tiền đình, đau đầu" }
    ];

    const surgeryServices = [
        { name: "Phẫu thuật Nam học", img: phauThuatNamHocImg, note: "Cắt bao quy đầu, điều trị nam khoa" },
        { name: "Phẫu thuật Tai - Mũi - Họng", img: phauThuatTaiMuiHongImg, note: "Cắt Amidan, nạo VA, vẹo vách ngăn" },
        { name: "Phẫu thuật Hậu môn - Trực tràng", img: phauThuatHauMonImg, note: "Phẫu thuật Trĩ, rò hậu môn" },
        { name: "Phẫu thuật mắt", img: phauThuatMatImg, note: "Thay thủy tinh thể, mổ cận" },
        { name: "Thủ thuật Suy giãn tĩnh mạch", img: suyGianTinhMachImg, note: "Tiêm xơ, laser tĩnh mạch" },
        { name: "Phẫu thuật tuyến giáp", img: phauThuatTuyenGiapImg, note: "Mổ u tuyến giáp, bướu cổ" }
    ];

    const testingServices = [
        { name: "Tổng quát", img: xetNghiemTongQuatImg, note: "Xét nghiệm máu, nước tiểu cơ bản" },
        { name: "Tại nhà", img: xetNghiemTaiNhaImg, note: "Lấy mẫu xét nghiệm tận nơi" },
        { name: "Ung thư", img: xetNghiemUngBuouImg, note: "Tầm soát dấu ấn ung thư" },
        { name: "NIPT", img: xetNghiemNiptImg, note: "Sàng lọc trước sinh không xâm lấn" },
        { name: "Sốt xuất huyêt", img: xetNghiemSotXuatHuyetImg, note: "Chẩn đoán nhanh vi rút Dengue" },
        { name: "Dị ứng", img: xetNghiemDiUngImg, note: "Tìm nguyên nhân gây dị ứng" },
        { name: "Gan", img: xetNghiemGanImg, note: "Kiểm tra chức năng gan & Viêm gan" },
        { name: "Cúm và Sốt", img: xetNghiemCumImg, note: "Xét nghiệm cúm A, B, sốt siêu vi" },
        { name: "Covid", img: xetNghiemCovidImg, note: "Test nhanh & PCR Covid-19" },
        { name: "Gen", img: xetNghiemGenImg, note: "Giải mã gen & di truyền học" }
    ];

    const mentalHealthServices = [
        { name: "Sức khỏe tâm thần", img: skTamThanImg, note: "Khám và điều trị các rối loạn tâm thần" },
        { name: "Tư vấn, trị liệu Tâm lý từ xa", img: tuVanTuXaImg, note: "Tư vấn tâm lý qua cuộc gọi video" },
        { name: "Sức khỏe tâm thần từ xa", img: skTamThanTuXaImg, note: "Khám tâm thần trực tuyến tiện lợi" },
        { name: "Tư vấn, trị liệu Tâm lý", img: tuVanTrucTiepImg, note: "Trị liệu tâm lý trực tiếp với chuyên gia" }
    ];

    const generalHealthServices = [
        { name: "Cơ bản", img: tongQuat1 },
        { name: "Gói khám VIP", img: tongQuat2 },
        { name: "Nâng cao", img: tongQuat3 },
        { name: "Nam", img: tongQuat4 },
        { name: "Nữ", img: tongQuat5 },
        { name: "Trẻ em", img: tongQuat6 },
        { name: "Người già", img: tongQuat7 },
        { name: "Tiền hôn nhân", img: tongQuat8 },
        { name: "Tầm soát ung thư", img: tongQuat9 },
        { name: "Tầm soát ung thư vú", img: tongQuat10 },
        { name: "Tầm soát tiêu hóa", img: tongQuat11 },
        { name: "Bệnh lý chung", img: tongQuat12 }
    ];

    const currentData = showRemote ? remoteServices 
                     : showSurgery ? surgeryServices 
                     : showTesting ? testingServices 
                     : showMentalHealth ? mentalHealthServices 
                     : showGeneralHealth ? generalHealthServices 
                     : specialties;

    const filteredData = currentData.filter(item => 
        (item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#f8fafc" }}>
            <Navbar />
            <div style={{ display: "flex", flex: 1, width: "100%", overflow: "hidden" }}>
                <div style={{ width: "280px", minWidth: "280px", backgroundColor: "#0f172a" }}>
                    <Leftside />
                </div>

                <div style={{ flex: 1, height: "100%", overflowY: "auto", borderLeft: "6px solid #fdbb2d", display: "flex", flexDirection: "column" }}>
                    <div className="container-fluid p-0" style={{ width: "100%", padding: "40px" }}>
                        
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <div>
                                <h3 className="font-weight-bold text-dark mb-1 text-uppercase" style={{ letterSpacing: "1px" }}>
                                    {showSpecialties ? "📋 Danh sách chuyên khoa" : showRemote ? "📱 Khám bệnh từ xa" : showSurgery ? "🏗️ Gói phẫu thuật" : showTesting ? "🧪 Xét nghiệm y học" : showMentalHealth ? "🧠 Sức khỏe tinh thần" : showGeneralHealth ? "📋 Khám tổng quát" : "✨ Dịch vụ toàn diện"}
                                </h3>
                                <div style={{ height: "5px", width: "40px", background: "#fdbb2d", borderRadius: "10px" }}></div>
                                {(showSpecialties || showRemote || showSurgery || showTesting || showMentalHealth || showGeneralHealth) && (
                                    <button className="btn btn-sm mt-3 text-primary font-weight-bold p-0" onClick={() => {setShowSpecialties(false); setShowRemote(false); setShowSurgery(false); setShowTesting(false); setShowMentalHealth(false); setShowGeneralHealth(false); setSearchTerm("");}}>
                                        ← Quay lại dịch vụ chính
                                    </button>
                                )}
                            </div>
                            <div className="badge p-2 px-4 text-dark font-weight-bold shadow-sm" style={{ backgroundColor: "#fdbb2d", borderRadius: "5px" }}>2026 SYSTEM</div>
                        </div>

                        {(!showSpecialties && !showRemote && !showSurgery && !showTesting && !showMentalHealth && !showGeneralHealth) ? (
                            <Row className="mx-0 g-4">
                                {services.map((item) => (
                                    <Col md="6" lg="3" key={item.id} className="mb-4 d-flex">
                                        <div 
                                            className="card border-0 shadow-sm text-white p-4 w-100 stat-card" 
                                            onClick={() => {
                                                setShowSpecialties(false);
                                                setShowRemote(false);
                                                setShowSurgery(false);
                                                setShowTesting(false);
                                                setShowMentalHealth(false);
                                                setShowGeneralHealth(false);

                                                if (item.id === 'chuyen-khoa') setShowSpecialties(true);
                                                else if (item.id === 'tu-xa') setShowRemote(true);
                                                else if (item.id === 'phau-thuat') setShowSurgery(true);
                                                else if (item.id === 'xet-nghiem') setShowTesting(true);
                                                else if (item.id === 'tinh-than') setShowMentalHealth(true);
                                                else if (item.id === 'tong-quat') setShowGeneralHealth(true); 
                                                else history.push(`/patient/searchdoctor?type=${item.id}`);
                                            }}
                                            style={{ borderRadius: "24px", background: item.color, position: "relative", overflow: "hidden", cursor: "pointer", minHeight: "160px" }}
                                        >
                                            <div className="stat-icon-bg">{item.icon}</div>
                                            <h4 className="font-weight-bold mb-0" style={{ fontSize: "20px", position: "relative", zIndex: 2 }}>{item.title}</h4>
                                            <div className="mt-3 small px-3 py-1 d-inline-block" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px", width: "fit-content" }}>Khám ngay →</div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <>
                                <div className="mb-4 px-3">
                                    <div style={{ position: "relative", maxWidth: "400px" }}>
                                        <input 
                                            type="text" 
                                            className="form-control shadow-sm border-0" 
                                            placeholder="Tìm kiếm..." 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{ borderRadius: "30px", padding: "12px 20px 12px 45px", fontSize: "14px" }}
                                        />
                                        <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", opacity: 0.5 }}>🔍</span>
                                    </div>
                                </div>

                                <Row className="mx-0 g-3">
                                    {filteredData.length > 0 ? (
                                        filteredData.map((spec, index) => (
                                            <Col md="3" key={index} className="mb-4">
                                                <div 
                                                    className="bg-white border shadow-sm specialty-box h-100"
                                                    onClick={() => {
                                                        // --- PHẦN CHỐT: XỬ LÝ CHUỖI ĐỂ HIỆN GÓI ---
                                                        const subType = (spec.name || "")
                                                            .toLowerCase()
                                                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Bỏ dấu
                                                            .replace(/[^a-z0-9]/g, "-") // Thay ký tự lạ bằng -
                                                            .replace(/-+/g, "-") // Nối các dấu - liên tiếp
                                                            .replace(/^-|-$/g, ""); // Cắt đầu đuôi

                                                        if (showGeneralHealth) {
                                                            history.push(`/patient/searchpackage?type=tong-quat&subType=${subType}`);
                                                        } else if (showSurgery) {
                                                            history.push(`/patient/searchpackage?type=phau-thuat&subType=${subType}`);
                                                        } else if (showTesting) {
                                                            history.push(`/patient/searchpackage?type=xet-nghiem&subType=${subType}`);
                                                        } else {
                                                            history.push(`/patient/searchdoctor?specialty=${spec.name}`);
                                                        }
                                                    }}
                                                    style={{ borderRadius: "15px", cursor: "pointer", transition: "0.2s", overflow: "hidden", display: "flex", flexDirection: "column" }}
                                                >
                                                    <div style={{ width: "100%", height: "140px", overflow: "hidden", backgroundColor: "#f1f5f9" }}>
                                                        <img 
                                                            src={spec.img} 
                                                            alt={spec.name} 
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                                        />
                                                    </div>
                                                    <div className="p-3 text-center" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                        <div className="font-weight-bold text-dark mb-1" style={{ fontSize: "13px", textTransform: "uppercase" }}>
                                                            {spec.name}
                                                        </div>
                                                        <div className="text-muted" style={{ fontSize: "11px", fontStyle: "italic", lineHeight: "1.2" }}>
                                                            {spec.note}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    ) : (
                                        <div className="text-center w-100 py-5 text-muted">Không tìm thấy kết quả nào khớp với từ khóa "{searchTerm}"</div>
                                    )}
                                </Row>
                            </>
                        )}
                        <div className="mt-5"><Footer /></div>
                    </div>
                </div>
            </div>

            <style>{`
                .stat-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .stat-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important; }
                .stat-icon-bg { position: absolute; right: -10px; top: -10px; font-size: 80px; opacity: 0.2; z-index: 1; }
                .specialty-box { transition: all 0.3s ease; }
                .specialty-box:hover {
                    background-color: #fffef0 !important;
                    border-color: #fdbb2d !important;
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                }
                .form-control:focus {
                    box-shadow: 0 0 0 3px rgba(253, 187, 45, 0.25) !important;
                    border-color: #fdbb2d !important;
                }
            `}</style>
        </div>
    );
};

export default MedicalServices;