const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  given: { type: Boolean, default: false },
  stars: { type: Number, default: 0, min: 0, max: 5 },
  title: { type: String, default: "" },
  review: { type: String, default: "" }
});

const appointmentSchema = new Schema({
  bookedBy: { type: String, required: true, default: "GUEST" }, 
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  date: { type: String, required: true },
  slotTime: { type: String, required: true },
  
  fee: { type: Number, default: 0 }, 
  description: { type: String, default: "" }, 

  patientId: { type: String, default: "" }, 
  doctorId: { type: String, default: "" },

  status: { type: String, default: "pending" },
  paymentStatus: { type: String, default: "CHƯA THANH TOÁN" },
  paymentMethod: { type: String, default: "" }, 
  finishDate: { type: String, default: "" },    
  
  selectedServices: { type: Array, default: [] }, 
  
  // PHIẾU KHÁM: Thêm trường 'tests' vào đây
  medicalDetails: {
    serviceName: { type: String, default: "" },
    gender: { type: String, default: "" },
    dob: { type: String, default: "" },
    hometown: { type: String, default: "" },
    symptoms: { type: String, default: "" },
    history: { type: String, default: "" },
    tests: { type: String, default: "" }, // <--- BẮT BUỘC PHẢI THÊM DÒNG NÀY ĐỂ LƯU XÉT NGHIỆM
    diagnosis: { type: String, default: "" },
    prescription: { type: String, default: "" },
    advice: { type: String, default: "" },
  },
  
  googleMeetLink: { type: String, default: "" },
  feedback: {
    type: feedbackSchema,
    default: () => ({})
  }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema, "appointments");

module.exports = Appointment;