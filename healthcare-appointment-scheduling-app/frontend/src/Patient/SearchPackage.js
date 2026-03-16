import React, { useState, useEffect } from "react"; 
import Navbar from "../Basic/Navbar";
import LeftsidePatient from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; 
import { Button, CardBody, Row, Col, Input } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";

// --- IMPORT ẢNH ---
import nmdLogoo from "../image/diendandoanhnghiep.vn-media-uploaded-344-2022-02-04-_suckhoe.jpg"; 

const SearchPackage = () => {
  const history = useHistory();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filterType, setFilterType] = useState("All");

  // 1. DỮ LIỆU TỔNG QUÁT (Giữ nguyên 100%)
  const basePackages = [
    { id: "TQ01", name: "Gói khám sức khỏe Tổng quát Cơ bản", type: "tong-quat", subType: "co-ban", category: ["Tổng quát", "Cơ bản"], fee: 1500000, img: nmdLogoo, vip: false },
    { id: "TQ01-2", name: "Gói khám Tổng quát Tiết kiệm", type: "tong-quat", subType: "co-ban", category: ["Tổng quát", "Cơ bản"], fee: 1200000, img: nmdLogoo, vip: false },
    { id: "TQ03", name: "Gói khám sức khỏe Tổng quát Nâng cao", type: "tong-quat", subType: "nang-cao", category: ["Tổng quát", "Nâng cao"], fee: 4500000, img: nmdLogoo, vip: true },
    { id: "TQ03-2", name: "Gói khám Tổng quát Nâng cao (Plus)", type: "tong-quat", subType: "nang-cao", category: ["Tổng quát", "Nâng cao"], fee: 5500000, img: nmdLogoo, vip: true },
    { id: "TQ02", name: "Gói khám sức khỏe Tổng quát VIP (NMD Platinum)", type: "tong-quat", subType: "goi-kham-vip", category: ["Tổng quát", "VIP"], fee: 12500000, img: nmdLogoo, vip: true },
    { id: "TQ02-2", name: "Gói khám VIP Hoàng Gia (Royal Care)", type: "tong-quat", subType: "goi-kham-vip", category: ["Tổng quát", "VIP"], fee: 25000000, img: nmdLogoo, vip: true },
    { id: "TQ04", name: "Gói khám sức khỏe dành cho NAM giới", type: "tong-quat", subType: "nam", category: ["Tổng quát", "Nam giới"], fee: 3200000, img: nmdLogoo, vip: false },
    { id: "TQ04-2", name: "Gói khám Nam giới Chuyên sâu (Hormone & Gan)", type: "tong-quat", subType: "nam", category: ["Tổng quát", "Nam giới"], fee: 5800000, img: nmdLogoo, vip: true },
    { id: "TQ04-3", name: "Gói khám Nam giới VIP (NMD Men Care)", type: "tong-quat", subType: "nam", category: ["Tổng quát", "Nam giới"], fee: 8500000, img: nmdLogoo, vip: true },
    { id: "TQ05", name: "Gói khám sức khỏe dành cho NỮ giới", type: "tong-quat", subType: "nu", category: ["Tổng quát", "Nữ giới"], fee: 3800000, img: nmdLogoo, vip: false },
    { id: "TQ05-2", name: "Gói khám Nữ giới Chuyên sâu (Nội tiết & Vú)", type: "tong-quat", subType: "nu", category: ["Tổng quát", "Nữ giới"], fee: 6500000, img: nmdLogoo, vip: true },
    { id: "TQ05-3", name: "Gói khám Nữ giới VIP (NMD Lady Luxury)", type: "tong-quat", subType: "nu", category: ["Tổng quát", "Nữ giới"], fee: 10500000, img: nmdLogoo, vip: true },
    { id: "TQ06", name: "Gói khám sức khỏe dành cho TRẺ EM", type: "tong-quat", subType: "tre-em", category: ["Tổng quát", "Nhi khoa"], fee: 2100000, img: nmdLogoo, vip: false },
    { id: "TQ06-2", name: "Gói khám Dinh dưỡng & Phát triển cho bé", type: "tong-quat", subType: "tre-em", category: ["Tổng quát", "Nhi khoa"], fee: 3200000, img: nmdLogoo, vip: false },
    { id: "TQ07", name: "Gói khám sức khỏe dành cho NGƯỜI GIÀ", type: "tong-quat", subType: "nguoi-gia", category: ["Tổng quát", "Lão khoa"], fee: 5500000, img: nmdLogoo, vip: true },
    { id: "TQ07-2", name: "Gói tầm soát Đột quỵ & Xương khớp (Người già)", type: "tong-quat", subType: "nguoi-gia", category: ["Tổng quát", "Lão khoa"], fee: 8900000, img: nmdLogoo, vip: true },
    { id: "TQ08", name: "Gói khám sức khỏe TIỀN HÔN NHÂN", type: "tong-quat", subType: "tien-hon-nhan", category: ["Tổng quát", "Sản phụ khoa"], fee: 4200000, img: nmdLogoo, vip: false },
    { id: "TQ08-2", name: "Gói Tiền hôn nhân Platinum (Xét nghiệm Gen)", type: "tong-quat", subType: "tien-hon-nhan", category: ["Tổng quát", "Sản phụ khoa"], fee: 7500000, img: nmdLogoo, vip: true },
    { id: "TQ09", name: "Gói Tầm soát Ung thư Toàn diện", type: "tong-quat", subType: "tam-soat-ung-thu", category: ["Tổng quát", "Ung bướu"], fee: 8900000, img: nmdLogoo, vip: true },
    { id: "TQ09-2", name: "Gói siêu tầm soát 10 bệnh Ung thư phổ biến", type: "tong-quat", subType: "tam-soat-ung-thu", category: ["Tổng quát", "Ung bướu"], fee: 15500000, img: nmdLogoo, vip: true },
    { id: "TQ09-3", name: "Gói Tầm soát Ung thư công nghệ GEN mới", type: "tong-quat", subType: "tam-soat-ung-thu", category: ["Tổng quát", "Ung bướu"], fee: 22000000, img: nmdLogoo, vip: true },
    { id: "TQ10", name: "Gói Tầm soát Ung thư Vú chuyên sâu", type: "tong-quat", subType: "tam-soat-ung-thu-vu", category: ["Tổng quát", "Phụ nữ"], fee: 2500000, img: nmdLogoo, vip: false },
    { id: "TQ10-2", name: "Combo Tầm soát Ung thư Vú & Cổ tử cung", type: "tong-quat", subType: "tam-soat-ung-thu-vu", category: ["Tổng quát", "Phụ nữ"], fee: 4200000, img: nmdLogoo, vip: true },
    { id: "TQ11", name: "Gói Tầm soát Ung thư Tiêu hóa (Nội soi)", type: "tong-quat", subType: "tam-soat-tieu-hoa", category: ["Tổng quát", "Tiêu hóa"], fee: 4800000, img: nmdLogoo, vip: true },
    { id: "TQ11-2", name: "Nội soi tiêu hóa VIP (Không đau, công nghệ NBI)", type: "tong-quat", subType: "tam-soat-tieu-hoa", category: ["Tổng quát", "Tiêu hóa"], fee: 7200000, img: nmdLogoo, vip: true },
    { id: "TQ12", name: "Khám bệnh lý chung & Tư vấn F0", type: "tong-quat", subType: "benh-ly-chung", category: ["Tổng quát", "Nội khoa"], fee: 800000, img: nmdLogoo, vip: false },
    { id: "TQ12-2", name: "Gói kiểm tra sức khỏe Hậu COVID-19", type: "tong-quat", subType: "benh-ly-chung", category: ["Tổng quát", "Nội khoa"], fee: 2500000, img: nmdLogoo, vip: false },
    { id: "PK02", name: "SỨC KHỎE TINH THẦN CHUYÊN SÂU", type: "suc-khoe-tinh-than", category: ["Tâm lý", "Tư vấn từ xa"], fee: 850000, img: nmdLogoo, vip: true },
    { id: "PK04", name: "GÓI KHÁM NHA KHOA THẨM MỸ", type: "nha-khoa", category: ["Răng hàm mặt", "Làm đẹp"], fee: 5000000, img: nmdLogoo, vip: true },
  ];

  const labTestPackages = [
    { id: "XN01", name: "Xét nghiệm máu tổng quát cơ bản", type: "xet-nghiem", subType: "tong-quat", category: ["Xét nghiệm", "Tổng quát"], fee: 500000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: false },
    { id: "XN02", name: "Xét nghiệm vi chất & Vitamin cho cơ thể", type: "xet-nghiem", subType: "tong-quat", category: ["Xét nghiệm", "Tổng quát"], fee: 1200000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: true },
    { id: "XN03", name: "Lấy mẫu xét nghiệm tại nhà (Gói tiết kiệm)", type: "xet-nghiem", subType: "tai-nha", category: ["Xét nghiệm", "Tại nhà"], fee: 300000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: false },
    { id: "XN04", name: "Kiểm tra sức khỏe tại nhà toàn diện", type: "xet-nghiem", subType: "tai-nha", category: ["Xét nghiệm", "Tại nhà"], fee: 1500000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: true },
    { id: "XN05", name: "Tầm soát dấu ấn ung thư Nam giới (5 chỉ số)", type: "xet-nghiem", subType: "ung-thu", category: ["Xét nghiệm", "Ung thư"], fee: 1800000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: true },
    { id: "XN06", name: "Tầm soát dấu ấn ung thư Nữ giới (6 chỉ số)", type: "xet-nghiem", subType: "ung-thu", category: ["Xét nghiệm", "Ung thư"], fee: 2100000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: true },
    { id: "XN07", name: "Sàng lọc NIPT cơ bản (3 cặp NST)", type: "xet-nghiem", subType: "nipt", category: ["Xét nghiệm", "NIPT"], fee: 3500000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: false },
    { id: "XN08", name: "Sàng lọc NIPT chuyên sâu (23 cặp NST)", type: "xet-nghiem", subType: "nipt", category: ["Xét nghiệm", "NIPT"], fee: 6000000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: true },
    { id: "XN09", name: "Test nhanh NS1AG & Công thức máu", type: "xet-nghiem", subType: "sot-xuat-huyet", category: ["Xét nghiệm", "Truyền nhiễm"], fee: 450000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: false },
    { id: "XN10", name: "Gói theo dõi Sốt xuất huyết tại nhà", type: "xet-nghiem", subType: "sot-xuat-huyet", category: ["Xét nghiệm", "Truyền nhiễm"], fee: 900000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: false },
    { id: "XN11", name: "Xét nghiệm panel dị ứng 60 dị nguyên", type: "xet-nghiem", subType: "di-ung", category: ["Xét nghiệm", "Dị ứng"], fee: 1350000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: true },
    { id: "XN12", name: "Kiểm tra dị ứng thực phẩm chuyên biệt", type: "xet-nghiem", subType: "di-ung", category: ["Xét nghiệm", "Dị ứng"], fee: 800000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: false },
    { id: "XN13", name: "Kiểm tra chức năng Gan cơ bản", type: "xet-nghiem", subType: "gan", category: ["Xét nghiệm", "Gan mật"], fee: 400000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: false },
    { id: "XN14", name: "Xét nghiệm Viêm gan B, C chuyên sâu", type: "xet-nghiem", subType: "gan", category: ["Xét nghiệm", "Gan mật"], fee: 1100000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: true },
    { id: "XN15", name: "Test nhanh Cúm A/B & Cúm gia cầm", type: "xet-nghiem", subType: "cum-va-sot", category: ["Xét nghiệm", "Hô hấp"], fee: 350000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: false },
    { id: "XN16", name: "Combo Xét nghiệm Sốt virus chuyên sâu", type: "xet-nghiem", subType: "cum-va-sot", category: ["Xét nghiệm", "Hô hấp"], fee: 750000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: false },
    { id: "XN17", name: "Test nhanh kháng nguyên COVID-19", type: "xet-nghiem", subType: "covid", category: ["Xét nghiệm", "COVID"], fee: 150000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: false },
    { id: "XN18", name: "Xét nghiệm PCR COVID-19 (Kết quả trong ngày)", type: "xet-nghiem", subType: "covid", category: ["Xét nghiệm", "COVID"], fee: 700000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: true },
    { id: "XN19", name: "Giải mã GEN tài năng & Thể chất trẻ em", type: "xet-nghiem", subType: "gen", category: ["Xét nghiệm", "Di truyền"], fee: 4500000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: true },
    { id: "XN20", name: "Tầm soát GEN bệnh lý di truyền mãn tính", type: "xet-nghiem", subType: "gen", category: ["Xét nghiệm", "Di truyền"], fee: 8000000, img: "https://cdn.bookingcare.vn/fr/w300/2023/03/31/154512-goi-xet-nghiem.jpg", vip: true },
  ];

  const surgeryPackages = [
    { id: "PT01-1", name: "Cắt bao quy đầu công nghệ Stapler", type: "phau-thuat", subType: "nam-hoc", category: ["Phẫu thuật", "Nam học"], fee: 5500000, img: nmdLogoo, vip: false },
    { id: "PT01-2", name: "Phẫu thuật điều trị Giãn tĩnh mạch thừng tinh", type: "phau-thuat", subType: "nam-hoc", category: ["Phẫu thuật", "Nam học"], fee: 12000000, img: nmdLogoo, vip: true },
    { id: "PT01-3", name: "Tạo hình thẩm mỹ bộ phận sinh dục nam", type: "phau-thuat", subType: "nam-hoc", category: ["Phẫu thuật", "Nam học"], fee: 18000000, img: nmdLogoo, vip: true },
    { id: "PT02-1", name: "Phẫu thuật Cắt Amidan bằng Plasma", type: "phau-thuat", subType: "tai-mui-hong", category: ["Phẫu thuật", "Tai Mũi Họng"], fee: 8500000, img: nmdLogoo, vip: false },
    { id: "PT02-2", name: "Phẫu thuật Nội soi nạo VA", type: "phau-thuat", subType: "tai-mui-hong", category: ["Phẫu thuật", "Tai Mũi Họng"], fee: 7500000, img: nmdLogoo, vip: false },
    { id: "PT02-3", name: "Chỉnh hình vách ngăn mũi nội soi", type: "phau-thuat", subType: "tai-mui-hong", category: ["Phẫu thuật", "Tai Mũi Họng"], fee: 15000000, img: nmdLogoo, vip: true },
    { id: "PT03-1", name: "Phẫu thuật trĩ bằng phương pháp Longo", type: "phau-thuat", subType: "hau-mon", category: ["Phẫu thuật", "Tiêu hóa"], fee: 16000000, img: nmdLogoo, vip: true },
    { id: "PT03-2", name: "Phẫu thuật điều trị rò hậu môn chuyên sâu", type: "phau-thuat", subType: "hau-mon", category: ["Phẫu thuật", "Tiêu hóa"], fee: 10500000, img: nmdLogoo, vip: false },
    { id: "PT03-3", name: "Phẫu thuật cắt polyp trực tràng nội soi", type: "phau-thuat", subType: "hau-mon", category: ["Phẫu thuật", "Tiêu hóa"], fee: 9000000, img: nmdLogoo, vip: false },
    { id: "PT04-1", name: "Phẫu thuật Phaco điều trị Đục thủy tinh thể", type: "phau-thuat", subType: "mat", category: ["Phẫu thuật", "Mắt"], fee: 15000000, img: nmdLogoo, vip: true },
    { id: "PT04-2", name: "Phẫu thuật Lasik điều trị Cận thị", type: "phau-thuat", subType: "mat", category: ["Phẫu thuật", "Mắt"], fee: 22000000, img: nmdLogoo, vip: true },
    { id: "PT04-3", name: "Phẫu thuật mộng thịt/quặm mắt", type: "phau-thuat", subType: "mat", category: ["Phẫu thuật", "Mắt"], fee: 4500000, img: nmdLogoo, vip: false },
    { id: "PT05-1", name: "Điều trị giãn tĩnh mạch bằng Laser nội mạch", type: "phau-thuat", subType: "tinh-mach", category: ["Thủ thuật", "Tim mạch"], fee: 25000000, img: nmdLogoo, vip: true },
    { id: "PT05-2", name: "Tiêm xơ điều trị giãn tĩnh mạch nông", type: "phau-thuat", subType: "tinh-mach", category: ["Thủ thuật", "Tim mạch"], fee: 8000000, img: nmdLogoo, vip: false },
    { id: "PT05-3", name: "Phẫu thuật bóc tĩnh mạch hiển (Stripping)", type: "phau-thuat", subType: "tinh-mach", category: ["Thủ thuật", "Tim mạch"], fee: 14000000, img: nmdLogoo, vip: false },
    { id: "PT06-1", name: "Phẫu thuật cắt thùy tuyến giáp nội soi", type: "phau-thuat", subType: "tuyen-giap", category: ["Phẫu thuật", "Nội tiết"], fee: 18000000, img: nmdLogoo, vip: true },
    { id: "PT06-2", name: "Đốt u tuyến giáp bằng sóng cao tần (RFA)", type: "phau-thuat", subType: "tuyen-giap", category: ["Thủ thuật", "Nội tiết"], fee: 22000000, img: nmdLogoo, vip: true },
    { id: "PT06-3", name: "Phẫu thuật cắt toàn bộ tuyến giáp ung thư", type: "phau-thuat", subType: "tuyen-giap", category: ["Phẫu thuật", "Nội tiết"], fee: 28000000, img: nmdLogoo, vip: true },
  ];

  const allPackages = [...basePackages, ...labTestPackages, ...surgeryPackages];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type"); 

    if (type) {
        const decodedType = decodeURIComponent(type);
        const validTypes = ["xet-nghiem", "suc-khoe-tinh-than", "nha-khoa", "tong-quat", "phau-thuat"];
        if (validTypes.includes(decodedType)) setFilterType(decodedType);
        else setFilterType("All");
    }
  }, [location]);

  // --- LOGIC LỌC ĐÃ SỬA ---
 // --- LOGIC LỌC ĐÃ SỬA ĐỂ KHỚP VỚI MEDICAL SERVICES ---
const filteredPkgs = allPackages.filter(pkg => {
    const params = new URLSearchParams(location.search);
    const subTypeParam = params.get("subType"); 

    const matchSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        pkg.id.toLowerCase() === searchTerm.toLowerCase();
    
    if (subTypeParam) {
        // SỬA TẠI ĐÂY: Kiểm tra nếu subType trong data khớp HOẶC nằm trong subType của URL
        // Ví dụ: pkg.subType là "tai-mui-hong" sẽ khớp với URL "phau-thuat-tai-mui-hong"
        const isMatchSubType = pkg.subType === subTypeParam || subTypeParam.includes(pkg.subType);
        return matchSearch && isMatchSubType;
    }

    const matchType = filterType === "All" || pkg.type === filterType;
    return matchSearch && matchType;
});

  const handleBooking = (pkg) => {
    history.push({
      pathname: "/patient/booking-checkout",
      state: { selectedPackage: pkg, isPackage: true }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1, width: "100%", overflow: "hidden" }}>
        <div style={{ width: "280px", minWidth: "280px", backgroundColor: "#0f172a", flexShrink: 0 }}>
          <LeftsidePatient />
        </div>

        <div style={{ flex: 1, height: "100%", overflowY: "auto", borderLeft: "6px solid #fdbb2d", display: "flex", flexDirection: "column" }}>
          <div className="container-fluid p-0" style={{ width: "100%", padding: "40px" }}>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                  <h3 className="font-weight-bold text-dark mb-1 text-uppercase">📦 DANH SÁCH GÓI DỊCH VỤ {filterType !== "All" ? `- ${filterType.replace('-', ' ')}` : ""}</h3>
                  <div style={{ height: "5px", width: "40px", background: "#fdbb2d", borderRadius: "10px" }}></div>
                </div>
            </div>

            <Row className="mb-4 mx-0">
              <Col md="6"><Input placeholder="Tìm tên gói dịch vụ..." className="custom-input shadow-sm" onChange={e => setSearchTerm(e.target.value)} /></Col>
              <Col md="6">
                <Input type="select" className="custom-input shadow-sm" value={filterType} onChange={e => setFilterType(e.target.value)}>
                  <option value="All">Tất cả loại gói</option>
                  <option value="phau-thuat">Phẫu thuật</option>
                  <option value="xet-nghiem">Xét nghiệm y học</option>
                  <option value="suc-khoe-tinh-than">Sức khỏe tinh thần</option>
                  <option value="nha-khoa">Khám nha khoa</option>
                  <option value="tong-quat">Khám tổng quát</option>
                </Input>
              </Col>
            </Row>

            <Row className="mx-0">
              {filteredPkgs.map(pkg => (
                <Col md="4" className="mb-4 d-flex" key={pkg.id}>
                  <div className="card shadow-sm border-0 pkg-card w-100">
                    <div className="img-container">
                      <img src={pkg.img} alt={pkg.name} className="img-content" />
                      <div className="id-tag">Mã: {pkg.id}</div>
                      {pkg.vip && <div className="vip-badge">ƯU TIÊN VIP</div>}
                    </div>
                    <CardBody className="p-4 d-flex flex-column">
                      <small className="text-primary font-weight-bold text-uppercase">{pkg.category.join(" • ")}</small>
                      <h5 className="font-weight-bold text-dark mt-2" style={{ lineHeight: "1.4", minHeight: "3em" }}>{pkg.name}</h5>
                      <div className="mt-auto pt-3 d-flex justify-content-between align-items-center border-top">
                        <span className="text-danger font-weight-bold">{new Intl.NumberFormat('vi-VN').format(pkg.fee)}đ</span>
                        <Button color="primary" onClick={() => handleBooking(pkg)}>ĐẶT LỊCH</Button>
                      </div>
                    </CardBody>
                  </div>
                </Col>
              ))}
              {filteredPkgs.length === 0 && <Col className="text-center py-5"><h5>Đang cập nhật thêm các gói dịch vụ này...</h5></Col>}
            </Row>
            <Footer />
          </div>
        </div>
      </div>
      <style>{`
        .pkg-card { border-radius: 24px; overflow: hidden; transition: 0.3s; background: white; border: 1px solid #e2e8f0; }
        .pkg-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .img-container { height: 220px; position: relative; background: #f1f5f9; }
        .img-content { width: 100%; height: 100%; object-fit: cover; }
        .id-tag { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 11px; }
        .vip-badge { position: absolute; top: 10px; left: 10px; background: #fdbb2d; color: #000; padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: bold; }
        .custom-input { height: 48px !important; border-radius: 12px !important; }
      `}</style>
    </div>
  );
};

export default SearchPackage;