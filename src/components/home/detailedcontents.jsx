import React, { useEffect, useState } from "react";
import axios from "axios";
import Headernav from '../header/headernav';
import { Link } from "react-router-dom";
import './home.css'

function Home() {
  const [topThreeNews, setTopThreeNews] = useState([]);
  const [remainingNews, setRemainingNews] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([]);

  useEffect(() => {
    fetchNews();
    fetchYoutubeLinks();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:6001/content/latestcontent");
      if (response.data && response.data.length > 0) {
        setTopThreeNews(response.data.slice(0, 3));
        setRemainingNews(response.data.slice(3));
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const fetchYoutubeLinks = async () => {
    try {
      const response = await axios.get("http://localhost:6001/videos/all");
      if (response.data) {
        setYoutubeLinks(response.data);
      }
    } catch (error) {
      console.error("Error fetching YouTube links:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // ✅ Function to Extract YouTube Video ID
  const getYoutubeEmbedUrl = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <>
      <Headernav />
      <div className="container-fluid mt-4 homediv" >
        <div className="row gx-3">
          {/* ✅ First Column: Main News */}
          <div className="col-lg-6 col-md-12 pe-2 maincontent">
            {topThreeNews.length > 0 && (
              <>
                <div className="position-relative rounded overflow-hidden">
                  <img
                    src={`http://localhost:6001/uploads/${topThreeNews[0]?.image}`}
                    className="img-fluid rounded w-100"
                    alt="Main News"
                    style={{ height: "350px", objectFit: "cover" }}
                  />
                </div>
                <div className="mt-2">
                  <small className="text-muted">
                    {topThreeNews[0]?.district?.toUpperCase()} | {formatDate(topThreeNews[0]?.date)}
                  </small>
                  <h1 style={{fontSize:"28 px"}}><Link to={`/detailed-content/${topThreeNews[0]?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
    {topThreeNews[0]?.title}
  </Link></h1>
                  <p className="text-muted">{topThreeNews[0]?.subTitle}</p>
                </div>

                <div className="row mt-3 g-3">
                  {topThreeNews.slice(1).map((news, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="rounded overflow-hidden">
                        <img
                          src={`http://localhost:6001/uploads/${news?.image}`}
                          className="img-fluid rounded w-100"
                          alt={`News ${index + 1}`}
                          style={{ height: "180px", objectFit: "cover" }}
                        />
                      </div>
                      <small className="text-muted">
                        {news?.district?.toUpperCase()} | {formatDate(news?.date)}
                      </small>
                      <p style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      WebkitLineClamp: 3,  // Limit to 3 lines
                    }}>{news?.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ✅ Second Column: Latest News */}
          <div className="col-lg-3 col-md-6 px-2">
            <h5>LATEST NEWS</h5>
            {remainingNews.length > 0 ? (
              remainingNews.map((newsItem, index) => (
                <div className="d-flex mb-2 border-bottom pb-2 ms-2" key={index} style={{ maxWidth: '100%' }}>
                  <div className="me-3" style={{ width: '30%' }}>
                    <img
                      src={`http://localhost:6001/uploads/${newsItem.image}`}
                      className="img-fluid rounded"
                      alt={`News ${index + 1}`}
                      style={{ height: "47px",width:"80px", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ width: '70%' }}>
                    <p style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      WebkitLineClamp: 3,  // Limit to 3 lines
                    }}>
                     <Link key={index} to={`/detailed-content/${newsItem._id}`} style={{ textDecoration: "none", color: "inherit" }}>
    <p>{newsItem.description}</p>
  </Link>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No more news available.</p>
            )}
          </div>

          {/* ✅ Third Column: YouTube Section */}
          <div className="col-lg-2 col-md-6 px-3">
            <h4>Popular Videos</h4>
            {youtubeLinks.length > 0 ? (
              <>
                <div className="position-relative">
                  {getYoutubeEmbedUrl(youtubeLinks[0]?.youtubeLink) ? (
                    <iframe
                      width="100%"
                      height="150"
                      src={getYoutubeEmbedUrl(youtubeLinks[0].youtubeLink)}
                      title={youtubeLinks[0].title}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <p>No valid video available</p>
                  )}
                </div>

                {youtubeLinks.slice(1).map((video, index) => (
                  <div className="border-bottom pb-2 mb-2" key={video._id}>
                    <a>{video.title || "No Title Available"}</a>
                    <p className="text-muted">
                      <small>
                        <strong>{video.district ? video.district.toUpperCase() : "UNKNOWN DISTRICT"}</strong> |{" "}
                        {formatDate(video.date)}
                      </small>
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <p>No YouTube videos available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
