import React, { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './headernav.css'
const DateTimeDisplay = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short', 
    day: '2-digit',   
    month: 'short',   
    year: 'numeric',  
  });

  return (
    <div
    
    style={{
      fontSize: "14px",
      position: "absolute",
      top: "100px",
      left: "0px",
      backgroundColor: "whitesmoke",
      color: "black",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 180px",
      marginTop:"-70px"
    }}
  >
    <p style={{ margin: "0", fontSize: "14px", paddingLeft: "100px" }}>
      {formattedDate}
    </p>
  
    <div style={{ display: "flex", gap: "0px",paddingRight:"150PX" }}>
      <FacebookIcon fontSize='small' />
      <InstagramIcon fontSize='small' />
      <YouTubeIcon fontSize='small'/>
    </div>
  </div>
  
  
  );
};

export default DateTimeDisplay;
