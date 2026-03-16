import React, { useState, useEffect } from "react"; 
import Navbar from "../Basic/Navbar";
import LeftsidePatient from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; 
import { Button, CardBody, Row, Col, Input } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";

// --- LOGO GIỮ NGUYÊN ---
import nmdLogo from "../image/nmd.png";
import alexnguyenLogo from "../image/alexx.jpg";
import hoangvanthaiLogo from "../image/hoangvanthai.jpg";
import lehoangnamLogo from "../image/lehoangnam.jpg";
import lethuhaLogo from "../image/lethuha.jpg";
import nguyenthuhaLogo from "../image/nguyenthuha.webp";
import phamdangkhoaLogo from "../image/phamdangkhoa.webp"
import phamminhtuanLogo from "../image/phamminhtuan.png";
import trannhatminhLogo from "../image/trannhatminh.jpg";
import tranthithanhLogo from "../image/tranthithanh.jpg";
import trinhcongsonLogo from "../image/trinhcongson.png";
import vuhoangyenLogo from "../image/vuhoangyen.webp"

const SearchDoctor = () => {
  const history = useHistory();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filterDept, setFilterDept] = useState("All");

  const fixedDoctors = [
    { id: 1, name: "GS. TS. NGUYỄN MẠNH DŨNG", specialization: ["Giám đốc BV"], fees: 2000000, img: nmdLogo, vip: true },
    { id: 2, name: "PGS. TS. PHẠM MINH TUẤN", specialization: ["Tim mạch", "Nội khoa"], fees: 1200000, img: phamminhtuanLogo, vip: true },
    { id: 3, name: "TS. BS. LÊ THU HÀ", specialization: ["Sản Phụ khoa", "Siêu âm thai"], fees: 1200000, img: lethuhaLogo, vip: true },
    { id: 4, name: "PGS. TS. NGUYỄN THU HÀ", specialization: ["Nhi khoa", "Tiểu đường - Nội tiết"], fees: 1200000, img: nguyenthuhaLogo, vip: true },
    { id: 5, name: "TS. BS. VŨ HOÀNG YẾN", specialization: ["Da liễu", "Thẩm mỹ", "Da liễu thẩm mỹ"], fees: 1200000, img: vuhoangyenLogo, vip: true },
    { id: 6, name: "PGS. TS. TRỊNH CÔNG SƠN", specialization: ["Cơ Xương Khớp", "Chấn thương", "Cột sống"], fees: 1200000, img: trinhcongsonLogo, vip: true },
    { id: 7, name: "TS. BS. ALEX NGUYỄN", specialization: ["Ngoại thần kinh", "Thần kinh"], fees: 1500000, img: alexnguyenLogo, vip: true },
    { id: 8, name: "PGS. TS. HOÀNG VĂN THÁI", specialization: ["Tiêu hóa", "Bệnh Viêm gan", "Nội soi Tiêu hóa"], fees: 1200000, img: hoangvanthaiLogo, vip: true },
    { id: 9, name: "TS. BS. LÊ HOÀNG NAM", specialization: ["Nam học", "Thận - Tiết niệu"], fees: 1200000, img: lehoangnamLogo, vip: true },
    { id: 10, name: "TS. BS. PHẠM ĐĂNG KHOA", specialization: ["Thần kinh", "Sức khỏe tâm thần"], fees: 1200000, img: phamdangkhoaLogo, vip: true },
    { id: 11, name: "PGS. TS. TRẦN NHẬT MINH", specialization: ["Tai Mũi Họng", "Hô hấp - Phổi"], fees: 1200000, img: trannhatminhLogo, vip: true },
    { id: 12, name: "TS. BS. TRẦN THỊ THANH", specialization: ["Y học Cổ truyền", "Châm cứu"], fees: 1200000, img: tranthithanhLogo, vip: true },
    { id: 13, name: "PGS. TS. LÊ QUANG ĐẠO", specialization: ["Chuyên khoa Mắt"], fees: 1200000, img: alexnguyenLogo, vip: true },
    { id: 14, name: "TS. BS. NGUYỄN KIM CHI", specialization: ["Ung bướu", "Chuyên khoa Vú"], fees: 1200000, img: lethuhaLogo, vip: true },
    { id: 15, name: "PGS. TS. PHẠM VĂN ĐỨC", specialization: ["Cộng hưởng từ", "Cắt lớp vi tính", "Chụp X-quang"], fees: 1200000, img: phamminhtuanLogo, vip: true },
    { id: 16, name: "TS. BS. ĐẶNG HỒNG ANH", specialization: ["Vô sinh - Hiếm muộn", "Sản Phụ khoa"], fees: 1200000, img: nguyenthuhaLogo, vip: true },
    { id: 17, name: "PGS. TS. VŨ MINH QUÂN", specialization: ["Phục hồi chức năng", "Ngoại khoa"], fees: 1200000, img: trinhcongsonLogo, vip: true },
    { id: 18, name: "TS. BS. TRẦN THANH TÂM", specialization: ["Trị liệu Tâm lý", "Sức khỏe tâm thần"], fees: 1200000, img: vuhoangyenLogo, vip: true },
    { id: 19, name: "PGS. TS. LÊ HỒNG ĐĂNG", specialization: ["Nha khoa", "Niềng răng", "Bọc răng sứ"], fees: 1200000, img: trannhatminhLogo, vip: true },
    { id: 20, name: "TS. BS. HOÀNG BẢO LONG", specialization: ["Trồng răng Implant", "Nhổ răng khôn", "Nha khoa tổng quát"], fees: 1200000, img: hoangvanthaiLogo, vip: true },
    { id: 21, name: "BS. Nguyễn Văn An", specialization: ["Nha khoa trẻ em", "Nha khoa"], fees: 450000, img: phamminhtuanLogo },
    { id: 22, name: "BS. Trần Thị Bình", specialization: ["Tuyến giáp"], fees: 450000, img: lethuhaLogo },
    { id: 23, name: "BS. Lê Văn Cường", specialization: ["Dị ứng miễn dịch"], fees: 450000, img: alexnguyenLogo },
    { id: 24, name: "BS. Phạm Thị Dung", specialization: ["Truyền nhiễm"], fees: 450000, img: nguyenthuhaLogo },
    { id: 25, name: "BS. Hoàng Văn Em", specialization: ["Cơ Xương Khớp"], fees: 450000, img: hoangvanthaiLogo },
    { id: 26, name: "BS. Phan Thị Giang", specialization: ["Thần kinh"], fees: 450000, img: vuhoangyenLogo },
    { id: 27, name: "BS. Vũ Văn Hải", specialization: ["Tiêu hóa"], fees: 450000, img: trinhcongsonLogo },
    { id: 28, name: "BS. Đặng Thị Hoa", specialization: ["Tim mạch"], fees: 450000, img: lehoangnamLogo },
    { id: 29, name: "BS. Bùi Văn Hùng", specialization: ["Tai Mũi Họng"], fees: 450000, img: phamdangkhoaLogo },
    { id: 30, name: "BS. Đỗ Thị Lan", specialization: ["Cột sống"], fees: 450000, img: trannhatminhLogo },
    { id: 31, name: "BS. Ngô Văn Minh", specialization: ["Y học Cổ truyền"], fees: 450000, img: tranthithanhLogo },
    { id: 32, name: "BS. Lý Thị Ngọc", specialization: ["Châm cứu"], fees: 450000, img: phamminhtuanLogo },
    { id: 33, name: "BS. Dương Văn Phúc", specialization: ["Sản Phụ khoa"], fees: 450000, img: lethuhaLogo },
    { id: 34, name: "BS. Đào Thị Quỳnh", specialization: ["Siêu âm thai"], fees: 450000, img: nguyenthuhaLogo },
    { id: 35, name: "BS. Hà Văn Sơn", specialization: ["Nhi khoa"], fees: 450000, img: vuhoangyenLogo },
    { id: 36, name: "BS. Chu Thị Trang", specialization: ["Da liễu"], fees: 450000, img: trinhcongsonLogo },
    { id: 37, name: "BS. Đoàn Văn Tú", specialization: ["Bệnh Viêm gan"], fees: 450000, img: alexnguyenLogo },
    { id: 38, name: "BS. Lâm Thị Uyên", specialization: ["Sức khỏe tâm thần"], fees: 450000, img: hoangvanthaiLogo },
    { id: 39, name: "BS. Trịnh Văn Việt", specialization: ["Dị ứng miễn dịch"], fees: 450000, img: lehoangnamLogo },
    { id: 40, name: "BS. Phùng Thị Xuân", specialization: ["Hô hấp - Phổi"], fees: 450000, img: phamdangkhoaLogo },
    { id: 41, name: "BS. Mai Văn Yên", specialization: ["Ngoại thần kinh"], fees: 450000, img: trannhatminhLogo },
    { id: 42, name: "BS. Cao Thị Anh", specialization: ["Nam học"], fees: 450000, img: tranthithanhLogo },
    { id: 43, name: "BS. Đinh Văn Bắc", specialization: ["Chuyên khoa Mắt"], fees: 450000, img: phamminhtuanLogo },
    { id: 44, name: "BS. Kim Thị Chúc", specialization: ["Thận - Tiết niệu"], fees: 450000, img: lethuhaLogo },
    { id: 45, name: "BS. Quách Văn Danh", specialization: ["Nội khoa"], fees: 450000, img: nguyenthuhaLogo },
    { id: 46, name: "BS. Lương Thị Đào", specialization: ["Nha khoa"], fees: 450000, img: vuhoangyenLogo },
    { id: 47, name: "BS. Nghiêm Văn Gia", specialization: ["Tiểu đường - Nội tiết"], fees: 450000, img: trinhcongsonLogo },
    { id: 48, name: "BS. Tạ Thị Hằng", specialization: ["Phục hồi chức năng"], fees: 450000, img: alexnguyenLogo },
    { id: 49, name: "BS. Vi Văn Hỷ", specialization: ["Cộng hưởng từ"], fees: 450000, img: hoangvanthaiLogo },
    { id: 50, name: "BS. Diệp Thị Ích", specialization: ["Cắt lớp vi tính"], fees: 450000, img: lehoangnamLogo },
    { id: 51, name: "BS. Kha Văn Kỷ", specialization: ["Nội soi Tiêu hóa"], fees: 450000, img: phamdangkhoaLogo },
    { id: 52, name: "BS. Nông Thị Liên", specialization: ["Ung bướu"], fees: 450000, img: trannhatminhLogo },
    { id: 53, name: "BS. Âu Văn Mạnh", specialization: ["Da liễu thẩm mỹ"], fees: 450000, img: tranthithanhLogo },
    { id: 54, name: "BS. Bế Thị Nga", specialization: ["Truyền nhiễm"], fees: 450000, img: phamminhtuanLogo },
    { id: 55, name: "BS. Lục Văn Oanh", specialization: ["Thẩm mỹ"], fees: 450000, img: lethuhaLogo },
    { id: 56, name: "BS. Mạc Thị Phương", specialization: ["Trị liệu Tâm lý"], fees: 450000, img: nguyenthuhaLogo },
    { id: 57, name: "BS. Thạch Văn Quân", specialization: ["Vô sinh - Hiếm muộn"], fees: 450000, img: vuhoangyenLogo },
    { id: 58, name: "BS. La Thị Rinh", specialization: ["Chấn thương"], fees: 450000, img: trinhcongsonLogo },
    { id: 59, name: "BS. Kiều Văn Sang", specialization: ["Niềng răng", "Nha khoa"], fees: 450000, img: alexnguyenLogo },
    { id: 60, name: "BS. Lều Thị Thảo", specialization: ["Bọc răng sứ", "Nha khoa"], fees: 450000, img: hoangvanthaiLogo },
    { id: 61, name: "BS. Văn Văn Uẩn", specialization: ["Trồng răng Implant", "Nha khoa"], fees: 450000, img: lehoangnamLogo },
    { id: 62, name: "BS. Khổng Thị Vân", specialization: ["Nhổ răng khôn", "Nha khoa"], fees: 450000, img: phamdangkhoaLogo },
    { id: 63, name: "BS. Sầm Văn Xuyên", specialization: ["Nha khoa tổng quát", "Nha khoa"], fees: 450000, img: trannhatminhLogo },
    { id: 64, name: "BS. Tòng Thị Ý", specialization: ["Nha khoa trẻ em", "Nha khoa"], fees: 450000, img: tranthithanhLogo },
    { id: 65, name: "BS. Bạc Văn Zui", specialization: ["Tuyến giáp"], fees: 450000, img: phamminhtuanLogo },
    { id: 66, name: "BS. Nguyễn Kiều Chinh", specialization: ["Chuyên khoa Vú"], fees: 450000, img: lethuhaLogo },
    { id: 67, name: "BS. Phạm Minh Đăng", specialization: ["Ngoại khoa"], fees: 450000, img: nguyenthuhaLogo },
    { id: 68, name: "BS. Lê Thị Diễm", specialization: ["Chụp X-quang"], fees: 450000, img: vuhoangyenLogo },
    { id: 69, name: "BS. Hoàng Ngọc Duy", specialization: ["Cơ Xương Khớp"], fees: 450000, img: trinhcongsonLogo },
    { id: 70, name: "BS. Trần Hoài Giang", specialization: ["Thần kinh"], fees: 450000, img: alexnguyenLogo },
    { id: 71, name: "BS. Nguyễn Nhật Huy", specialization: ["Tiêu hóa"], fees: 450000, img: hoangvanthaiLogo },
    { id: 72, name: "BS. Vũ Thu Huyền", specialization: ["Tim mạch"], fees: 450000, img: lehoangnamLogo },
    { id: 73, name: "BS. Phan Bảo Khánh", specialization: ["Tai Mũi Họng"], fees: 450000, img: phamdangkhoaLogo },
    { id: 74, name: "BS. Đặng Thụy Lâm", specialization: ["Cột sống"], fees: 450000, img: trannhatminhLogo },
    { id: 75, name: "BS. Bùi Khánh Ly", specialization: ["Y học Cổ truyền"], fees: 450000, img: tranthithanhLogo },
    { id: 76, name: "BS. Đỗ Hoàng Long", specialization: ["Sản Phụ khoa"], fees: 450000, img: phamminhtuanLogo },
    { id: 77, name: "BS. Ngô Thanh Nga", specialization: ["Nhi khoa"], fees: 450000, img: lethuhaLogo },
    { id: 78, name: "BS. Lý Hồng Nhung", specialization: ["Da liễu"], fees: 450000, img: nguyenthuhaLogo },
    { id: 79, name: "BS. Dương Tuấn Phong", specialization: ["Sức khỏe tâm thần"], fees: 450000, img: vuhoangyenLogo },
    { id: 80, name: "BS. Đào Minh Quân", specialization: ["Hô hấp - Phổi"], fees: 450000, img: trinhcongsonLogo },
    { id: 81, name: "BS. Hà Kiều Anh", specialization: ["Ngoại thần kinh"], fees: 450000, img: alexnguyenLogo },
    { id: 82, name: "BS. Chu Minh Sang", specialization: ["Nam học"], fees: 450000, img: hoangvanthaiLogo },
    { id: 83, name: "BS. Đoàn Thu Thủy", specialization: ["Chuyên khoa Mắt"], fees: 450000, img: lehoangnamLogo },
    { id: 84, name: "BS. Lâm Bảo Tín", specialization: ["Thận - Tiết niệu"], fees: 450000, img: phamdangkhoaLogo },
    { id: 85, name: "BS. Trịnh Uyên Thư", specialization: ["Nội khoa"], fees: 450000, img: trannhatminhLogo },
    { id: 86, name: "BS. Phùng Thế Vinh", specialization: ["Nha khoa"], fees: 450000, img: tranthithanhLogo },
    { id: 87, name: "BS. Cao Thanh Xuân", specialization: ["Tiểu đường - Nội tiết"], fees: 450000, img: phamminhtuanLogo },
    { id: 88, name: "BS. Đinh Trọng Hiếu", specialization: ["Phục hồi chức năng"], fees: 450000, img: lethuhaLogo },
    { id: 89, name: "BS. Kim Bảo Ngân", specialization: ["Cộng hưởng từ"], fees: 450000, img: nguyenthuhaLogo },
    { id: 90, name: "BS. Quách Tuấn Kiệt", specialization: ["Cắt lớp vi tính"], fees: 450000, img: vuhoangyenLogo },
    { id: 91, name: "BS. Lương Minh Triết", specialization: ["Nội soi Tiêu hóa"], fees: 450000, img: trinhcongsonLogo },
    { id: 92, name: "BS. Nghiêm Thùy Chi", specialization: ["Ung bướu"], fees: 450000, img: alexnguyenLogo },
    { id: 93, name: "BS. Tạ Anh Dũng", specialization: ["Da liễu thẩm mỹ"], fees: 450000, img: hoangvanthaiLogo },
    { id: 94, name: "BS. Vi Kim Liên", specialization: ["Truyền nhiễm"], fees: 450000, img: lehoangnamLogo },
    { id: 95, name: "BS. Diệp Bảo Ngọc", specialization: ["Thẩm mỹ"], fees: 450000, img: phamdangkhoaLogo },
    { id: 96, name: "BS. Kha Chấn Đông", specialization: ["Trị liệu Tâm lý"], fees: 450000, img: trannhatminhLogo },
    { id: 97, name: "BS. Nông Thúy Hằng", specialization: ["Vô sinh - Hiếm muộn"], fees: 450000, img: tranthithanhLogo },
    { id: 98, name: "BS. Âu Minh Tuấn", specialization: ["Niềng răng", "Nha khoa"], fees: 450000, img: phamminhtuanLogo },
    { id: 99, name: "BS. Bế Thanh Huyền", specialization: ["Bọc răng sứ", "Nha khoa"], fees: 450000, img: lethuhaLogo },
    { id: 100, name: "BS. Lục Bảo Nam", specialization: ["Nha khoa tổng quát", "Nha khoa"], fees: 450000, img: nguyenthuhaLogo },
    { id: 101, name: "ThS. BS. Nguyễn Hoài An", specialization: ["Tư vấn, trị liệu Tâm lý từ xa"], fees: 800000, img: phamminhtuanLogo, vip: true },
    { id: 102, name: "Chuyên gia Lê Minh Tâm", specialization: ["Tư vấn, trị liệu Tâm lý từ xa"], fees: 600000, img: lethuhaLogo },
    { id: 103, name: "BS. Trịnh Thúy Quỳnh", specialization: ["Tư vấn, trị liệu Tâm lý từ xa"], fees: 750000, img: vuhoangyenLogo, vip: true },
    { id: 104, name: "ThS. Đỗ Tuấn Kiệt", specialization: ["Tư vấn, trị liệu Tâm lý từ xa"], fees: 500000, img: alexnguyenLogo },
    { id: 105, name: "PGS. TS. Trần Bảo Ngọc", specialization: ["Sức khỏe tâm thần từ xa"], fees: 1200000, img: nguyenthuhaLogo, vip: true },
    { id: 106, name: "BS. Vũ Hoàng Long", specialization: ["Sức khỏe tâm thần từ xa"], fees: 850000, img: trinhcongsonLogo },
    { id: 107, name: "Chuyên gia Hà Anh Tuấn", specialization: ["Sức khỏe tâm thần từ xa"], fees: 700000, img: hoangvanthaiLogo },
    { id: 108, name: "BS. Phan Thanh Thảo", specialization: ["Sức khỏe tâm thần từ xa"], fees: 900000, img: trannhatminhLogo, vip: true },
    { id: 109, name: "BS. Nguyễn Minh Đức", specialization: ["Bác sĩ Da liễu từ xa"], fees: 650000, img: phamdangkhoaLogo },
    { id: 110, name: "ThS. BS. Lê Thu Trang", specialization: ["Bác sĩ Da liễu từ xa"], fees: 800000, img: lethuhaLogo, vip: true },
    { id: 111, name: "BS. Hoàng Gia Bảo", specialization: ["Bác sĩ Da liễu từ xa"], fees: 600000, img: tranthithanhLogo },
    { id: 112, name: "BS. Phạm Minh Anh", specialization: ["Bác sĩ Da liễu từ xa"], fees: 700000, img: vuhoangyenLogo },
    { id: 113, name: "PGS. TS. Đặng Hữu Nam", specialization: ["Bác sĩ Cơ-Xương-Khớp từ xa"], fees: 1100000, img: alexnguyenLogo, vip: true },
    { id: 114, name: "BS. Trần Văn Hùng", specialization: ["Bác sĩ Cơ-Xương-Khớp từ xa"], fees: 750000, img: trinhcongsonLogo },
    { id: 115, name: "BS. Lý Thanh Hằng", specialization: ["Bác sĩ Cơ-Xương-Khớp từ xa"], fees: 800000, img: nguyenthuhaLogo },
    { id: 116, name: "ThS. BS. Ngô Quốc Việt", specialization: ["Bác sĩ Cơ-Xương-Khớp từ xa"], fees: 950000, img: hoangvanthaiLogo, vip: true },
    { id: 117, name: "BS. Bùi Minh Tuấn", specialization: ["Bác sĩ Tiêu hóa từ xa"], fees: 700000, img: phamminhtuanLogo },
    { id: 118, name: "BS. Đỗ Hồng Liên", specialization: ["Bác sĩ Tiêu hóa từ xa"], fees: 650000, img: lethuhaLogo },
    { id: 119, name: "TS. BS. Võ Văn Kiệt", specialization: ["Bác sĩ Tiêu hóa từ xa"], fees: 1000000, img: trannhatminhLogo, vip: true },
    { id: 120, name: "BS. Nguyễn Thái Sơn", specialization: ["Bác sĩ Tim mạch từ xa"], fees: 850000, img: lehoangnamLogo },
    { id: 121, name: "ThS. BS. Đào Mỹ Linh", specialization: ["Bác sĩ Tim mạch từ xa"], fees: 900000, img: vuhoangyenLogo, vip: true },
    { id: 122, name: "BS. Trần Nhật Hoàng", specialization: ["Bác sĩ Tim mạch từ xa"], fees: 750000, img: phamdangkhoaLogo },
    { id: 123, name: "BS. Lê Quang Vinh", specialization: ["Bác sĩ Tai Mũi Họng từ xa"], fees: 600000, img: alexnguyenLogo },
    { id: 124, name: "BS. Nguyễn Thị Tâm", specialization: ["Bác sĩ Tai Mũi Họng từ xa"], fees: 650000, img: tranthithanhLogo },
    { id: 125, name: "TS. BS. Phạm Gia Huy", specialization: ["Bác sĩ Tai Mũi Họng từ xa"], fees: 950000, img: trinhcongsonLogo, vip: true },
    { id: 126, name: "BS. Đặng Thu Thủy", specialization: ["Bác sĩ Thần kinh từ xa"], fees: 800000, img: nguyenthuhaLogo },
    { id: 127, name: "BS. Phan Văn Trị", specialization: ["Bác sĩ Thần kinh từ xa"], fees: 700000, img: hoangvanthaiLogo },
    { id: 128, name: "PGS. TS. Lâm Thế Vinh", specialization: ["Bác sĩ Thần kinh từ xa"], fees: 1200000, img: alexnguyenLogo, vip: true },
    { id: 129, name: "Chuyên gia Hà Kim Chi", specialization: ["Bác sĩ Thần kinh từ xa"], fees: 600000, img: lethuhaLogo },
    { id: 130, name: "BS. Trương Minh Nhật", specialization: ["Bác sĩ Thần kinh từ xa"], fees: 850000, img: phamminhtuanLogo, vip: true },
  ];

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  
  // Lấy cả 2 khả năng tham số bạn có thể đã đặt ở trang Services
  const spec = params.get("specialty");
  const type = params.get("type"); 

  const activeParam = spec || type; // Ưu tiên cái nào có dữ liệu

  if (activeParam) {
      const decodedParam = decodeURIComponent(activeParam);
      
      // Ánh xạ linh hoạt cho cả "Khám nha khoa" (text) và "nha-khoa" (slug)
      if (decodedParam === "Khám nha khoa" || decodedParam === "nha-khoa") {
        setFilterDept("Nha khoa");
      } 
      else if (decodedParam === "Sống khỏe Tiểu đường" || decodedParam === "tieu-duong") {
        setFilterDept("Tiểu đường - Nội tiết");
      }
      else if (decodedParam.includes("Tâm lý")) {
        setFilterDept("Tư vấn, trị liệu Tâm lý từ xa");
      }
      else {
        setFilterDept(decodedParam);
      }
  }
}, [location]);

  const filteredDocs = fixedDoctors.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.id.toString() === searchTerm;
    const matchDept = filterDept === "All" || doc.specialization.includes(filterDept);
    return matchSearch && matchDept;
  });

  const handleBooking = (doc) => {
    history.push({
      pathname: "/patient/booking-checkout",
      state: { selectedDoctor: doc }
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
                  <h3 className="font-weight-bold text-dark mb-1 text-uppercase">🏥 DANH SÁCH BÁC SĨ {filterDept !== "All" ? `- ${filterDept}` : ""}</h3>
                  <div style={{ height: "5px", width: "40px", background: "#fdbb2d", borderRadius: "10px" }}></div>
                </div>
            </div>

            <Row className="mb-4 mx-0">
              <Col md="6"><Input placeholder="Tìm tên bác sĩ..." className="custom-input shadow-sm" onChange={e => setSearchTerm(e.target.value)} /></Col>
              <Col md="6">
                <Input type="select" className="custom-input shadow-sm" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                  <option value="All">Tất cả khoa</option>
                  {[...new Set(fixedDoctors.flatMap(d => d.specialization))].sort().map(s => <option key={s} value={s}>{s}</option>)}
                </Input>
              </Col>
            </Row>

            <Row className="mx-0">
              {filteredDocs.map(doc => (
                <Col md="4" className="mb-4 d-flex" key={doc.id}>
                  <div className="card shadow-sm border-0 doctor-card w-100">
                    <div className="img-container">
                      <img src={doc.img} alt={doc.name} className="img-content" />
                      <div className="id-tag">ID: {doc.id}</div>
                      {doc.vip && <div className="vip-badge">CHUYÊN GIA VIP</div>}
                    </div>
                    <CardBody className="p-4 d-flex flex-column">
                      <small className="text-primary font-weight-bold">{doc.specialization.join(" • ")}</small>
                      <h5 className="font-weight-bold text-dark mt-2">{doc.name}</h5>
                      <div className="mt-auto pt-3 d-flex justify-content-between align-items-center border-top">
                        <span className="text-danger font-weight-bold">{new Intl.NumberFormat('vi-VN').format(doc.fees)}đ</span>
                        <Button color="primary" onClick={() => handleBooking(doc)}>ĐẶT LỊCH</Button>
                      </div>
                    </CardBody>
                  </div>
                </Col>
              ))}
              {filteredDocs.length === 0 && <Col className="text-center py-5"><h5>Không tìm thấy bác sĩ nào.</h5></Col>}
            </Row>
            <Footer />
          </div>
        </div>
      </div>
      <style>{`
        .doctor-card { border-radius: 24px; overflow: hidden; transition: 0.3s; background: white; border: 1px solid #e2e8f0; }
        .doctor-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .img-container { height: 280px; position: relative; background: #f1f5f9; }
        .img-content { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  /* Chỉnh thành top để ưu tiên lấy phần đầu/mặt */
  object-position: center top; 
}
        .id-tag { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 11px; }
        .vip-badge { position: absolute; top: 10px; left: 10px; background: #fdbb2d; color: #000; padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: bold; }
        .custom-input { height: 48px !important; border-radius: 12px !important; }
      `}</style>
    </div>
  );
};

export default SearchDoctor;