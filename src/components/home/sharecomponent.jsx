import React from "react";
import { Dropdown } from "react-bootstrap";
import ShareIcon from '@mui/icons-material/Share';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

const ShareDropdown = ({ title, contentId }) => {
  console.log("Content ID:", contentId);
  console.log("Current Origin:", window.location.origin);

  // Ensure the link dynamically reflects the correct page
  const shareableLink = `${window.location.origin}/detailed-content/${contentId}`;
  console.log("Generated Shareable Link:", shareableLink);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("Link copied to clipboard!");
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        as="button"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center"
        }}
      >
        <ShareIcon fontSize="small" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
         <FacebookOutlinedIcon fontSize="small"/> Facebook
        </Dropdown.Item>
        <Dropdown.Item
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " - " + shareableLink)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
         <WhatsAppIcon fontSize="small"/> WhatsApp
        </Dropdown.Item>
        <Dropdown.Item onClick={handleCopyLink}>
          <ContentCopyRoundedIcon fontSize="small"/> Copy Link
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ShareDropdown;
