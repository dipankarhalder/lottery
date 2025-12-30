import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { baseUrl, uploadImg } from "../services/path";
import "swiper/css";
import "swiper/css/pagination";
import img1 from "/1.webp";
import img2 from "/2.webp";
import img3 from "/8.webp";
import img4 from "/10.webp";

const date = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };
const formattedDate = date.toLocaleString("en-US", options);

export const HomePage = () => {
  const [images, setImages] = useState({
    sec_1: null,
    sec_2: null,
    sec_3: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("sec_1");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${baseUrl}${uploadImg}`);
        setImages(res.data.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>{error}</p>;

  const tabLabels = {
    sec_1: "1:00 PM",
    sec_2: "6:00 PM",
    sec_3: "8:00 PM",
  };

  const sections = ["sec_1", "sec_2", "sec_3"];

  return (
    <div className="app_main_wrapper">
      <div className="app_slider">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <img src={img1} alt="img1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img2} alt="img1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} alt="img1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img4} alt="img1" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="app_container">
        <div className="app_cont_inside">
          <h2>Sikkim Lottery - {formattedDate}</h2>
          <p>
            Lottery Result -{" "}
            {activeTab === "sec_1"
              ? "1 PM"
              : activeTab === "sec_2"
              ? "6 PM"
              : "8 PM"}
          </p>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveTab(sec)}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  backgroundColor: activeTab === sec ? "#007bff" : "#f0f0f0",
                  color: activeTab === sec ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                {tabLabels[sec]}
              </button>
            ))}
          </div>
          {images[activeTab] ? (
            <div className="image_container">
              <img
                src={`http://localhost:3000${images[activeTab].imageUrl}`}
                alt={images[activeTab].title}
              />
            </div>
          ) : (
            <p>No image uploaded for this section.</p>
          )}
        </div>
      </div>
    </div>
  );
};
