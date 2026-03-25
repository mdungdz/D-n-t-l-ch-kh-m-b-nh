const router = require('express').Router();
const Appointment = require("../models/appointment.model");

// 1. Thống kê Dashboard
router.get("/stats", async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const revenueData = await Appointment.aggregate([
      { $match: { status: { $in: ["FINISHED", "Finished", "Completed", "COMPLETED"] } } },
      { $group: { _id: null, totalRevenue: { $sum: "$fee" } } }
    ]);
    res.json({ totalAppointments, totalRevenue: revenueData[0]?.totalRevenue || 0 });
  } catch (err) { res.status(500).json({ message: "Lỗi lấy thống kê" }); }
});

// 2. LẤY DANH SÁCH LỊCH HẸN (ĐÃ MỞ KHÓA ĐỂ HIỆN LỊCH SỬ)
router.get("/", async (req, res) => {
  try {
    const { doctorName, date, patientId, bookedBy, isAdmin } = req.query;
    let filter = {};

    if (isAdmin === 'true') {
      filter.status = { $in: ["Confirmed", "Pending", "CONFIRMED", "PENDING"] };
    } else if (bookedBy) {
      // GIỮ NGUYÊN: Lọc theo email người đặt nhưng KHÔNG chặn status Finished
      filter.bookedBy = { $regex: `^${bookedBy.trim()}$`, $options: "i" };
    } else if (patientId && patientId !== "GUEST_ID") {
      filter.patientId = patientId;
    } else if (doctorName && date) {
      filter.date = date;
      filter.doctorName = { $regex: `^${doctorName.trim()}$`, $options: "i" };
      filter.status = { $ne: "cancelled" }; 
    }

    const appointments = await Appointment.find(filter).sort({ date: -1, slotTime: -1 });
    res.json(appointments);
  } catch (err) { res.status(400).json({ message: "Lỗi lấy dữ liệu" }); }
});

// 3. Cập nhật trạng thái & Feedback (Giữ nguyên logic PUT của ông)
router.put('/:id', async (req, res) => {
  try {
    const { feedback, status, paymentStatus, paymentMethod } = req.body;
    let updateObject = {};
    if (feedback) {
      updateObject["feedback.stars"] = Number(feedback.stars);
      updateObject["feedback.review"] = feedback.review;
      updateObject["feedback.given"] = true;
      updateObject["feedback.updatedAt"] = new Date();
    }
    if (status) updateObject.status = status; 
    if (paymentStatus) updateObject.paymentStatus = paymentStatus;
    if (paymentMethod) updateObject.paymentMethod = paymentMethod;

    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { $set: updateObject }, { new: true });
    res.status(200).json(appointment);
  } catch (err) { res.status(400).json({ message: "Lỗi cập nhật" }); }
});

// 4. Đặt lịch mới (Giữ nguyên của ông)
router.post("/add", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) { res.status(400).json(err); }
});

// 5. Bác sĩ lưu phiếu khám (Giữ nguyên medicalDetails của ông)
router.post("/save-medical-record", async (req, res) => {
  try {
    const { appointmentId, ...medicalData } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { medicalDetails: medicalData, status: "FINISHED", finishDate: new Date().toISOString().split('T')[0] } },
      { new: true }
    );
    res.json({ success: true, data: appointment });
  } catch (err) { res.status(500).json({ success: false }); }
});

// 6. Xóa lịch hẹn (Giữ nguyên logic chặn xóa khi đã thanh toán của ông)
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment.status === "FINISHED" || appointment.status === "Finished") {
       return res.status(400).json({ message: "Đã khám xong không thể xóa!" });
    }
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Xóa thành công" });
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;