const router = require('express').Router();
const Patient = require('../models/patient.model');
const appointmentImport = require('../models/appointment.model');
const jwt = require('jsonwebtoken');
const stripe = require("stripe")("sk_test_51IabQNSCj4BydkZ38AsoDragCM19yaMzGyBVng5KUZnCNrxCJuj308HmdAvoRcUEe2PEdoORMosOaRz1Wl8UX0Gt00FCuSwYpz")
const { v4: uuidv4 } = require('uuid');
const { Appointment } = appointmentImport;

// 1. LẤY LỊCH SỬ KHÁM (Đã sửa để lọc chính chủ)
router.route('/previous-appointments').post(async (req, res) => {
    try {
        const { bookedBy } = req.body; // Email hoặc Tên người đăng nhập
        if (!bookedBy) return res.json([]);

        // Tìm tất cả ca do người này đặt
        const appointments = await Appointment.find({ bookedBy: bookedBy });

        const date = new Date();
        // Tạo chuỗi thời gian hiện tại để so sánh
        let currDateTime = date.getFullYear() + "-" 
            + String(date.getMonth() + 1).padStart(2, '0') + "-" 
            + String(date.getDate()).padStart(2, '0') + "T" 
            + String(date.getHours()).padStart(2, '0') + ":" 
            + String(date.getMinutes()).padStart(2, '0');

        const filteredAppointments = appointments.filter((appointment) => {
            // Lịch sử = Thời gian đã qua HOẶC trạng thái đã xong
            return Date.parse(currDateTime) >= Date.parse(appointment.date + 'T' + appointment.slotTime) 
                   || appointment.status === 'Finished';
        });

        const sortedAppointments = filteredAppointments.sort((a, b) => {
            return Date.parse(b.date + 'T' + b.slotTime) - Date.parse(a.date + 'T' + a.slotTime);
        });

        res.status(200).json(sortedAppointments);
    } catch (err) {
        res.status(400).json(err);
    }
});

// 2. LẤY LỊCH SẮP TỚI (Đã sửa để lọc chính chủ)
router.route('/upcoming-appointments').post(async (req, res) => {
    try {
        const { bookedBy } = req.body;
        if (!bookedBy) return res.json([]);

        // Chỉ lấy những ca do mình đặt và CHƯA hoàn thành
        const appointments = await Appointment.find({ 
            bookedBy: bookedBy,
            status: { $ne: 'Finished' } 
        });

        const date = new Date();
        let currDateTime = date.getFullYear() + "-" 
            + String(date.getMonth() + 1).padStart(2, '0') + "-" 
            + String(date.getDate()).padStart(2, '0') + "T" 
            + String(date.getHours()).padStart(2, '0') + ":" 
            + String(date.getMinutes()).padStart(2, '0');

        const filteredAppointments = appointments.filter((appointment) => {
            // Sắp tới = Thời gian chưa tới
            return Date.parse(currDateTime) <= Date.parse(appointment.date + 'T' + appointment.slotTime);
        });

        const sortedAppointments = filteredAppointments.sort((a, b) => {
            return Date.parse(a.date + 'T' + a.slotTime) - Date.parse(b.date + 'T' + b.slotTime);
        });

        res.status(200).json(sortedAppointments);
    } catch (err) {
        res.status(400).json(err);
    }
});

// 3. XỬ LÝ ĐẶT LỊCH MỚI (Thêm bookedBy)
router.route('/book-appointment').post(async (req, res) => {
    try {
        const { 
            patientName, phone, email, description, 
            doctorId, doctorName, fees, date, time, 
            paymentMethod, patientId, bookedBy 
        } = req.body;

        const newAppointment = new Appointment({
            patientId,
            patientName, // Tên người khám (có thể là người thân)
            phoneNumber: phone,
            patientEmail: email,
            description,
            doctorId,
            doctorName,
            fees,
            date,
            slotTime: time.split(" - ")[0],
            bookedBy: bookedBy, // LƯU NGƯỜI THỰC HIỆN ĐẶT
            paymentStatus: paymentMethod === 'qr' ? 'Paid' : 'Pending',
            status: 'pending'
        });

        await newAppointment.save();
        res.status(200).json({ message: 'Đặt lịch thành công!' });
    } catch (err) {
        res.status(400).json({ message: 'Lỗi hệ thống khi lưu lịch' });
    }
});

// --- CÁC ROUTE CŨ GIỮ NGUYÊN ---
router.route('/google-login').post(async (req, res) => { /* Code cũ của bác */ });
router.route('/update-profile/:id').post(async (req, res) => { /* Code cũ của bác */ });
router.route('/payment').post(async (req, res) => { /* Code cũ của bác */ });

module.exports = router;