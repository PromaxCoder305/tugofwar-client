import React from "react";
import { Dropdown } from "react-bootstrap";
import { Helmet } from "react-helmet";
import ShareIcon from '@mui/icons-material/Share';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

const ShareDropdown = ({ title, contentId, imageUrl }) => {
  console.log("Content ID:", contentId);
  console.log("Current Origin:", window.location.origin);

  // Generate shareable link dynamically
  const shareableLink = `${window.location.origin}/detailed-content/${contentId}`;
  console.log("Generated Shareable Link:", shareableLink);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      {/* Dynamic Meta Tags for Open Graph */}
      <Helmet>
        <meta property="og:title" content={title || "Default Title"} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={`${window.location.origin}/detailed-content/${contentId}`} />
        <meta property="og:type" content="article" />
      </Helmet>

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
          {/* Facebook Sharing */}
          <Dropdown.Item
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}&quote=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookOutlinedIcon fontSize="small" /> Facebook
          </Dropdown.Item>

          {/* WhatsApp Sharing */}
          <Dropdown.Item
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " - " + shareableLink)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon fontSize="small" /> WhatsApp
          </Dropdown.Item>

          {/* Copy Link */}
          <Dropdown.Item onClick={handleCopyLink}>
            <ContentCopyRoundedIcon fontSize="small" /> Copy Link
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ShareDropdown;
