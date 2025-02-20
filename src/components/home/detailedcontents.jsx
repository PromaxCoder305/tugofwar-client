import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Headernav from "../header/headernav";
import LoginPopup from "./loginpopup";  // Import the LoginPopup component
import ShareDropdown from "./sharecomponent";
import './home.css'
function DetailedContent() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [user, setUser] = useState(null); // Manage the logged-in user
  const [isPopupOpen, setIsPopupOpen] = useState(false); // To handle the login popup state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [expandedComments, setExpandedComments] = useState({});



  const [sortOrder, setSortOrder] = useState("newest"); // Default sorting: Newest First
const [visibleCommentsCount, setVisibleCommentsCount] = useState(3)

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
            const response = await axios.post("http://localhost:6001/comments/add", newCommentData);
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
      const response = await axios.get(`http://localhost:6001/comments/getcomments/${id}`);  // Fetch comments for this content
      console.log("Fetched comments:", response.data);  // Log to check if comments are fetched
      setComments(response.data);  // Update state with the latest comments
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
  }, [id]);  // Re-run effect if content ID changes

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



  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };
  
  // Function to load more comments
  const loadMoreComments = () => {
    setVisibleCommentsCount((prevCount) => prevCount + 5); // Increase count by 5
  };
  const loadlessComments = ()=>{
    setVisibleCommentsCount((prevCount)=> prevCount - 5)
  }
  // Sort comments based on selected option
  const sortedComments = [...comments].sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date) // Newest first
      : new Date(a.date) - new Date(b.date); // Oldest first
  });
  
  // Slice the comments to show only the limited number
  const visibleComments = sortedComments.slice(0, visibleCommentsCount);
  const toggleReadMore = (index) => {
    setExpandedComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <>
      <Headernav />
      <div className="container-fluid mt-4 homediv">
        <div className="row gx-3">
          {/* Main News Content */}
          <div className="col-lg-6 col-md-12 pe-2 maincontent">
            {content ? (
              <>
                <div className="position-relative rounded overflow-hidden">
                  <h3 className="mt-2 h3-link">{content.title}</h3> 
                  <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}>
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
            <p className="text-warning" style={{ fontWeight: "bold" }}>
              Please confirm your email to comment.
            </p>
          ) : (
            <div className="commentarea">
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
                  width: "50%",
                  maxWidth: "700px",
                  marginBottom: "10px",
                }}
                rows="4"
              />
              <div className="commentbutton" style={{ width: "100%", maxWidth: "700px" }}>
                <button
                  onClick={handleCommentSubmit}
                  style={{
                    width: "max-content",
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#A9A9A9",
                    color: "white",
                    border: "none",
                    marginLeft: "78%",
                  }}
                  disabled={user && !user.confirmed} // Disable submit button if not confirmed
                >
                  {user ? "Submit Comment" : "Login to Comment"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Display Comments */}
        <div className="col-12  commentdiv">
    <h5>Comments</h5>

    {/* Dropdown for Sorting */}
    <select onChange={handleSortChange} value={sortOrder} className="form-select mb-3" style={{ maxWidth: "200px" }}>
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
    </select>

    {visibleComments.length > 0 ? (
      visibleComments.map((comment, index) => {
        const isExpanded = expandedComments[index]; // Check if comment is expanded
        const commentPreview = isExpanded ? comment.comment : comment.comment.slice(0, 100); // Limit to 100 characters

        return (
          <div key={index} className="border-bottom pb-3 mb-3" style={{ width: "max-content" }}>
            <strong>{comment.user}</strong> <small className="text-muted">{formatDate(comment.date)}</small>
            <p>
              {commentPreview}
              {comment.comment.length > 100 && (
                <span 
                  className="text-primary ms-2" 
                  style={{ cursor: "pointer" }} 
                  onClick={() => toggleReadMore(index)}
                >
                  {isExpanded ? "See Less" : "Read More"}
                </span>
              )}
            </p>
          </div>
        );
      })
    ) : (
      <p>No comments yet. Be the first to comment!</p>
    )}

    {/* Load More Button */}
    {visibleComments.length < sortedComments.length ? (
      <p className="commentpara"
        onClick={loadMoreComments}
        // className="btn btn-secondary mt-3"
      >
        <u>Read More </u>
      </p>
    ):(
      <p className="commentpara"
      onClick={loadlessComments}
      // className="btn btn-secondary mt-3"
    >
      <u>Read Less </u>
    </p>
    )}
    </div>
        {/* Login Popup */}
        <LoginPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onLoginSuccess={handleLoginSuccess} />
      </div>
    </>
  );
}

export default DetailedContent;
