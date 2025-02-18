import React, { useState, useEffect } from "react";
import { 
    FaHome, FaUsers, FaTrophy, FaCalendarAlt, FaClipboardList, 
    FaNewspaper, FaVideo, FaChartLine, FaMapMarked, FaPlusSquare, FaBars, FaTimes
} from "react-icons/fa";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Dashnav = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isOpen, setIsOpen] = useState(!isMobile); // Sidebar open by default on larger screens

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setIsOpen(true); // Auto open sidebar on large screens
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const sidebarStyle = {
        height: "100vh",
        width: isOpen ? (isMobile ? "200px" : "250px") : "0",
        backgroundColor: "whitesmoke",
        color: "black",
        display: "flex",
        flexDirection: "column",
        padding: isOpen ? "20px" : "0",
        overflowY: "auto",
        maxHeight: "100vh",
        transition: "width 0.3s ease, padding 0.3s ease",
        position: isMobile ? "fixed" : "relative",
        left: isOpen ? "0" : "-200px",
        boxShadow: isMobile && isOpen ? "2px 0 10px rgba(0,0,0,0.1)" : "none",
    };

    const navItemStyle = {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        cursor: "pointer",
        borderRadius: "5px",
        textDecoration: "none",
        color: "black",
        transition: "background 0.3s",
        whiteSpace: "nowrap"
    };

    return (
        <>
            {/* Toggle Button */}
            {isMobile && (
                <button 
                    onClick={toggleSidebar} 
                    style={{
                        position: "fixed",
                        top: "15px",
                        left: "15px",
                        background: "black",
                        color: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        border: "none",
                        zIndex: "1000"
                    }}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            )}

            {/* Sidebar */}
            <div style={sidebarStyle}>
                <h2 style={{ fontSize: isMobile ? "24px" : "30px", fontWeight: "bold", marginBottom: "40px", marginTop: "20px" }}> 
                    <AccountCircleIcon fontSize="large"/> Admin  
                </h2> 
                <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <a href="/dashboard" style={navItemStyle}><FaHome /> Dashboard</a>
                    <a href="/teams" style={navItemStyle}><FaUsers /> Teams</a>
                    <a href="/players" style={navItemStyle}><FaUsers /> Players</a>
                    <a href="/tournaments" style={navItemStyle}><FaTrophy /> Tournaments</a>
                    <a href="/schedule" style={navItemStyle}><FaCalendarAlt /> Match Schedule</a>
                    <a href="/results" style={navItemStyle}><FaClipboardList /> Results</a>

                    <h3 style={{ fontSize: "12px", fontWeight: "bold", color: "#bbb", marginTop: "15px" }}>Media</h3>
                    <a href="/news" style={navItemStyle}><FaNewspaper /> News</a>
                    <a href="/photos" style={navItemStyle}><FaVideo /> Photos</a>
                    <a href="/addvideos" style={navItemStyle}><FaVideo /> Videos</a>

                    <h3 style={{ fontSize: "12px", fontWeight: "bold", color: "#bbb", marginTop: "15px" }}>Content Management</h3>
                    <a href="/addcontent" style={navItemStyle}><FaPlusSquare /> Add Content</a>

                    <h3 style={{ fontSize: "12px", fontWeight: "bold", color: "#bbb", marginTop: "15px" }}>Analytics</h3>
                    <a href="/stats" style={navItemStyle}><FaChartLine /> Statistics</a>
                    <a href="/locations" style={navItemStyle}><FaMapMarked /> Venues</a>
                </nav>
            </div>
        </>
    );
};

export default Dashnav;
