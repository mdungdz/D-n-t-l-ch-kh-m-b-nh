import React, { useState, useEffect } from "react"; 
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Row, Col } from "reactstrap";

// Import ảnh giữ nguyên 100%
import nmdLogo from "../image/nmd.png";
import alexnguyenLogo from "../image/alexx.jpg";
import hoangvanthaiLogo from "../image/hoangvanthai.jpg";
import lehoangnamLogo from "../image/lehoangnam.jpg";
import lethuhaLogo from "../image/lethuha.jpg";
import nguyenthuhaLogo from "../image/nguyenthuha.webp";
import phamdangkhoaLogo from "../image/phamdangkhoa.webp";
import phamminhtuanLogo from "../image/phamminhtuan.png";
import trannhatminhLogo from "../image/trannhatminh.jpg";
import tranthithanhLogo from "../image/tranthithanh.jpg";
import trinhcongsonLogo from "../image/trinhcongson.png";
import vuhoangyenLogo from "../image/vuhoangyen.webp";

const DoctorManagement = () => {
  // DANH SÁCH 130 BÁC SĨ (Giữ nguyên data của bạn)
  const initialDoctors = [
    { id: 1, name: "GS. TS. NGUYỄN MẠNH DŨNG", specialization: "Nội Tổng Quát", phone: "0912.000.111", status: "Đang trực", img: nmdLogo },
    { id: 2, name: "PGS. TS. PHẠM MINH TUẤN", specialization: "Tim mạch", phone: "0905.123.456", status: "Đang trực", img: phamminhtuanLogo },
    { id: 3, name: "TS. BS. LÊ THU HÀ", specialization: "Sản Phụ khoa", phone: "0988.222.333", status: "Đang trực", img: lethuhaLogo },
    { id: 4, name: "PGS. TS. NGUYỄN THU HÀ", specialization: "Nhi khoa", phone: "0977.444.555", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 5, name: "TS. BS. VŨ HOÀNG YẾN", specialization: "Da liễu", phone: "0966.555.666", status: "Đang trực", img: vuhoangyenLogo },
    { id: 6, name: "PGS. TS. TRỊNH CÔNG SƠN", specialization: "Cơ Xương Khớp", phone: "0944.777.888", status: "Đang trực", img: trinhcongsonLogo },
    { id: 7, name: "TS. BS. ALEX NGUYỄN", specialization: "Ngoại thần kinh", phone: "0933.888.999", status: "Đang trực", img: alexnguyenLogo },
    { id: 8, name: "PGS. TS. HOÀNG VĂN THÁI", specialization: "Tiêu hóa", phone: "0922.999.000", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 9, name: "TS. BS. LÊ HOÀNG NAM", specialization: "Nam học", phone: "0911.111.222", status: "Đang trực", img: lehoangnamLogo },
    { id: 10, name: "TS. BS. PHẠM ĐĂNG KHOA", specialization: "Thần kinh", phone: "0900.333.444", status: "Đang trực", img: phamdangkhoaLogo },
    { id: 11, name: "PGS. TS. TRẦN NHẬT MINH", specialization: "Tai Mũi Họng", phone: "0888.555.666", status: "Đang trực", img: trannhatminhLogo },
    { id: 12, name: "TS. BS. TRẦN THỊ THANH", specialization: "Y học Cổ truyền", phone: "0877.777.888", status: "Đang trực", img: tranthithanhLogo },
    { id: 13, name: "PGS. TS. LÊ QUANG ĐẠO", specialization: "Chuyên khoa Mắt", phone: "0912.111.013", status: "Đang trực", img: alexnguyenLogo },
    { id: 14, name: "TS. BS. NGUYỄN KIM CHI", specialization: "Ung bướu", phone: "0912.111.014", status: "Đang trực", img: lethuhaLogo },
    { id: 15, name: "PGS. TS. PHẠM VĂN ĐỨC", specialization: "Cộng hưởng từ", phone: "0912.111.015", status: "Đang trực", img: phamminhtuanLogo },
    { id: 16, name: "TS. BS. ĐẶNG HỒNG ANH", specialization: "Vô sinh - Hiếm muộn", phone: "0912.111.016", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 17, name: "PGS. TS. VŨ MINH QUÂN", specialization: "Phục hồi chức năng", phone: "0912.111.017", status: "Đang trực", img: trinhcongsonLogo },
    { id: 18, name: "TS. BS. TRẦN THANH TÂM", specialization: "Trị liệu Tâm lý", phone: "0912.111.018", status: "Đang trực", img: vuhoangyenLogo },
    { id: 19, name: "PGS. TS. LÊ HỒNG ĐĂNG", specialization: "Nha khoa", phone: "0912.111.019", status: "Đang trực", img: trannhatminhLogo },
    { id: 20, name: "TS. BS. HOÀNG BẢO LONG", specialization: "Nha khoa", phone: "0912.111.020", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 21, name: "BS. Nguyễn Văn An", specialization: "Nha khoa", phone: "0912.111.021", status: "Đang trực", img: phamminhtuanLogo },
    { id: 22, name: "BS. Trần Thị Bình", specialization: "Tuyến giáp", phone: "0912.111.022", status: "Đang trực", img: lethuhaLogo },
    { id: 23, name: "BS. Lê Văn Cường", specialization: "Dị ứng miễn dịch", phone: "0912.111.023", status: "Đang trực", img: alexnguyenLogo },
    { id: 24, name: "BS. Phạm Thị Dung", specialization: "Truyền nhiễm", phone: "0912.111.024", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 25, name: "BS. Hoàng Văn Em", specialization: "Cơ Xương Khớp", phone: "0912.111.025", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 26, name: "BS. Phan Thị Giang", specialization: "Thần kinh", phone: "0912.111.026", status: "Đang trực", img: vuhoangyenLogo },
    { id: 27, name: "BS. Vũ Văn Hải", specialization: "Tiêu hóa", phone: "0912.111.027", status: "Đang trực", img: trinhcongsonLogo },
    { id: 28, name: "BS. Đặng Thị Hoa", specialization: "Tim mạch", phone: "0912.111.028", status: "Đang trực", img: lehoangnamLogo },
    { id: 29, name: "BS. Bùi Văn Hùng", specialization: "Tai Mũi Họng", phone: "0912.111.029", status: "Đang trực", img: phamdangkhoaLogo },
    { id: 30, name: "BS. Đỗ Thị Lan", specialization: "Cột sống", phone: "0912.111.030", status: "Đang trực", img: trannhatminhLogo },
    { id: 31, name: "BS. Ngô Văn Minh", specialization: "Y học Cổ truyền", phone: "0912.111.031", status: "Đang trực", img: tranthithanhLogo },
    { id: 32, name: "BS. Lý Thị Ngọc", specialization: "Châm cứu", phone: "0912.111.032", status: "Đang trực", img: phamminhtuanLogo },
    { id: 33, name: "BS. Dương Văn Phúc", specialization: "Sản Phụ khoa", phone: "0912.111.033", status: "Đang trực", img: lethuhaLogo },
    { id: 34, name: "BS. Đào Thị Quỳnh", specialization: "Siêu âm thai", phone: "0912.111.034", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 35, name: "BS. Hà Văn Sơn", specialization: "Nhi khoa", phone: "0912.111.035", status: "Đang trực", img: vuhoangyenLogo },
    { id: 36, name: "BS. Chu Thị Trang", specialization: "Da liễu", phone: "0912.111.036", status: "Đang trực", img: trinhcongsonLogo },
    { id: 37, name: "BS. Đoàn Văn Tú", specialization: "Bệnh Viêm gan", phone: "0912.111.037", status: "Đang trực", img: alexnguyenLogo },
    { id: 38, name: "BS. Lâm Thị Uyên", specialization: "Sức khỏe tâm thần", phone: "0912.111.038", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 39, name: "BS. Trịnh Văn Việt", specialization: "Dị ứng miễn dịch", phone: "0912.111.039", status: "Đang trực", img: lehoangnamLogo },
    { id: 40, name: "BS. Phùng Thị Xuân", specialization: "Hô hấp - Phổi", phone: "0912.111.040", status: "Đang trực", img: phamdangkhoaLogo },
    { id: 41, name: "BS. Mai Văn Yên", specialization: "Ngoại thần kinh", phone: "0912.111.041", status: "Đang trực", img: trannhatminhLogo },
    { id: 42, name: "BS. Cao Thị Anh", specialization: "Nam học", phone: "0912.111.042", status: "Đang trực", img: tranthithanhLogo },
    { id: 43, name: "BS. Đinh Văn Bắc", specialization: "Chuyên khoa Mắt", phone: "0912.111.043", status: "Đang trực", img: phamminhtuanLogo },
    { id: 44, name: "BS. Kim Thị Chúc", specialization: "Thận - Tiết niệu", phone: "0912.111.044", status: "Đang trực", img: lethuhaLogo },
    { id: 45, name: "BS. Quách Văn Danh", specialization: "Nội khoa", phone: "0912.111.045", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 46, name: "BS. Lương Thị Đào", specialization: "Nha khoa", phone: "0912.111.046", status: "Đang trực", img: vuhoangyenLogo },
    { id: 47, name: "BS. Nghiêm Văn Gia", specialization: "Tiểu đường - Nội tiết", phone: "0912.111.047", status: "Đang trực", img: trinhcongsonLogo },
    { id: 48, name: "BS. Tạ Thị Hằng", specialization: "Phục hồi chức năng", phone: "0912.111.048", status: "Đang trực", img: alexnguyenLogo },
    { id: 49, name: "BS. Vi Văn Hỷ", specialization: "Cộng hưởng từ", phone: "0912.111.049", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 50, name: "BS. Diệp Thị Ích", specialization: "Cắt lớp vi tính", phone: "0912.111.050", status: "Đang trực", img: lehoangnamLogo },
    { id: 51, name: "BS. Kha Văn Kỷ", specialization: "Nội soi Tiêu hóa", phone: "0912.111.051", status: "Đang trực", img: phamdangkhoaLogo },
    { id: 52, name: "BS. Nông Thị Liên", specialization: "Ung bướu", phone: "0912.111.052", status: "Đang trực", img: trannhatminhLogo },
    { id: 53, name: "BS. Âu Văn Mạnh", specialization: "Da liễu thẩm mỹ", phone: "0912.111.053", status: "Đang trực", img: tranthithanhLogo },
    { id: 54, name: "BS. Bế Thị Nga", specialization: "Truyền nhiễm", phone: "0912.111.054", status: "Đang trực", img: phamminhtuanLogo },
    { id: 55, name: "BS. Lục Văn Oanh", specialization: "Thẩm mỹ", phone: "0912.111.055", status: "Đang trực", img: lethuhaLogo },
    { id: 56, name: "BS. Mạc Thị Phương", specialization: "Trị liệu Tâm lý", phone: "0912.111.056", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 57, name: "BS. Thạch Văn Quân", specialization: "Vô sinh - Hiếm muộn", phone: "0912.111.057", status: "Đang trực", img: vuhoangyenLogo },
    { id: 58, name: "BS. La Thị Rinh", specialization: "Chấn thương", phone: "0912.111.058", status: "Đang trực", img: trinhcongsonLogo },
    { id: 59, name: "BS. Kiều Văn Sang", specialization: "Nha khoa", phone: "0912.111.059", status: "Đang trực", img: alexnguyenLogo },
    { id: 60, name: "BS. Lều Thị Thảo", specialization: "Nha khoa", phone: "0912.111.060", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 61, name: "BS. Văn Văn Uẩn", specialization: "Nha khoa", phone: "0912.111.061", status: "Đang trực", img: lehoangnamLogo },
    { id: 62, name: "BS. Khổng Thị Vân", specialization: "Nha khoa", phone: "0912.111.062", status: "Đang trực", img: phamdangkhoaLogo },
    { id: 63, name: "BS. Sầm Văn Xuyên", specialization: "Nha khoa", phone: "0912.111.063", status: "Đang trực", img: trannhatminhLogo },
    { id: 64, name: "BS. Tòng Thị Ý", specialization: "Nha khoa", phone: "0912.111.064", status: "Đang trực", img: tranthithanhLogo },
    { id: 65, name: "BS. Bạc Văn Zui", specialization: "Tuyến giáp", phone: "0912.111.065", status: "Đang trực", img: phamminhtuanLogo },
    { id: 66, name: "BS. Nguyễn Kiều Chinh", specialization: "Chuyên khoa Vú", phone: "0912.111.066", status: "Đang trực", img: lethuhaLogo },
    { id: 67, name: "BS. Phạm Minh Đăng", specialization: "Ngoại khoa", phone: "0912.111.067", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 68, name: "BS. Lê Thị Diễm", specialization: "Chụp X-quang", phone: "0912.111.068", status: "Đang trực", img: vuhoangyenLogo },
    { id: 69, name: "BS. Hoàng Ngọc Duy", specialization: "Cơ Xương Khớp", phone: "0912.111.069", status: "Đang trực", img: trinhcongsonLogo },
    { id: 70, name: "BS. Trần Hoài Giang", specialization: "Thần kinh", phone: "0912.111.070", status: "Đang trực", img: alexnguyenLogo },
    { id: 71, name: "BS. Nguyễn Nhật Huy", specialization: "Tiêu hóa", phone: "0912.111.071", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 72, name: "BS. Vũ Thu Huyền", specialization: "Tim mạch", phone: "0912.111.072", status: "Đang trực", img: lehoangnamLogo },
    { id: 73, name: "BS. Phan Bảo Khánh", specialization: "Tai Mũi Họng", phone: "0912.111.073", status: "Đang trực", img: phamdangkhoaLogo },
    { id: 74, name: "BS. Đặng Thụy Lâm", specialization: "Cột sống", phone: "0912.111.074", status: "Đang trực", img: trannhatminhLogo },
    { id: 75, name: "BS. Bùi Khánh Ly", specialization: "Y học Cổ truyền", phone: "0912.111.075", status: "Đang trực", img: tranthithanhLogo },
    { id: 76, name: "BS. Đỗ Hoàng Long", specialization: "Sản Phụ khoa", phone: "0912.111.076", status: "Đang trực", img: phamminhtuanLogo },
    { id: 77, name: "BS. Ngô Thanh Nga", specialization: "Nhi khoa", phone: "0912.111.077", status: "Đang trực", img: lethuhaLogo },
    { id: 78, name: "BS. Lý Hồng Nhung", specialization: "Da liễu", phone: "0912.111.078", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 79, name: "BS. Dương Tuấn Phong", specialization: "Sức khỏe tâm thần", phone: "0912.111.079", status: "Đang trực", img: vuhoangyenLogo },
    { id: 80, name: "BS. Đào Minh Quân", specialization: "Hô hấp - Phổi", phone: "0912.111.080", status: "Đang trực", img: trinhcongsonLogo },
    { id: 81, name: "BS. Hà Kiều Anh", specialization: "Ngoại thần kinh", phone: "0912.111.081", status: "Đang trực", img: alexnguyenLogo },
    { id: 82, name: "BS. Chu Minh Sang", specialization: "Nam học", phone: "0912.111.082", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 83, name: "BS. Đoàn Thu Thủy", specialization: "Chuyên khoa Mắt", phone: "0912.111.083", status: "Đang trực", img: lehoangnamLogo },
    { id: 84, name: "BS. Lâm Bảo Tín", specialization: "Thận - Tiết niệu", phone: "0912.111.084", status: "Đang trực", img: phamdangkhoaLogo },
    { id: 85, name: "BS. Trịnh Uyên Thư", specialization: "Nội khoa", phone: "0912.111.085", status: "Đang trực", img: trannhatminhLogo },
    { id: 86, name: "BS. Phùng Thế Vinh", specialization: "Nha khoa", phone: "0912.111.086", status: "Đang trực", img: tranthithanhLogo },
    { id: 87, name: "BS. Cao Thanh Xuân", specialization: "Tiểu đường - Nội tiết", phone: "0912.111.087", status: "Đang trực", img: phamminhtuanLogo },
    { id: 88, name: "BS. Đinh Trọng Hiếu", specialization: "Phục hồi chức năng", phone: "0912.111.088", status: "Đang trực", img: lethuhaLogo },
    { id: 89, name: "BS. Kim Bảo Ngân", specialization: "Cộng hưởng từ", phone: "0912.111.089", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 90, name: "BS. Quách Tuấn Kiệt", specialization: "Cắt lớp vi tính", phone: "0912.111.090", status: "Đang trực", img: vuhoangyenLogo },
    { id: 91, name: "BS. Lương Minh Triết", specialization: "Nội soi Tiêu hóa", phone: "0912.111.091", status: "Đang trực", img: trinhcongsonLogo },
    { id: 92, name: "BS. Nghiêm Thùy Chi", specialization: "Ung bướu", phone: "0912.111.092", status: "Đang trực", img: alexnguyenLogo },
    { id: 93, name: "BS. Tạ Anh Dũng", specialization: "Da liễu thẩm mỹ", phone: "0912.111.093", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 94, name: "BS. Vi Kim Liên", specialization: "Truyền nhiễm", phone: "0912.111.094", status: "Đang trực", img: lehoangnamLogo },
    { id: 95, name: "BS. Diệp Bảo Ngọc", specialization: "Thẩm mỹ", phone: "0912.111.095", status: "Đang trực", img: phamdangkhoaLogo },
    { id: 96, name: "BS. Kha Chấn Đông", specialization: "Trị liệu Tâm lý", phone: "0912.111.096", status: "Đang trực", img: trannhatminhLogo },
    { id: 97, name: "BS. Nông Thúy Hằng", specialization: "Vô sinh - Hiếm muộn", phone: "0912.111.097", status: "Đang trực", img: tranthithanhLogo },
    { id: 98, name: "BS. Âu Minh Tuấn", specialization: "Nha khoa", phone: "0912.111.098", status: "Đang trực", img: phamminhtuanLogo },
    { id: 99, name: "BS. Bế Thanh Huyền", specialization: "Nha khoa", phone: "0912.111.099", status: "Đang trực", img: lethuhaLogo },
    { id: 100, name: "BS. Lục Bảo Nam", specialization: "Nha khoa", phone: "0912.111.100", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 101, name: "ThS. BS. Nguyễn Hoài An", specialization: "Tâm lý từ xa", phone: "0912.111.101", status: "Đang trực", img: phamminhtuanLogo },
    { id: 102, name: "Chuyên gia Lê Minh Tâm", specialization: "Tâm lý từ xa", phone: "0912.111.102", status: "Đang trực", img: lethuhaLogo },
    { id: 103, name: "BS. Trịnh Thúy Quỳnh", specialization: "Tâm lý từ xa", phone: "0912.111.103", status: "Đang trực", img: vuhoangyenLogo },
    { id: 104, name: "ThS. Đỗ Tuấn Kiệt", specialization: "Tâm lý từ xa", phone: "0912.111.104", status: "Đang trực", img: alexnguyenLogo },
    { id: 105, name: "PGS. TS. Trần Bảo Ngọc", specialization: "Tâm lý từ xa", phone: "0912.111.105", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 106, name: "BS. Vũ Hoàng Long", specialization: "Tâm lý từ xa", phone: "0912.111.106", status: "Đang trực", img: trinhcongsonLogo },
    { id: 107, name: "Chuyên gia Hà Anh Tuấn", specialization: "Tâm lý từ xa", phone: "0912.111.107", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 108, name: "BS. Phan Thanh Thảo", specialization: "Tâm lý từ xa", phone: "0912.111.108", status: "Đang trực", img: trannhatminhLogo },
    { id: 109, name: "BS. Nguyễn Minh Đức", specialization: "Da liễu từ xa", phone: "0912.111.109", status: "Đang trực", img: phamdangkhoaLogo },
    { id: 110, name: "ThS. BS. Lê Thu Trang", specialization: "Da liễu từ xa", phone: "0912.111.110", status: "Đang trực", img: lethuhaLogo },
    { id: 111, name: "BS. Hoàng Gia Bảo", specialization: "Da liễu từ xa", phone: "0912.111.111", status: "Đang trực", img: tranthithanhLogo },
    { id: 112, name: "BS. Phạm Minh Anh", specialization: "Da liễu từ xa", phone: "0912.111.112", status: "Đang trực", img: vuhoangyenLogo },
    { id: 113, name: "PGS. TS. Đặng Hữu Nam", specialization: "Cơ-Xương-Khớp từ xa", phone: "0912.111.113", status: "Đang trực", img: alexnguyenLogo },
    { id: 114, name: "BS. Trần Văn Hùng", specialization: "Cơ-Xương-Khớp từ xa", phone: "0912.111.114", status: "Đang trực", img: trinhcongsonLogo },
    { id: 115, name: "BS. Lý Thanh Hằng", specialization: "Cơ-Xương-Khớp từ xa", phone: "0912.111.115", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 116, name: "ThS. BS. Ngô Quốc Việt", specialization: "Cơ-Xương-Khớp từ xa", phone: "0912.111.116", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 117, name: "BS. Bùi Minh Tuấn", specialization: "Tiêu hóa từ xa", phone: "0912.111.117", status: "Đang trực", img: phamminhtuanLogo },
    { id: 118, name: "BS. Đỗ Hồng Liên", specialization: "Tiêu hóa từ xa", phone: "0912.111.118", status: "Đang trực", img: lethuhaLogo },
    { id: 119, name: "TS. BS. Võ Văn Kiệt", specialization: "Tiêu hóa từ xa", phone: "0912.111.119", status: "Đang trực", img: trannhatminhLogo },
    { id: 120, name: "BS. Nguyễn Thái Sơn", specialization: "Tim mạch từ xa", phone: "0912.111.120", status: "Đang trực", img: lehoangnamLogo },
    { id: 121, name: "ThS. BS. Đào Mỹ Linh", specialization: "Tim mạch từ xa", phone: "0912.111.121", status: "Đang trực", img: vuhoangyenLogo },
    { id: 122, name: "BS. Trần Nhật Hoàng", specialization: "Tim mạch từ xa", phone: "0912.111.122", status: "Đang trực", img: phamdangkhoaLogo },
    { id: 123, name: "BS. Lê Quang Vinh", specialization: "Tai Mũi Họng từ xa", phone: "0912.111.123", status: "Đang trực", img: alexnguyenLogo },
    { id: 124, name: "BS. Nguyễn Thị Tâm", specialization: "Tai Mũi Họng từ xa", phone: "0912.111.124", status: "Đang trực", img: tranthithanhLogo },
    { id: 125, name: "TS. BS. Phạm Gia Huy", specialization: "Tai Mũi Họng từ xa", phone: "0912.111.125", status: "Đang trực", img: trinhcongsonLogo },
    { id: 126, name: "BS. Đặng Thu Thủy", specialization: "Thần kinh từ xa", phone: "0912.111.126", status: "Đang trực", img: nguyenthuhaLogo },
    { id: 127, name: "BS. Phan Văn Trị", specialization: "Thần kinh từ xa", phone: "0912.111.127", status: "Đang trực", img: hoangvanthaiLogo },
    { id: 128, name: "PGS. TS. Lâm Thế Vinh", specialization: "Thần kinh từ xa", phone: "0912.111.128", status: "Đang trực", img: alexnguyenLogo },
    { id: 129, name: "Chuyên gia Hà Kim Chi", specialization: "Thần kinh từ xa", phone: "0912.111.129", status: "Đang trực", img: lethuhaLogo },
    { id: 130, name: "BS. Trương Minh Nhật", specialization: "Thần kinh từ xa", phone: "0912.111.130", status: "Đang trực", img: phamminhtuanLogo },
  ];

  // Logic LocalStorage
  const [doctors, setDoctors] = useState(() => {
    const savedDoctors = localStorage.getItem("doctors");
    return savedDoctors ? JSON.parse(savedDoctors) : initialDoctors;
  });

  const [modal, setModal] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState({ name: "", specialization: "Nội Tổng Quát", phone: "", status: "Đang trực" });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const toggle = () => setModal(!modal);

  const handleAddClick = () => {
    setCurrentDoctor({ name: "", specialization: "Nội Tổng Quát", phone: "", status: "Đang trực" });
    setIsEdit(false);
    toggle();
  };

  const handleEditClick = (doc) => {
    setCurrentDoctor(doc);
    setIsEdit(true);
    toggle();
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bác sĩ này khỏi hệ thống?")) {
      const updatedDoctors = doctors.filter(d => d.id !== id);
      setDoctors(updatedDoctors);
    }
  };

  const handleSave = () => {
    if (!currentDoctor.name || !currentDoctor.phone) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    let updatedDoctors;
    if (isEdit) {
      updatedDoctors = doctors.map(d => d.id === currentDoctor.id ? currentDoctor : d);
    } else {
      const newDoc = { ...currentDoctor, id: Date.now(), img: "https://via.placeholder.com/40" };
      updatedDoctors = [...doctors, newDoc];
    }
    setDoctors(updatedDoctors);
    toggle();
  };

  return (
    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "20px", backgroundColor: "#fff" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="font-weight-bold mb-0">DANH SÁCH ĐỘI NGŨ BÁC SĨ</h5>
          <small className="text-muted">Quản lý thông tin và trạng thái làm việc ({doctors.length} bác sĩ)</small>
        </div>
        <button className="btn btn-danger px-4 font-weight-bold" style={{ borderRadius: "10px" }} onClick={handleAddClick}>
          + THÊM BÁC SĨ
        </button>
      </div>

      <div className="table-responsive" style={{ maxHeight: "600px", overflowY: "auto" }}>
        <table className="table table-hover align-middle">
          <thead className="thead-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr className="text-uppercase" style={{ fontSize: "13px", letterSpacing: "0.5px" }}>
              <th>Bác sĩ</th>
              <th>Chuyên khoa</th>
              <th>Số điện thoại</th>
              <th>Trạng thái</th>
              <th className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc, index) => (
              <tr key={`${doc.id}-${index}`}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={doc.img || "https://via.placeholder.com/40"}
                      alt="avatar"
                      style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "cover", marginRight: "12px" }}
                    />
                    <span className="font-weight-bold text-dark">{doc.name}</span>
                  </div>
                </td>
                <td><span className="badge badge-info p-2" style={{ borderRadius: "5px" }}>{doc.specialization}</span></td>
                <td className="text-muted">{doc.phone}</td>
                <td>
                  <span className={`badge ${doc.status === "Đang trực" ? "badge-success" : doc.status === "Nghỉ phép" ? "badge-warning" : "badge-secondary"} p-2`}>
                    {doc.status}
                  </span>
                </td>
                <td className="text-center">
                  <button className="btn btn-sm btn-outline-primary mr-2" onClick={() => handleEditClick(doc)}>Sửa</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(doc.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className="border-0 font-weight-bold">
          {isEdit ? "CHỈNH SỬA THÔNG TIN" : "THÊM BÁC SĨ MỚI"}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12} className="mb-3">
              <Label className="small font-weight-bold">Họ và tên bác sĩ</Label>
              <Input
                type="text"
                value={currentDoctor.name}
                onChange={(e) => setCurrentDoctor({...currentDoctor, name: e.target.value})}
                placeholder="VD: GS. TS. Nguyễn Văn A"
              />
            </Col>
            <Col md={6} className="mb-3">
              <Label className="small font-weight-bold">Chuyên khoa</Label>
              <Input
                type="text"
                value={currentDoctor.specialization}
                onChange={(e) => setCurrentDoctor({...currentDoctor, specialization: e.target.value})}
              />
            </Col>
            <Col md={6} className="mb-3">
              <Label className="small font-weight-bold">Số điện thoại</Label>
              <Input
                type="text"
                value={currentDoctor.phone}
                onChange={(e) => setCurrentDoctor({...currentDoctor, phone: e.target.value})}
                placeholder="09xx.xxx.xxx"
              />
            </Col>
            <Col md={12} className="mb-3">
              <Label className="small font-weight-bold">Trạng thái làm việc</Label>
              <Input
                type="select"
                value={currentDoctor.status}
                onChange={(e) => setCurrentDoctor({...currentDoctor, status: e.target.value})}
              >
                <option value="Đang trực">Đang trực</option>
                <option value="Nghỉ phép">Nghỉ phép</option>
                <option value="Hết ca">Hết ca</option>
              </Input>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="border-0">
          <Button color="secondary" onClick={toggle}>Hủy</Button>
          <Button color="danger" onClick={handleSave}>LƯU THÔNG TIN</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DoctorManagement;