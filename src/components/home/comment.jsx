import React, { useState } from "react";

const CommentBox = () => {
  // State for the comment input
  const [comment, setComment] = useState("");
  // State for the sort option
  const [sortBy, setSortBy] = useState("newest");
  // State for the list of comments
  const [comments, setComments] = useState([]);
  // State for tracking login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State for user info (name and email)
  const [user, setUser] = useState({ name: "", email: "" });
  // State for controlling the login popup visibility
  const [showLogin, setShowLogin] = useState(false);

  // Handle comment input change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Handle comment submission
  const handleSubmit = () => {
    if (comment.trim() === "") return; // Prevent empty comments
    const newComment = {
      id: Date.now(), // Unique ID for each comment
      text: comment,
      timestamp: new Date().toISOString(), // Add timestamp for sorting
      username: user.name, // Use the logged-in user's name
    };
    setComments([...comments, newComment]); // Add new comment to the list
    setComment(""); // Clear the input field
  };

  // Sort comments based on the selected option
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.timestamp) - new Date(a.timestamp); // Newest first
    } else {
      return new Date(a.timestamp) - new Date(b.timestamp); // Oldest first
    }
  });

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (user.name && user.email) {
      setIsLoggedIn(true);
      setShowLogin(false); // Close login popup after successful login
    }
  };

  return (
    <div style={styles.commentBox}>
      {/* Login Popup */}
      {showLogin && !isLoggedIn && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Login</h3>
            <form onSubmit={handleLoginSubmit}>
              <div style={styles.inputGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <button type="submit" style={styles.button}>
                Login
              </button>
            </form>
            <button onClick={() => setShowLogin(false)} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Comment Section */}
      {isLoggedIn ? (
        <div style={styles.addComment}>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            style={styles.textarea}
          />
          <button onClick={handleSubmit} style={styles.button}>
            Comment
          </button>
        </div>
      ) : (
        <div style={styles.loginPrompt}>
          <p>Please log in to comment.</p>
          <button onClick={() => setShowLogin(true)} style={styles.button}>
            Login
          </button>
        </div>
      )}

      {/* Sort By Section */}
      <div style={styles.sortBy}>
        <label htmlFor="sort" style={styles.label}>
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          style={styles.select}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Comments Section */}
      <div style={styles.comments}>
        <p>{sortedComments.length} comments</p>
        {sortedComments.map((comment) => (
          <div key={comment.id} style={styles.comment}>
            <p><strong>{comment.username}</strong>: {comment.text}</p>
            <small>
              {new Date(comment.timestamp).toLocaleString()} {/* Display timestamp */}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  commentBox: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  addComment: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    resize: "vertical",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
  },
  sortBy: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  label: {
    marginRight: "10px",
    fontSize: "14px",
    color: "#555",
  },
  select: {
    padding: "5px 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  comments: {
    fontSize: "14px",
    color: "#555",
  },
  comment: {
    marginBottom: "10px",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  loginPrompt: {
    marginBottom: "20px",
  },
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
  },
  inputGroup: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  closeButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px",
    marginTop: "10px",
    cursor: "pointer",
  },
};

export default CommentBox;
