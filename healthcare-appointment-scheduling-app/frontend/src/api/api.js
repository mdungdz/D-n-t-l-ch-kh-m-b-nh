import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Thay bằng URL Backend của bạn
});

// Ví dụ: Hàm lấy danh sách bác sĩ
export const fetchDoctors = () => API.get("/doctors");

// Ví dụ: Hàm đặt lịch hẹn
export const createAppointment = (data) => API.post("/appointments", data);
