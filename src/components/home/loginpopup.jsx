import React, { useState } from "react";
import axios from "axios"; // Make sure to import axios

const LoginPopup = ({ isOpen, onClose, onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!name || !email) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      // Send login data to the backend
      const response = await axios.post("https://tugofwar-server.onrender.com/api/login", { name, email });
      
      if (response.status === 200) {
        const user = response.data.user; // Get user data from the response
        onLoginSuccess(user);
          // Pass the user data to the parent
        onClose();  // Close the modal after successful login
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-popup-overlay" style={styles.overlay}>
      <div className="login-popup" style={styles.popup}>
        <h3>Login</h3>
        {error && <div className="error-message" style={styles.error}>{error}</div>}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  closeButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ccc",
    color: "black",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default LoginPopup;
