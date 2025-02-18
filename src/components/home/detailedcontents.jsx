import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Headernav from "../header/headernav";
import LoginPopup from "./loginpopup";  // Import the LoginPopup component
import ShareDropdown from "./sharecomponent";
function DetailedContent() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [user, setUser] = useState(null); // Manage the logged-in user
  const [isPopupOpen, setIsPopupOpen] = useState(false); // To handle the login popup state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Handle successful login
  const handleLoginSuccess = (user) => {
    setUser(user);
    localStorage.setItem("userId", user._id);  // Store userId separately
    localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
    setIsPopupOpen(false);  // Close login popup
  };

  // Handle submitting a comment
  const handleCommentSubmit = async () => {
    if (user) {
      if (user.confirmed) {  
        if (newComment.trim()) {
          const newCommentData = {
            user: user.name || "Anonymous",
            comment: newComment,
            contentId: id,  
          };

          try {
            // POST request to save the comment to the database
            const response = await axios.post("https://tugofwar-client-1.onrender.com/comments/add", newCommentData);
            console.log(response.data); 
            alert("Comment added successfully");

            // After successfully adding the comment, fetch the updated comments list
            fetchComments(); // Fetch the latest comments after submission
            setNewComment(""); // Clear the input field after submission
          } catch (error) {
            console.error("Error submitting comment:", error);
            alert("Error submitting comment.");
          }
        } else {
          alert("Please write a comment before submitting.");
        }
      } else {
        alert("Please confirm your email to comment.");
      }
    } else {
      setIsPopupOpen(true); // Open login popup if not logged in
    }
  };

  // Fetch content details
  const fetchContent = async () => {
    try {
      const response = await axios.get(`http://localhost:6001/content/getbyid/${id}`);
      setContent(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  // Fetch latest news
  const fetchLatestNews = async () => {
    try {
      const response = await axios.get("http://localhost:6001/content/latestcontent");
      setLatestNews(response.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching latest news:", error);
    }
  };

  // Fetch YouTube links
  const fetchYoutubeLinks = async () => {
    try {
      const response = await axios.get("http://localhost:6001/videos/all");
      setYoutubeLinks(response.data);
    } catch (error) {
      console.error("Error fetching YouTube links:", error);
    }
  };

  // Fetch comments based on the content ID
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:6001/comments/getcomments/${id}`);
      const sortedComments = response.data.sort((a, b) =>
        sortOrder === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
      );
      setComments(sortedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchContent();
    fetchLatestNews();
    fetchYoutubeLinks();
    fetchComments();  // Fetch comments for this content when the component loads

    // Check if user data exists in localStorage and set the user state
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  },  [id, sortOrder]);  // Re-run effect if content ID changes

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric"
    });
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <>
      <Headernav />
      <div className="container-fluid mt-4 homediv" style={{ paddingLeft: "250px", paddingRight: "8%" }}>
        <div className="row gx-3">
          {/* Main News Content */}
          <div className="col-lg-6 col-md-12 pe-2 maincontent">
            {content ? (
              <>
                <div className="position-relative rounded overflow-hidden">
                  <h3 className="mt-2 h3-link">{content.title}</h3> <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}>
                  <ShareDropdown title={content.title} contentId={id} />
    </div>

                  <p className="text-muted">{content.subTitle}</p>
                  <img
                    src={`http://localhost:6001/uploads/${content.image}`}
                    className="img-fluid rounded w-100"
                    alt={content.title}
                    style={{ height: "350px", objectFit: "cover" }}
                  />
                </div>
                <div className="mt-2">
                  <small className="text-muted">
                    {content.district?.toUpperCase()} | {formatDate(content.date)}
                  </small>

                  <p>{content.description}</p>
                </div>
              </>
            ) : (
              <p>Loading content...</p>
            )}
          </div>

          {/* Latest News Section */}
          <div className="col-lg-3 col-md-6 px-2">
            <h5>LATEST NEWS</h5>
            {latestNews.length > 0 ? (
              latestNews.map((newsItem, index) => (
                <div className="d-flex mb-2 border-bottom pb-2 ms-2" key={index}>
                  <div className="me-3" style={{ width: "30%" }}>
                    <img
                      src={`http://localhost:6001/uploads/${newsItem.image}`}
                      className="img-fluid rounded"
                      alt="News"
                      style={{ height: "80px", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ width: "70%" }}>
                    <p>{newsItem.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No more news available.</p>
            )}
          </div>

          {/* YouTube Section */}
          <div className="col-lg-3 col-md-6 px-3">
            <h5>Popular Videos</h5>
            {youtubeLinks.length > 0 ? (
              <>
                <div className="position-relative mb-3">
                  {getYoutubeEmbedUrl(youtubeLinks[0]?.youtubeLink) ? (
                    <>
                      <iframe
                        width="100%"
                        height="150"
                        src={getYoutubeEmbedUrl(youtubeLinks[0].youtubeLink)}
                        title={youtubeLinks[0].title}
                        frameBorder="1"
                        allowFullScreen
                      ></iframe>
                      <div>
                        <a href={getYoutubeEmbedUrl(youtubeLinks[0].youtubeLink)} target="_blank" rel="noopener noreferrer">
                          <p className="m-0" style={{ fontSize: "14px", fontWeight: "500" }}>
                            {youtubeLinks[0].title || "No Title"}
                          </p>
                        </a>
                        <p className="text-muted">
                          <small>
                            <strong>{youtubeLinks[0].district ? youtubeLinks[0].district.toUpperCase() : "UNKNOWN DISTRICT"}</strong> |{" "}
                            {formatDate(youtubeLinks[0].date)}
                          </small>
                        </p>
                      </div>
                    </>
                  ) : (
                    <p>No valid video available</p>
                  )}
                </div>
              </>
            ) : (
              <p>No YouTube videos available.</p>
            )}
          </div>
        </div>

        {/* Comment Box */}
        <div className="col-12 mt-4">
          {user && !user.confirmed ? (
            <p className="text-warning" style={{ fontWeight: "bold" }}>Please confirm your email to comment.</p>
          ) : (
            <div>
              <div className="mb-3">
              <label className="me-2"><strong>Sort by:</strong></label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "16px",
                  resize: "none",
                  width: "100%",
                  maxWidth: "700px", // Optional: Adjust width
                  marginBottom: "10px",
                }}
                rows="4"
              />
              <div style={{ width: "100%", maxWidth: "700px" }}>
        <button
          onClick={handleCommentSubmit}
          style={{
            width: "max-content",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "grey",
            color: "white",
            border: "none",
            marginLeft:"80%"
          }}
        >
          {user ? "Submit Comment" : "Login to Comment"}
        </button>
      </div>
            </div>
          )}
        </div>

        {/* Display Comments */}
        <div className="col-12 mt-4">
          <h5>Comments</h5>
          
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="border-bottom pb-3 mb-3" style={{width:"max-content"}}>
                <strong>{comment.user}</strong> <small className="text-muted">{formatDate(comment.date)}</small>
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>

        {/* Login Popup */}
        <LoginPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onLoginSuccess={handleLoginSuccess} />
      </div>
    </>
  );
}

export default DetailedContent;
