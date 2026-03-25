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

import lequangdao from "../image/lequangdao.jpg";
import nguyenkimchi from "../image/nguyenkimchi.jpg";
import phamvanduc from "../image/phamvanduc.webp";
import danghonganh from "../image/danghonganh.jpg";
import vuminhquan from "../image/vuminhquan.jpg";
import tranthanhtam from "../image/tranthanhtam.jpg";
import lehongdang from "../image/lehongdang.webp";
import hoangbaolong from "../image/hoangbaolong.webp";
import nguyenvanan from "../image/nguyenvanan.jpg";
import tranthibinh from "../image/tranthibinh.jpg";
import levancuong from "../image/levancuong.jpg";
import phamthidung from "../image/phamthidung.jpg";
import hoangvanem from "../image/hoanvanem.jpg";
import phanthigiang from "../image/phanthigiang.jpg";
import vuvanhai from "../image/vuvanhai.jpg";
import dangthihoa from "../image/dangthihoa.jpg";
import buivanhung from "../image/buivanhung.jpg";
import dothilan from "../image/dothilan.jpg";
import ngovanminh from "../image/ngovanminh.jpg";
import lythingoc from "../image/lythingoc.jpg";
import duongvanphuc from "../image/duongvanphuc.jpg";
import daothiquynh from "../image/daothiquynh.jpg";
import havanson from "../image/havanson.jpg";
import chuthitrang from "../image/chuthitrang.jpg";
import doanvantu from "../image/doanvantu.jpg";

import lamthiuyen from "../image/lamthiuyen.webp";
import trinhvanviet from "../image/trinhvanviet.webp";
import phungthixuan from "../image/phungthixuan.webp";
import maivanyen from "../image/maivanyen.webp";
import caothianh from "../image/caothianh.webp";
import dinhvanbac from "../image/dinhvanbac.webp";
import kimthichuc from "../image/kimthichuc.webp";
import quachvandanh from "../image/quachvandanh.webp";
import luongthidao from "../image/luongthidao.webp";
import nghiemvangia from "../image/nghiemvangia.webp";
import tathihang from "../image/tathihang.webp";
import vivanhy from "../image/vyvanhy.jpg";
import diepthiich from "../image/diepthiich.png";
import khavanky from "../image/khavanky.png";
import nongthilien from "../image/nongthilien.webp";
import auvanmanh from "../image/auvanmanh.jpg";
import bethisnga from "../image/bethinga.jpg";
import lucvanoanh from "../image/lucvanoanh.jpg";
import macthiphuong from "../image/macthiphuong.webp";
import thachvanquan from "../image/thachvanquan.webp";
import lathirinh from "../image/lathirinh.webp";
import kieuvansang from "../image/kieuvansang.webp";
import leuthithao from "../image/leuthithao.webp";
import vanvanuan from "../image/vanvanuan.png";
import khongthivan from "../image/khongthivan.webp";
import samvanxuyen from "../image/samvanxuyen.png";
import tongthiy from "../image/tongthiy.webp";
import bacvanzui from "../image/bacvanzui.png";
import nguyenkieuchinh from "../image/nguyenkieuchinh.webp";
import phamminhdang from "../image/phamminhdang.png";
import lethidiem from "../image/lethidiem.webp";
import hoangngocduy from "../image/hoangngocduy.png";
import tranhoaigiang from "../image/tranhoaigiang.webp";
import nguyennhathuy from "../image/nguyennhathuy.png";
import vuthuhuyen from "../image/vuthuhuyen.png";
import phanbaokhanh from "../image/phanbaokhanh.png";
import dangthuylam from "../image/dangthuylam.png";
import buikhanhly from "../image/buikhanhly.png";
import dohoanglong from "../image/dohoanglong.png";

import ngothanhnga from "../image/ngothinga.jpg"; // Note: Check extension
import lyhongnhung from "../image/lyhongnhung.jpg";
import duongtuanphong from "../image/duongtuanphong.jpg";
import daominhquan from "../image/daominhquan.jpg";
import hakieuanh from "../image/hakieuanh.jpg";
import chuminhsang from "../image/chuminhsang.jpg";
import doanthuthuy from "../image/doanthuthuy.jpg";
import lambaotin from "../image/lambaotin.jpg";
import trinhuyenthu from "../image/trinhuyenthu.jpg";
import phungthevinh from "../image/phungthevinh.jpg";
import caothanhxuan from "../image/caothanhxuan.jpg";
import dinhtronghieu from "../image/dinhtronghieu.jpg";
import kimbaongan from "../image/kimbaongan.jpg";
import quachtuankiet from "../image/quachtuankiet.jpg";
import luongminhtriet from "../image/luongminhtriet.jpg";
import nghiemthuychi from "../image/nghiemthuychi.jpg";
import taanhdung from "../image/taanhdung.jpg";
import vikimlien from "../image/vikimlien.jpg";
import diepbaongoc from "../image/diepbaongoc.jpg";
import khachandong from "../image/khachandong.jpg";
import nongthuyhang from "../image/nongthuyhang.jpg";
import auminhtuan from "../image/auminhtuan.jpg";
import bethanhhuyen from "../image/bethanhhuyen.jpg";
import lucbaonam from "../image/lucbaonam.jpg";
// --- Nhóm từ xa ---
import nguyenhoaian from "../image/nguyenhoaian.jpg";
import leminhtam from "../image/leminhtam.jpg";
import trinhthuyquynh from "../image/trinhthuyquynh.jpg";
import dotuankiet from "../image/dotuankiet.jpg";
import tranbaongoc from "../image/tranbaongoc.jpg";
import vuhoanglong from "../image/vuhoanglong.jpg";
import haanhtuan from "../image/haanhtuan.jpg";
import phanthanhthao from "../image/phanthanhthao.jpg";
import nguyenminhduc from "../image/nguyenminhduc.jpg";
import lethutrang from "../image/lethutrang.jpg";
import hoanggiabao from "../image/hoanggiabao.jpg";
import phamminhanh from "../image/phamminhanh.jpg";
import danghuunam from "../image/danghuunam.jpg";
import tranvanhung from "../image/tranvanhung.png";
import lythanhhang from "../image/lythanhhang.jpg";
import ngoquocviet from "../image/ngoquocviet.jpg";
import buiminhtuan from "../image/buiminhtuan.jpg";
import dohonglien from "../image/dohonglien.jpg";
import vovankiet from "../image/vovankiet.jpg";
import nguyenthaison from "../image/nguyenthaison.jpg";
import daomylinh from "../image/daomylinh.jpg";
import trannhathoang from "../image/trannhathoang.jpg";
import lequangvinh from "../image/lequangvinh.jpg";
import nguyenthitam from "../image/nguyenthitam.jpg";
import phamgiahuy from "../image/phamgiahuy.jpg";
import dangthuthuy from "../image/dangthuthuy.jpg";
import phanvantri from "../image/phanvantri.jpg";
import lamthevinh from "../image/lamthevinh.jpg";
import hakimchi from "../image/hakimchi.png";
import truongminhnhat from "../image/truongminhnhat.jpg";


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

    { id: 13, name: "PGS. TS. LÊ QUANG ĐẠO", specialization: ["Chuyên khoa Mắt"], fees: 1200000, img: lequangdao, vip: true },
    { id: 14, name: "TS. BS. NGUYỄN KIM CHI", specialization: ["Ung bướu", "Chuyên khoa Vú"], fees: 1200000, img: nguyenkimchi, vip: true },
    { id: 15, name: "PGS. TS. PHẠM VĂN ĐỨC", specialization: ["Cộng hưởng từ", "Cắt lớp vi tính", "Chụp X-quang"], fees: 1200000, img: phamvanduc, vip: true },
    { id: 16, name: "TS. BS. ĐẶNG HỒNG ANH", specialization: ["Vô sinh - Hiếm muộn", "Sản Phụ khoa"], fees: 1200000, img: danghonganh, vip: true },
    { id: 17, name: "PGS. TS. VŨ MINH QUÂN", specialization: ["Phục hồi chức năng", "Ngoại khoa"], fees: 1200000, img: vuminhquan, vip: true },
    { id: 18, name: "TS. BS. TRẦN THANH TÂM", specialization: ["Trị liệu Tâm lý", "Sức khỏe tâm thần"], fees: 1200000, img: tranthanhtam, vip: true },
    { id: 19, name: "PGS. TS. LÊ HỒNG ĐĂNG", specialization: ["Nha khoa", "Niềng răng", "Bọc răng sứ"], fees: 1200000, img: lehongdang, vip: true },
    { id: 20, name: "TS. BS. HOÀNG BẢO LONG", specialization: ["Trồng răng Implant", "Nhổ răng khôn", "Nha khoa tổng quát"], fees: 1200000, img: hoangbaolong, vip: true },
    { id: 21, name: "BS. Nguyễn Văn An", specialization: ["Nha khoa trẻ em", "Nha khoa"], fees: 450000, img: nguyenvanan },
    { id: 22, name: "BS. Trần Thị Bình", specialization: ["Tuyến giáp"], fees: 450000, img: tranthibinh },
    { id: 23, name: "BS. Lê Văn Cường", specialization: ["Dị ứng miễn dịch"], fees: 450000, img: levancuong },
    { id: 24, name: "BS. Phạm Thị Dung", specialization: ["Truyền nhiễm"], fees: 450000, img: phamthidung },
    { id: 25, name: "BS. Hoàng Văn Em", specialization: ["Cơ Xương Khớp"], fees: 450000, img: hoangvanem },
    { id: 26, name: "BS. Phan Thị Giang", specialization: ["Thần kinh"], fees: 450000, img: phanthigiang },
    { id: 27, name: "BS. Vũ Văn Hải", specialization: ["Tiêu hóa"], fees: 450000, img: vuvanhai },
    { id: 28, name: "BS. Đặng Thị Hoa", specialization: ["Tim mạch"], fees: 450000, img: dangthihoa },
    { id: 29, name: "BS. Bùi Văn Hùng", specialization: ["Tai Mũi Họng"], fees: 450000, img: buivanhung },
    { id: 30, name: "BS. Đỗ Thị Lan", specialization: ["Cột sống"], fees: 450000, img: dothilan },
    { id: 31, name: "BS. Ngô Văn Minh", specialization: ["Y học Cổ truyền"], fees: 450000, img: ngovanminh },
    { id: 32, name: "BS. Lý Thị Ngọc", specialization: ["Châm cứu"], fees: 450000, img: lythingoc },
    { id: 33, name: "BS. Dương Văn Phúc", specialization: ["Sản Phụ khoa"], fees: 450000, img: duongvanphuc },
    { id: 34, name: "BS. Đào Thị Quỳnh", specialization: ["Siêu âm thai"], fees: 450000, img: daothiquynh },
    { id: 35, name: "BS. Hà Văn Sơn", specialization: ["Nhi khoa"], fees: 450000, img: havanson },
    { id: 36, name: "BS. Chu Thị Trang", specialization: ["Da liễu"], fees: 450000, img: chuthitrang },
    { id: 37, name: "BS. Đoàn Văn Tú", specialization: ["Bệnh Viêm gan"], fees: 450000, img: doanvantu },

    { id: 38, name: "BS. Lâm Thị Uyên", specialization: ["Sức khỏe tâm thần"], fees: 450000, img: lamthiuyen },
    { id: 39, name: "BS. Trịnh Văn Việt", specialization: ["Dị ứng miễn dịch"], fees: 450000, img: trinhvanviet },
    { id: 40, name: "BS. Phùng Thị Xuân", specialization: ["Hô hấp - Phổi"], fees: 450000, img: phungthixuan },
    { id: 41, name: "BS. Mai Văn Yên", specialization: ["Ngoại thần kinh"], fees: 450000, img: maivanyen },
    { id: 42, name: "BS. Cao Thị Anh", specialization: ["Nam học"], fees: 450000, img: caothianh },
    { id: 43, name: "BS. Đinh Văn Bắc", specialization: ["Chuyên khoa Mắt"], fees: 450000, img: dinhvanbac },
    { id: 44, name: "BS. Kim Thị Chúc", specialization: ["Thận - Tiết niệu"], fees: 450000, img: kimthichuc },
    { id: 45, name: "BS. Quách Văn Danh", specialization: ["Nội khoa"], fees: 450000, img: quachvandanh },
    { id: 46, name: "BS. Lương Thị Đào", specialization: ["Nha khoa"], fees: 450000, img: luongthidao },
    { id: 47, name: "BS. Nghiêm Văn Gia", specialization: ["Tiểu đường - Nội tiết"], fees: 450000, img: nghiemvangia },
    { id: 48, name: "BS. Tạ Thị Hằng", specialization: ["Phục hồi chức năng"], fees: 450000, img: tathihang },
    { id: 49, name: "BS. Vi Văn Hỷ", specialization: ["Cộng hưởng từ"], fees: 450000, img: vivanhy },
    { id: 50, name: "BS. Diệp Thị Ích", specialization: ["Cắt lớp vi tính"], fees: 450000, img: diepthiich },
    { id: 51, name: "BS. Kha Văn Kỷ", specialization: ["Nội soi Tiêu hóa"], fees: 450000, img: khavanky },
    { id: 52, name: "BS. Nông Thị Liên", specialization: ["Ung bướu"], fees: 450000, img: nongthilien },
    { id: 53, name: "BS. Âu Văn Mạnh", specialization: ["Da liễu thẩm mỹ"], fees: 450000, img: auvanmanh },
    { id: 54, name: "BS. Bế Thị Nga", specialization: ["Truyền nhiễm"], fees: 450000, img: bethisnga },
    { id: 55, name: "BS. Lục Văn Oanh", specialization: ["Thẩm mỹ"], fees: 450000, img: lucvanoanh },
    { id: 56, name: "BS. Mạc Thị Phương", specialization: ["Trị liệu Tâm lý"], fees: 450000, img: macthiphuong },
    { id: 57, name: "BS. Thạch Văn Quân", specialization: ["Vô sinh - Hiếm muộn"], fees: 450000, img: thachvanquan },
    { id: 58, name: "BS. La Thị Rinh", specialization: ["Chấn thương"], fees: 450000, img: lathirinh },
    { id: 59, name: "BS. Kiều Văn Sang", specialization: ["Niềng răng", "Nha khoa"], fees: 450000, img: kieuvansang },
    { id: 60, name: "BS. Lều Thị Thảo", specialization: ["Bọc răng sứ", "Nha khoa"], fees: 450000, img: leuthithao },
    { id: 61, name: "BS. Văn Văn Uẩn", specialization: ["Trồng răng Implant", "Nha khoa"], fees: 450000, img: vanvanuan },
    { id: 62, name: "BS. Khổng Thị Vân", specialization: ["Nhổ răng khôn", "Nha khoa"], fees: 450000, img: khongthivan },
    { id: 63, name: "BS. Sầm Văn Xuyên", specialization: ["Nha khoa tổng quát", "Nha khoa"], fees: 450000, img: samvanxuyen },
    { id: 64, name: "BS. Tòng Thị Ý", specialization: ["Nha khoa trẻ em", "Nha khoa"], fees: 450000, img: tongthiy },
    { id: 65, name: "BS. Bạc Văn Zui", specialization: ["Tuyến giáp"], fees: 450000, img: bacvanzui },
    { id: 66, name: "BS. Nguyễn Kiều Chinh", specialization: ["Chuyên khoa Vú"], fees: 450000, img: nguyenkieuchinh },
    { id: 67, name: "BS. Phạm Minh Đăng", specialization: ["Ngoại khoa"], fees: 450000, img: phamminhdang },
    { id: 68, name: "BS. Lê Thị Diễm", specialization: ["Chụp X-quang"], fees: 450000, img: lethidiem },
    { id: 69, name: "BS. Hoàng Ngọc Duy", specialization: ["Cơ Xương Khớp"], fees: 450000, img: hoangngocduy },
    { id: 70, name: "BS. Trần Hoài Giang", specialization: ["Thần kinh"], fees: 450000, img: tranhoaigiang },
    { id: 71, name: "BS. Nguyễn Nhật Huy", specialization: ["Tiêu hóa"], fees: 450000, img: nguyennhathuy },
    { id: 72, name: "BS. Vũ Thu Huyền", specialization: ["Tim mạch"], fees: 450000, img: vuthuhuyen },
    { id: 73, name: "BS. Phan Bảo Khánh", specialization: ["Tai Mũi Họng"], fees: 450000, img: phanbaokhanh },
    { id: 74, name: "BS. Đặng Thụy Lâm", specialization: ["Cột sống"], fees: 450000, img: dangthuylam },
    { id: 75, name: "BS. Bùi Khánh Ly", specialization: ["Y học Cổ truyền"], fees: 450000, img: buikhanhly },
    { id: 76, name: "BS. Đỗ Hoàng Long", specialization: ["Sản Phụ khoa"], fees: 450000, img: dohoanglong },

    { id: 77, name: "BS. Ngô Thanh Nga", specialization: ["Nhi khoa"], fees: 450000, img: ngothanhnga },
    { id: 78, name: "BS. Lý Hồng Nhung", specialization: ["Da liễu"], fees: 450000, img: lyhongnhung },
    { id: 79, name: "BS. Dương Tuấn Phong", specialization: ["Sức khỏe tâm thần"], fees: 450000, img: duongtuanphong },
    { id: 80, name: "BS. Đào Minh Quân", specialization: ["Hô hấp - Phổi"], fees: 450000, img: daominhquan },
    { id: 81, name: "BS. Hà Kiều Anh", specialization: ["Ngoại thần kinh"], fees: 450000, img: hakieuanh },
    { id: 82, name: "BS. Chu Minh Sang", specialization: ["Nam học"], fees: 450000, img: chuminhsang },
    { id: 83, name: "BS. Đoàn Thu Thủy", specialization: ["Chuyên khoa Mắt"], fees: 450000, img: doanthuthuy },
    { id: 84, name: "BS. Lâm Bảo Tín", specialization: ["Thận - Tiết niệu"], fees: 450000, img: lambaotin },
    { id: 85, name: "BS. Trịnh Uyên Thư", specialization: ["Nội khoa"], fees: 450000, img: trinhuyenthu },
    { id: 86, name: "BS. Phùng Thế Vinh", specialization: ["Nha khoa"], fees: 450000, img: phungthevinh },
    { id: 87, name: "BS. Cao Thanh Xuân", specialization: ["Tiểu đường - Nội tiết"], fees: 450000, img: caothanhxuan },
    { id: 88, name: "BS. Đinh Trọng Hiếu", specialization: ["Phục hồi chức năng"], fees: 450000, img: dinhtronghieu },
    { id: 89, name: "BS. Kim Bảo Ngân", specialization: ["Cộng hưởng từ"], fees: 450000, img: kimbaongan },
    { id: 90, name: "BS. Quách Tuấn Kiệt", specialization: ["Cắt lớp vi tính"], fees: 450000, img: quachtuankiet },
    { id: 91, name: "BS. Lương Minh Triết", specialization: ["Nội soi Tiêu hóa"], fees: 450000, img: luongminhtriet },
    { id: 92, name: "BS. Nghiêm Thùy Chi", specialization: ["Ung bướu"], fees: 450000, img: nghiemthuychi },
    { id: 93, name: "BS. Tạ Anh Dũng", specialization: ["Da liễu thẩm mỹ"], fees: 450000, img: taanhdung },
    { id: 94, name: "BS. Vi Kim Liên", specialization: ["Truyền nhiễm"], fees: 450000, img: vikimlien },
    { id: 95, name: "BS. Diệp Bảo Ngọc", specialization: ["Thẩm mỹ"], fees: 450000, img: diepbaongoc },
    { id: 96, name: "BS. Kha Chấn Đông", specialization: ["Trị liệu Tâm lý"], fees: 450000, img: khachandong },
    { id: 97, name: "BS. Nông Thúy Hằng", specialization: ["Vô sinh - Hiếm muộn"], fees: 450000, img: nongthuyhang },
    { id: 98, name: "BS. Âu Minh Tuấn", specialization: ["Niềng răng", "Nha khoa"], fees: 450000, img: auminhtuan },
    { id: 99, name: "BS. Bế Thanh Huyền", specialization: ["Bọc răng sứ", "Nha khoa"], fees: 450000, img: bethanhhuyen },
    { id: 100, name: "BS. Lục Bảo Nam", specialization: ["Nha khoa tổng quát", "Nha khoa"], fees: 450000, img: lucbaonam },
    { id: 101, name: "ThS. BS. Nguyễn Hoài An", specialization: ["Tư vấn, trị liệu Tâm lý từ xa"], fees: 800000, img: nguyenhoaian, vip: true },
    { id: 102, name: "Chuyên gia Lê Minh Tâm", specialization: ["Tư vấn, trị liệu Tâm lý từ xa"], fees: 600000, img: leminhtam },
    { id: 103, name: "BS. Trịnh Thúy Quỳnh", specialization: ["Tư vấn, trị liệu Tâm lý từ xa"], fees: 750000, img: trinhthuyquynh, vip: true },
    { id: 104, name: "ThS. Đỗ Tuấn Kiệt", specialization: ["Tư vấn, trị liệu Tâm lý từ xa"], fees: 500000, img: dotuankiet },
    { id: 105, name: "PGS. TS. Trần Bảo Ngọc", specialization: ["Sức khỏe tâm thần từ xa"], fees: 1200000, img: tranbaongoc, vip: true },
    { id: 106, name: "BS. Vũ Hoàng Long", specialization: ["Sức khỏe tâm thần từ xa"], fees: 850000, img: vuhoanglong },
    { id: 107, name: "Chuyên gia Hà Anh Tuấn", specialization: ["Sức khỏe tâm thần từ xa"], fees: 700000, img: haanhtuan },
    { id: 108, name: "BS. Phan Thanh Thảo", specialization: ["Sức khỏe tâm thần từ xa"], fees: 900000, img: phanthanhthao, vip: true },
    { id: 109, name: "BS. Nguyễn Minh Đức", specialization: ["Bác sĩ Da liễu từ xa"], fees: 650000, img: nguyenminhduc },
    { id: 110, name: "ThS. BS. Lê Thu Trang", specialization: ["Bác sĩ Da liễu từ xa"], fees: 800000, img: lethutrang, vip: true },
    { id: 111, name: "BS. Hoàng Gia Bảo", specialization: ["Bác sĩ Da liễu từ xa"], fees: 600000, img: hoanggiabao },
    { id: 112, name: "BS. Phạm Minh Anh", specialization: ["Bác sĩ Da liễu từ xa"], fees: 700000, img: phamminhanh },
    { id: 113, name: "PGS. TS. Đặng Hữu Nam", specialization: ["Bác sĩ Cơ-Xương-Khớp từ xa"], fees: 1100000, img: danghuunam, vip: true },
    { id: 114, name: "BS. Trần Văn Hùng", specialization: ["Bác sĩ Cơ-Xương-Khớp từ xa"], fees: 750000, img: tranvanhung },
    { id: 115, name: "BS. Lý Thanh Hằng", specialization: ["Bác sĩ Cơ-Xương-Khớp từ xa"], fees: 800000, img: lythanhhang },
    { id: 116, name: "ThS. BS. Ngô Quốc Việt", specialization: ["Bác sĩ Cơ-Xương-Khớp từ xa"], fees: 950000, img: ngoquocviet, vip: true },
    { id: 117, name: "BS. Bùi Minh Tuấn", specialization: ["Bác sĩ Tiêu hóa từ xa"], fees: 700000, img: buiminhtuan },
    { id: 118, name: "BS. Đỗ Hồng Liên", specialization: ["Bác sĩ Tiêu hóa từ xa"], fees: 650000, img: dohonglien },
    { id: 119, name: "TS. BS. Võ Văn Kiệt", specialization: ["Bác sĩ Tiêu hóa từ xa"], fees: 1000000, img: vovankiet, vip: true },
    { id: 120, name: "BS. Nguyễn Thái Sơn", specialization: ["Bác sĩ Tim mạch từ xa"], fees: 850000, img: nguyenthaison },
    { id: 121, name: "ThS. BS. Đào Mỹ Linh", specialization: ["Bác sĩ Tim mạch từ xa"], fees: 900000, img: daomylinh, vip: true },
    { id: 122, name: "BS. Trần Nhật Hoàng", specialization: ["Bác sĩ Tim mạch từ xa"], fees: 750000, img: trannhathoang },
    { id: 123, name: "BS. Lê Quang Vinh", specialization: ["Bác sĩ Tai Mũi Họng từ xa"], fees: 600000, img: lequangvinh },
    { id: 124, name: "BS. Nguyễn Thị Tâm", specialization: ["Bác sĩ Tai Mũi Họng từ xa"], fees: 650000, img: nguyenthitam },
    { id: 125, name: "TS. BS. Phạm Gia Huy", specialization: ["Bác sĩ Tai Mũi Họng từ xa"], fees: 950000, img: phamgiahuy, vip: true },
    { id: 126, name: "BS. Đặng Thu Thủy", specialization: ["Bác sĩ Thần kinh từ xa"], fees: 800000, img: dangthuthuy },
    { id: 127, name: "BS. Phan Văn Trị", specialization: ["Bác sĩ Thần kinh từ xa"], fees: 700000, img: phanvantri },
    { id: 128, name: "PGS. TS. Lâm Thế Vinh", specialization: ["Bác sĩ Thần kinh từ xa"], fees: 1200000, img: lamthevinh, vip: true },
    { id: 129, name: "Chuyên gia Hà Kim Chi", specialization: ["Bác sĩ Thần kinh từ xa"], fees: 600000, img: hakimchi },
    { id: 130, name: "BS. Trương Minh Nhật", specialization: ["Bác sĩ Thần kinh từ xa"], fees: 850000, img: truongminhnhat, vip: true },
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
      state: { 
        selectedDoctor: doc,
        // THÊM DÒNG NÀY: Nếu đang lọc theo khoa thì lấy khoa đó, 
        // nếu đang để "All" thì lấy chuyên khoa đầu tiên của bác sĩ
        selectedService: filterDept !== "All" ? filterDept : doc.specialization[0] 
      }
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