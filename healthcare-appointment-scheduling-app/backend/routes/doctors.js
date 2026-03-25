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
                bookedBy: bookedBy,
                status: 'pending'
            });

            newAppointment.save()
                .then((appointment) => res.status(200).json(appointment))
                .catch((err) => res.status(400).json(err));
        });
    });
});

// 5. Lấy lịch hẹn HÔM NAY (Chỉnh status để lọc chuẩn)
router.route('/todays-appointments').post(async (req, res) => {
    try {
        const { doctorId } = req.body;
        const now = new Date();
        const currDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; 

        const appointments = await Appointment.find({
            doctorId: doctorId,
            date: currDate,
            status: { $nin: ['FINISHED', 'Finished'] } 
        });

        const sorted = appointments.sort((a, b) => (a.slotTime || "").localeCompare(b.slotTime || ""));
        res.status(200).json(sorted);
    } catch (err) {
        res.status(400).json(err);
    }
});

// 6. Lưu phiếu khám bệnh chi tiết (Đã sửa medicalRecord -> medicalDetails)
router.post("/save-medical-record", async (req, res) => {
  try {
    const { 
      appointmentId, 
      symptoms, 
      history, 
      tests, 
      diagnosis, 
      prescription, 
      advice,
      gender,
      dob,
      hometown 
    } = req.body;

    const updatedApp = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        $set: {
          // KHỚP VỚI MODEL: medicalDetails
          medicalDetails: {
            symptoms,
            history,
            tests,
            diagnosis,
            prescription,
            advice,
            gender,
            dob,
            hometown,
          },
          status: "FINISHED", // Đồng bộ để Dashboard tính tiền
          finishDate: new Date().toISOString().split('T')[0]
        }
      },
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ success: false, message: "Không tìm thấy ca khám!" });
    }

    res.json({ success: true, message: "Lưu phiếu khám thành công!", data: updatedApp });
  } catch (error) {
    console.error("Lỗi Backend:", error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống khi lưu phiếu!" });
  }
});

// 7. Xử lý khi bấm nút KHÁM xong
router.post('/finish-appointment', async (req, res) => {
    try {
        const { appointmentId } = req.body;
        await Appointment.findByIdAndUpdate(
            appointmentId, 
            { status: 'FINISHED' }
        );
        res.json({ success: true, message: "Đã chuyển vào lịch sử khám!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 8. Lấy lịch sử tất cả ca đã khám
router.route('/appointment-history').post(async (req, res) => {
    try {
        const { doctorId } = req.body;
        const history = await Appointment.find({
            doctorId: doctorId,
            status: { $in: ['FINISHED', 'Finished'] }
        }).sort({ date: -1, slotTime: -1 });

        res.status(200).json(history);
    } catch (err) {
        res.status(400).json(err);
    }
});

// 9. Lấy lịch sử khám của riêng 1 bệnh nhân
router.route('/patient-history').post(async (req, res) => {
    try {
        const { bookedBy } = req.body; 
        if (!bookedBy) return res.json([]);

        const history = await Appointment.find({
            bookedBy: bookedBy,
            status: { $in: ['FINISHED', 'Finished'] }
        }).sort({ date: -1 });
        
        res.status(200).json(history);
    } catch (err) {
        res.status(400).json(err);
    }
});

// 10. API lấy lịch đang chờ
router.route('/patient-status').post(async (req, res) => {
    try {
        const { bookedBy } = req.body;
        if (!bookedBy) return res.json([]);

        const status = await Appointment.find({
            bookedBy: bookedBy,
            status: { $nin: ['FINISHED', 'Finished'] }
        }).sort({ date: 1 });

        res.status(200).json(status);
    } catch (err) {
        res.status(400).json(err);
    }
});

// 11. API gửi Đánh giá & Phản hồi (Khớp 100% với MongoDB Compass của ông)
router.post('/submit-feedback', async (req, res) => {
    try {
        const { appointmentId, stars, title, review } = req.body;
        
        await Appointment.findByIdAndUpdate(
            appointmentId, 
            { 
                $set: {
                    "feedback.stars": Number(stars), // Lưu vào trường stars như trong ảnh
                    "feedback.title": title,         // Lưu vào trường title như trong ảnh
                    "feedback.review": review,       // Lưu vào trường review như trong ảnh
                    "feedback.given": true,
                    "feedback.updatedAt": new Date()
                }
            }
        );
        
        res.json({ success: true, message: "Cảm ơn ông, đánh giá đã được lưu!" });
    } catch (err) {
        console.error("Lỗi feedback:", err);
        res.status(500).json({ error: "Không lưu được đánh giá rồi bác ơi" });
    }
});

module.exports = router;