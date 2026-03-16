const router = require("express").Router();
const doctors = require("../models/doctor.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Import Model Appointment
const Appointment = require("../models/appointment.model"); 
const { Doctor, Slot, DateSchedule } = doctors;
const bcrypt = require('../bcrypt/bcrypt');

// Hàm tạo slot mặc định
function createDate(date) {
    return new DateSchedule({
        date: date,
        slots: [
            new Slot({ time: "09:00:00", isBooked: false }),
            new Slot({ time: "12:00:00", isBooked: false }),
            new Slot({ time: "15:00:00", isBooked: false }),
        ],
    });
}

// 1. Lấy danh sách bác sĩ
router.route("/").get((req, res) => {
    Doctor.find()
        .then((doctors) => res.json(doctors))
        .catch((err) => res.status(400).json(`Error : ${err}`));
});

// 2. Đăng nhập Bác sĩ
router.route("/login").post(async (req, res) => {
    try {
        const { username, password } = req.body;
        const passwordSalt = process.env.PASSWORD_SALT;
        const encryptedPassword = bcrypt.hash(password, passwordSalt);

        const doctor = await Doctor.findOne({ username, password: encryptedPassword });

        if (!doctor) {
            return res.status(201).json({ message: "wrong username or password" });
        }

        const token = jwt.sign(JSON.stringify(doctor), process.env.KEY, {
            algorithm: process.env.ALGORITHM,
        });

        return res.status(200).json({ token: token.toString() });
    } catch (err) {
        res.status(400).json(err);
    }
});

// 3. Lấy Slot trống
router.route("/get-slots").post(async (req, res) => {
    try {
        const { doctorId, date } = req.body;
        const doctor = await Doctor.findOne({ _id: doctorId });

        if (!doctor) return res.status(201).json({ message: "Doctor not found" });

        let existingDate = doctor.dates.find(d => d.date === date);
        if (existingDate) return res.status(200).json(existingDate);

        const dateSchedule = createDate(date);
        const updatedDoctor = await Doctor.findOneAndUpdate(
            { _id: doctorId },
            { $push: { dates: dateSchedule } },
            { new: true }
        );
        res.status(200).json(updatedDoctor.dates[updatedDoctor.dates.length - 1]);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// 4. Đặt lịch hẹn (Book Slot)
router.route("/book-slot").post((req, res) => {
    // Thêm bookedBy từ req.body gửi lên
    const { googleId, patientName, doctorId, slotId, dateId, bookedBy } = req.body;

    Doctor.findOne({ _id: doctorId }).then((doctor) => {
        const dateObj = doctor.dates.id(dateId);
        const slot = dateObj.slots.id(slotId);
        slot.isBooked = true;

        doctor.save().then(() => {
            const newAppointment = new Appointment({
                doctorId,
                dateId,
                slotId,
                patientId: googleId,
                date: dateObj.date,
                slotTime: slot.time,
                doctorName: doctor.name,
                patientName: patientName,
                bookedBy: bookedBy, // LƯU Tên đăng nhập hoặc Email người đang ngồi đặt
                status: 'pending'
            });

            newAppointment.save()
                .then((appointment) => res.status(200).json(appointment))
                .catch((err) => res.status(400).json(err));
        });
    });
});

// 5. Lấy lịch hẹn HÔM NAY (Chỉ lấy ca chưa hoàn thành)
router.route('/todays-appointments').post(async (req, res) => {
    try {
        const { doctorId } = req.body;
        const now = new Date();
        const currDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; 

        const appointments = await Appointment.find({
            $or: [
                { doctorId: doctorId },
                { doctorId: doctorId?.toString() }
            ],
            date: currDate,
            status: { $ne: 'Finished' } // Không lấy ca đã khám xong
        });

        const sorted = appointments.sort((a, b) => (a.slotTime || "").localeCompare(b.slotTime || ""));
        res.status(200).json(sorted);
    } catch (err) {
        res.status(400).json(err);
    }
});

// 6. Xử lý khi bấm nút KHÁM xong (Hoàn thành)
router.post('/finish-appointment', async (req, res) => {
    try {
        const { appointmentId } = req.body;
        
        await Appointment.findByIdAndUpdate(
            appointmentId, 
            { status: 'Finished' }
        );

        res.json({ success: true, message: "Đã chuyển vào lịch sử khám!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Lấy lịch sử tất cả ca đã khám
router.route('/appointment-history').post(async (req, res) => {
    try {
        const { doctorId } = req.body;
        const history = await Appointment.find({
            $or: [
                { doctorId: doctorId },
                { doctorId: doctorId?.toString() }
            ],
            status: 'Finished'
        }).sort({ date: -1, slotTime: -1 });

        res.status(200).json(history);
    } catch (err) {
        res.status(400).json(err);
    }
});

// 8. Lấy lịch sử khám của riêng 1 bệnh nhân
router.route('/patient-history').post(async (req, res) => {
    try {
        const { bookedBy } = req.body; // Nhận định danh từ Frontend gửi lên
        
        // Nếu không gửi thông tin định danh, trả về mảng rỗng ngay lập tức
        if (!bookedBy) return res.json([]);

        const history = await Appointment.find({
            bookedBy: bookedBy, // CHÌA KHÓA BẢO MẬT: Chỉ lấy ca của mình
            status: 'Finished'
        }).sort({ date: -1 });
        
        res.status(200).json(history);
    } catch (err) {
        res.status(400).json(err);
    }
});
// API lấy lịch đang chờ (Appointment Status) - Chỉ cho chính chủ
router.route('/patient-status').post(async (req, res) => {
    try {
        const { bookedBy } = req.body;
        if (!bookedBy) return res.json([]);

        const status = await Appointment.find({
            bookedBy: bookedBy,
            status: { $ne: 'Finished' } // Lấy những ca chưa khám xong
        }).sort({ date: 1 });

        res.status(200).json(status);
    } catch (err) {
        res.status(400).json(err);
    }
});
// 9. API gửi Đánh giá & Phản hồi
router.post('/submit-feedback', async (req, res) => {
    try {
        const { appointmentId, rating, feedbackContent } = req.body;
        await Appointment.findByIdAndUpdate(
            appointmentId, 
            { rating: rating, feedbackContent: feedbackContent }
        );
        res.json({ success: true, message: "Cảm ơn bạn đã đánh giá!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;