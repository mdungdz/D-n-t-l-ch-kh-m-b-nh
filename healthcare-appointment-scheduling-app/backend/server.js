const express = require("express");
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const patientsRouter = require("./routes/patients");
const doctorsRotuer = require("./routes/doctors");
const appointmentRouter = require("./routes/appointments"); // Router xịn ở đây
require("dotenv").config();

app.use(cors());
app.use(express.json());

// --- 1. PHẦN TÍCH HỢP AI (GIỮ NGUYÊN) ---
app.post("/api/ai/consult", async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Bạn là Bác sĩ Trực ban tại Hệ thống Y tế NMD. Bệnh nhân báo triệu chứng: "${symptoms}". Hãy đưa ra đánh giá sơ bộ, cảnh báo nếu cần, hướng dẫn chăm sóc và chỉ định chuyên khoa. YÊU CẦU: Không dùng dấu sao (*), không gạch đầu dòng, viết thành 1 đoạn văn duy nhất khoảng 100 chữ.` }] }],
      }),
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0].content) {
      let advice = data.candidates[0].content.parts[0].text;
      advice = advice.replace(/\*/g, "").replace(/#/g, "").trim();
      return res.json({ advice });
    }
    res.json({ advice: "Bác sĩ chưa nghe rõ, m nói lại xem nào!" });
  } catch (error) {
    res.json({ advice: "Hệ thống đang bảo trì, thử lại sau ít phút!" });
  }
});

// --- 2. ROUTES HỆ THỐNG ---
app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRotuer);

// KẾT NỐI ROUTER APPOINTMENT: Toàn bộ Logic Thêm/Xóa/Lọc sẽ chạy vào file /routes/appointments.js
app.use("/appointments", appointmentRouter); 

// --- 3. DATABASE & SERVER ---
const port = process.env.PORT || 5000;
// Lấy URI từ file .env bạn vừa cấu hình
const uri = process.env.NODE_ENV === "test" ? process.env.ATLAS_URI_TEST : process.env.ATLAS_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("--- KẾT NỐI DATABASE THÀNH CÔNG ---"))
  .catch((err) => console.log("Lỗi kết nối DB: ", err));

app.get("/", (req, res) => res.status(200).json("Hệ thống y tế NMD đã sẵn sàng!"));

app.listen(port, () => {
  console.log(`Server NMD Health đang chạy ở port ${port}`);
});