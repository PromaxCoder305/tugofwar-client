import React, { useState } from "react";
import DashNav from "../admin/dashnav";
import axios from "axios";

const UploadVideo = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDate, setVideoDate] = useState("");
  const [district, setDistrict] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  // List of districts
  const districtOptions = [
    "Select District",
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
  ];

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoTitle || !videoDate || !district || !youtubeLink) {
      alert("Please fill all fields and provide a YouTube link.");
      return;
    }

    const formData = {
      title: videoTitle,
      date: videoDate,
      district: district,
      youtubeLink: youtubeLink,
    };

    try {
      const response = await axios.post("http://localhost:6001/videos/add", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        alert("Video added successfully!");
        setVideoTitle("");
        setVideoDate("");
        setDistrict("");
        setYoutubeLink("");
      } else {
        alert("Failed to add video!");
      }
    } catch (error) {
      console.error("Error adding video:", error);
      alert("An error occurred while adding.");
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <DashNav />
        <div style={{ maxWidth: "600px",maxHeight:"max-content", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add YouTube Video</h2>
          <form onSubmit={handleUpload} style={{ display: "grid", gap: "15px" }}>

            <label style={{ fontWeight: "bold" }}>Title:</label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Enter video title"
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
              required
            />

            <label style={{ fontWeight: "bold" }}>Date:</label>
            <input
              type="date"
              value={videoDate}
              onChange={(e) => setVideoDate(e.target.value)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
              required
            />

            <label style={{ fontWeight: "bold" }}>District:</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
              required
            >
              {districtOptions.map((dist, index) => (
                <option key={index} value={dist === "Select District" ? "" : dist} disabled={dist === "Select District"}>
                  {dist}
                </option>
              ))}
            </select>

            <label style={{ fontWeight: "bold" }}>YouTube Link:</label>
            <input
              type="url"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="Enter YouTube video link"
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
              required
            />

            <button type="submit" style={{ padding: "10px", background: "#1E90FF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              Add Video
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadVideo;
