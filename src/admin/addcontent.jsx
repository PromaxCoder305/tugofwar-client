import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./dashboard";

function Addcontent() {
  const [formData, setFormData] = useState({
    title: "",
    subTitle:"",
    description: "",
    district: "",
    date: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image && !formData.youtubeLink) {
      alert("Please provide either an image or a YouTube link.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subTitle", formData.subTitle);
    data.append("description", formData.description);
    data.append("district", formData.district);
    data.append("date", formData.date);
    if (formData.image) data.append("image", formData.image);

    try {
      await axios.post("https://tugofwar-server.onrender.com/content/addcontent", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Content added successfully!");
      setFormData({ title: "", subTitle: "", description: "", district: "", date: "", image: null, youtubeLink: "" });
      setPreviewImage(null);
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content");
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <Dashboard />
      <div style={{
        width: "90%",
        maxWidth: "700px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        minWidth: "300px"
      }}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Add Content</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }} />
          <label style={{ fontWeight: "bold" }}>Sub-Title</label>
          <input type="text" name="subTitle" value={formData.subTitle} onChange={handleChange} required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }} />

          <label style={{ fontWeight: "bold" }}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "150px", width: "100%" }} />

          <label style={{ fontWeight: "bold" }}>Select District</label>
          <select name="district" value={formData.district} onChange={handleChange} required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#fff", width: "100%" }}>
            <option value="">Select District</option>
            {["Thiruvanthapuram", "Kollam", "Pathanamthitta", "Kottayam", "Alappuzha", "Idukki", "Eranamkulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"]
              .map((district) => (
                <option key={district} value={district.toLowerCase()}>{district}</option>
              ))}
          </select>

          <label style={{ fontWeight: "bold" }}>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }} />

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: "bold" }}>Upload Image</label>
              <input type="file" name="image" onChange={handleFileChange} accept="image/*"
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#fff", width: "100%" }} />
            </div>
            <div style={{
              width: "80px",
              height: "80px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0"
            }}>
              {previewImage ? (
                <img src={previewImage} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ color: "#888", fontSize: "12px", textAlign: "center" }}>No Image</span>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{
            padding: "12px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "10px",
            width: "100%"
          }}>
            Add Content
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addcontent;
