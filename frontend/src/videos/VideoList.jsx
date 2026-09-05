import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoList.css";
import api from "../services/api";
import { UPLOAD_URL } from "../utils/constants";

const VideoList = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    api.get('/assignments/my')
      .then((res) => {
        setVideos(res.data.assignments)
      }).catch((err) => {
        console.log(err)
      })
  })

  const handlePlay = (video) => {
    // window.location.href= `${UPLOAD_URL}/videos/${videoUrl}`;
    // return <Navigate to={`/video-player/${videoUrl}`} replace />;
    navigate(`/video-player/${video.videoUrl}/${video.thumbnail}`);
  }
  return (
    <div className="video-list-page">
      <div className="video-list-header">
        <div>
          <h1>Learning Videos</h1>
          <p>Continue learning and improve your skills.</p>
        </div>

        <select className="category-filter">
          <option>All Categories</option>
          <option>React</option>
          <option>Node.js</option>
          <option>JavaScript</option>
        </select>
      </div>

      <div className="video-grid">
        {videos.map(({video}) => (
          <div className="video-card" key={video.id} onClick={() => handlePlay(video)}>
            <div className="video-thumbnail">
              <img src={`${UPLOAD_URL}/thumbnails/${video.thumbnail}`} alt={video.title} />

              <span className="video-duration">
                {video.duration}
              </span>

              <button className="play-button">
                ▶
              </button>
            </div>

            <div className="video-content">
              <span className="video-category">
                {video.category}
              </span>

              <h3>{video.title}</h3>

              <p>{video.description}</p>

              <div className="progress-info">
                <span>{video.progress}% completed</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${video.progress}%` }}
                />
              </div>

              <button className="continue-button" onClick={() => handlePlay(video)}>
                {video.progress > 0 ? "Continue Learning" : "Start Learning"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;