import React, { useEffect, useState } from "react";
import "./VideoList.css";
import api from "../services/api";
import { UPLOAD_URL } from "../utils/constants";

// const videos = [
//   {
//     id: 1,
//     title: "Introduction to React",
//     description: "Learn the basics of React and component-based development.",
//     duration: "12:45",
//     category: "React",
//     progress: 80,
//     thumbnail: "https://img.youtube.com/vi/SqcY0GlETPk/mqdefault.jpg",
//   },
//   {
//     id: 2,
//     title: "React Components",
//     description: "Understand functional components, props and JSX.",
//     duration: "18:20",
//     category: "React",
//     progress: 55,
//     thumbnail: "https://img.youtube.com/vi/SqcY0GlETPk/mqdefault.jpg",
//   },
//   {
//     id: 3,
//     title: "React Hooks",
//     description: "Learn useState, useEffect and other important hooks.",
//     duration: "24:10",
//     category: "React",
//     progress: 30,
//     thumbnail: "https://img.youtube.com/vi/SqcY0GlETPk/mqdefault.jpg",
//   },
//   {
//     id: 4,
//     title: "Node.js Introduction",
//     description: "Build backend applications using Node.js.",
//     duration: "20:15",
//     category: "Node.js",
//     progress: 0,
//     thumbnail: "https://img.youtube.com/vi/TlB_eWDSMt4/mqdefault.jpg",
//   },
// ];

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  // get my assigned videos
  useEffect(() => {
    api.get('/assignments/my')
      .then((res) => {
        setVideos(res.data.assignments)
      }).catch((err) => {
        console.log(err)
      })
  })

  const handlePlay = (videoUrl) => {
    window.location.href= `${UPLOAD_URL}/videos/${videoUrl}`;
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
          <div className="video-card" key={video.id} onClick={() => handlePlay(video.videoUrl)}>
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

              <button className="continue-button" onClick={() => handlePlay(video.videoUrl)}>
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