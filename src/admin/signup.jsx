import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const districts = [
    "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha",
    "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad",
    "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !email || !password || !district) {
      setError("All fields are required.");
      return;
    }

    localStorage.setItem("admin", JSON.stringify({  email, password, district }));
    
    setSuccess("Signup successful! Redirecting to login...");
    setError("");

    setTimeout(() => navigate("/adminlogin"), 2000);
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="text-center">Admin Signup</h2>
     
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>


        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select District</Form.Label>
          <Form.Select value={district} onChange={(e) => setDistrict(e.target.value)} required>
            <option value="">-- Select District --</option>
            {districts.map((dist, index) => (
              <option key={index} value={dist}>{dist}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Signup
        </Button>
      </Form>

      <p className="text-center mt-3">
        Already have an account? <a href="/login">Login</a>
      </p>
    </Container>
  );
}

export default Signup;
