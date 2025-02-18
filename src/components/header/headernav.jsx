import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomeIcon from '@mui/icons-material/Home';
import DateTimeDisplay from './dateandtime';
import { NavDropdown } from 'react-bootstrap';
import logo from '../images/logo (1).png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import './headernav.css';

function Headernav() {
  const navigate = useNavigate();
  
  // Declare state to manage user login status
  // const [user, setUser] = useState(localStorage.getItem("user")); // Assuming user data is stored in localStorage

  // const handleLogout = () => {
  //   // Remove user data from localStorage
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("userId"); // If you stored userId separately

  //   // Update state to null or logged out state
  //   setUser(null);

  //   // Optionally navigate to login page or show an alert
  //   alert("You have logged out successfully!");
  //   navigate('/detailed-content'); // Redirect user to login page after logout
  // };

  return (
    <>
      <div className='header'>
        <div className='header-time'>
          <DateTimeDisplay />
        </div>
        <div>
          <Navbar style={{ marginTop: "60px", height: "100px", display: "grid", gridTemplateColumns: "auto auto", alignItems: "center", justifyContent: "center" }}>
            <Container className='header-logo' style={{ position: "absolute", top: "20px", left: "250px" }}>
              <img src={logo} height={50} width={150} />
            </Container>

            <div className='header-title' style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: "295px", paddingRight: "200px" }}>
              <h4>
                <span style={{ color: "black" }}>KERALA STATE</span>
                <span style={{ color: "#1E90FF", marginLeft: "8px" }}>TUG OF WAR ASSOCIATION</span>
                <p style={{ fontSize: "15px" }}>Reg. No:ER 621/99, Recognised by Kerala State Sports Council</p>
              </h4>
            </div>
          </Navbar>
        </div>
        <hr style={{ border: "1px solid #ccc", margin: "0" }} />
        <hr style={{ border: "1px solid #ccc", margin: "0" }} />
        <Navbar expand="lg" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", backgroundColor: "#fff", marginBottom: "0" }}>
          <Container style={{ display: "flex", alignItems: "center", paddingLeft: "5%", gap: "30px", justifyContent: "space-between", marginBottom: "0" }}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" style={{ display: "flex", gap: "20px" }}>
                <Nav.Link>
                  <HomeIcon />
                </Nav.Link>
                <Nav.Link href="#home" style={{ marginRight: "15px" }}>
                  ABOUT US
                </Nav.Link>
                <Nav.Link href="#link" style={{ marginRight: "15px" }}>
                  OVERVIEW
                </Nav.Link>

                <NavDropdown title="OFFICERS" id="basic-nav-dropdown" style={{ marginRight: "15px" }}>
                  <NavDropdown.Item href="#action/3.1">Thiruvananthapuram</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Kollam</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Pathanamthitta</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Kottayam</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Alappuzha</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Idukki</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Ernakulam</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Thrissur</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Palakkad</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Malappuram</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Kozhikode</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Wayanad</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Kannur</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Kasaragod</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="#link" style={{ marginRight: "15px" }}>
                  CIRCULARS
                </Nav.Link>
                <Nav.Link href="#link" style={{ marginRight: "15px" }}>
                  EVENTS
                </Nav.Link>
                <Nav.Link href="#link" style={{ marginRight: "15px" }}>
                  FACILITIES
                </Nav.Link>
                <Nav.Link href="#link" style={{ marginRight: "15px" }}>
                  GALLERY
                </Nav.Link>
                <Nav.Link href="#link" style={{ marginRight: "15px" }}>
                  CONTACT US
                </Nav.Link>
                <Nav.Link>
                  <AccountCircleIcon fontSize="medium" onClick={() => navigate('/adminlogin')} />
                </Nav.Link>
                {/* <Nav.Link>
                  {user ? (
                    <button onClick={handleLogout} style={{ padding: "10px", backgroundColor: "red", color: "white", borderRadius: "5px" }}>
                      Logout
                    </button>
                  ) : (
                    <p></p>
                  )}
                </Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <hr style={{ border: "1px solid #ccc", margin: "0" }} />
      </div>
    </>
  );
}

export default Headernav;
