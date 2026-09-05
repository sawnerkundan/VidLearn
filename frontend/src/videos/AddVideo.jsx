import React, { useState } from "react";
import "./AddVideo.css";

const AddVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Video Data:", formData);

    // TODO: Send data to Node/Express API
  };

  return (
    <div className="add-video-page">
      <div className="add-video-card">
        <div className="add-video-header">
          <h1>Add Video</h1>
          <p>Add a new learning video to your course library.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Video Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter video title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter video description"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/thumbnail.jpg"
              required
            />
          </div>

          <div className="form-group">
            <label>Video URL</label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://example.com/video.mp4"
              required
            />
          </div>

          {formData.thumbnail && (
            <div className="thumbnail-preview">
              <label>Thumbnail Preview</label>
              <img
                src={formData.thumbnail}
                alt="Thumbnail preview"
              />
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-button">
              Cancel
            </button>

            <button type="submit" className="save-button">
              Add Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;