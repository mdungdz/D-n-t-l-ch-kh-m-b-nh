import React, { useState } from "react"; 
import Footer from "../Basic/Footer"; 
import Navbar from "../Basic/Navbar";
import About from "../Home/About";
import Jumbo from "../Home/Jumbo";
import Booking from "../Home/Booking"; 
import Features from "../Home/Features"; 
import Doctors from "../Home/Doctors"; 
import PatientStories from "../Home/PatientStories";
import LoginButton from "../Home/LoginButton";

const Home = () => {
  // Biến quản lý trạng thái đóng/mở chat dùng chung cho cả trang
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="homepage-wrapper">
      <Navbar />
      
      {/* 1. Jumbo nhận hàm mở chat khi bấm nút 24/7 */}
      <Jumbo onSupportClick={() => setIsChatOpen(true)} />
      
      <Booking />
      <Features />
      <About />
      <Doctors />
      <PatientStories />
      
      <LoginButton />
      
      {/* 2. CHỖ QUAN TRỌNG: Truyền state xuống Footer để Footer biết khi nào cần hiện khung chat */}
      <Footer isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />

      <style>{`
        .homepage-wrapper {
          overflow-x: hidden;
          background-color: #f4f7f9;
        }
        
        .homepage-wrapper > div, 
        .homepage-wrapper > section {
          width: 100%;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Home;