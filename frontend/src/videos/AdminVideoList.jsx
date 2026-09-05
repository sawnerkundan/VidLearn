import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminVideoList.css";
import api from "../services/api";
import { UPLOAD_URL } from "../utils/constants";

const AdminVideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      api.get("/videos")
        .then((response) => {
          setVideos(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching videos:", error);
        });
    };

    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmed) return;

    api.delete(`/videos/${id}`)
      .then((response) => {
        setVideos((prev) => prev.filter((video) => video.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });

    
  };

  return (
    <div className="admin-video-page">
      {/* Header */}
      <div className="admin-video-header">
        <div>
          <h1>Videos</h1>
          <p>Manage your learning videos.</p>
        </div>

        <Link to="/videos/add" className="add-video-btn">
          + Add Video
        </Link>
      </div>

      {/* Video Table */}
      <div className="video-table-card">
        <div className="video-table-wrapper">
          <table className="video-table">
            <thead>
              <tr>
                <th>Video</th>
                <th>Description</th>
                <th>Video URL</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <tr key={video._id}>
                    {/* Video */}
                    <td>
                      <div className="video-info">
                        <img
                          src={`${UPLOAD_URL}/thumbnails/${video.thumbnail}`}
                          alt={video.title}
                          className="video-thumb"
                        />

                        <div>
                          <h3>{video.title}</h3>
                          <span>ID: {video._id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Description */}
                    <td>
                      <p className="video-description">
                        {video.description}
                      </p>
                    </td>

                    {/* URL */}
                    <td>
                      <a
                        href={`${UPLOAD_URL}/videos/${video.videoUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="video-url"
                      >
                        View Video
                      </a>
                    </td>

                    {/* Created */}
                    <td>
                      <span className="created-date">
                        {video.createdAt}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="video-actions">
                        <Link
                          to={`/videos/edit/${video._id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(video._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No videos found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVideoList;