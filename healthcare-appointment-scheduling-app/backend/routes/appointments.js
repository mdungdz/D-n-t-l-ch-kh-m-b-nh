const router = require('express').Router();
const Appointment = require("../models/appointment.model");

// Endpoint: Thống kê Dashboard
router.get("/stats", async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const revenueData = await Appointment.aggregate([
      { 
        $match: { 
          status: { $in: ["FINISHED", "Finished", "finished"] } 
        } 
      },
      { $group: { _id: null, totalRevenue: { $sum: "$fee" } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
    res.json({ totalAppointments, totalRevenue });
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy thống kê" });
  }
});

// Lấy danh sách lịch hẹn
router.get("/", async (req, res) => {
  try {
    const { doctorName, date, patientId, bookedBy, isAdmin } = req.query;
    let filter = {};

    if (isAdmin === 'true') {
      // Admin xem các ca đang hoạt động
      filter.status = { $in: ["Confirmed", "Pending", "CONFIRMED", "PENDING"] };
      filter.finishDate = ""; 
    } else if (bookedBy) {
      filter.bookedBy = { $regex: `^${bookedBy.trim()}$`, $options: "i" };
    } else if (patientId && patientId !== "GUEST_ID") {
      filter.patientId = patientId;
    } else if (doctorName && date) {
      filter.date = date;
      filter.doctorName = { $regex: `^${doctorName.trim()}$`, $options: "i" };
      filter.status = { $ne: "cancelled" }; 
    }

    const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(400).json({ message: "Lỗi lấy dữ liệu" });
  }
});

// Cập nhật trạng thái
router.put('/:id', async (req, res) => {
  try {
    const { feedback, status, paymentStatus } = req.body;
    let updateObject = {};

    if (feedback) {
      updateObject["feedback.stars"] = Number(feedback.stars);
      updateObject["feedback.review"] = feedback.review;
      updateObject["feedback.given"] = true;
      updateObject["feedback.updatedAt"] = new Date();
    }

    // Tự động VIẾT HOA status để khớp với logic Stats
    if (status) updateObject.status = status.toUpperCase(); 
    if (paymentStatus) updateObject.paymentStatus = paymentStatus;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      { $set: updateObject }, 
      { new: true }
    );

    if (!appointment) return res.status(404).json("Không tìm thấy lịch");
    res.status(200).json({ message: "Cập nhật thành công!", appointment });
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi cập nhật" });
  }
});

// --- ĐOẠN NÀY LÀ ĐỂ HỨNG CÁI NÚT "XÁC NHẬN ĐẶT LỊCH" TỪ FRONTEND ---
router.post("/add", async (req, res) => {
  try {
    // Tạo một bản ghi lịch hẹn mới từ dữ liệu Frontend gửi sang (req.body)
    const newAppointment = new Appointment(req.body);
    
    // Lưu vào database MongoDB
    await newAppointment.save();
    
    // Trả về thành công để Frontend hiện thông báo chúc mừng
    res.status(201).json({ message: "Đặt lịch thành công rồi bác ơi!" });
  } catch (err) {
    console.error("Lỗi lưu lịch hẹn:", err);
    res.status(400).json({ message: "Lỗi không lưu được: " + err.message });
  }
});
module.exports = router;