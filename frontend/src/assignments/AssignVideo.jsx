import { useEffect, useState } from "react";
import api from "../services/api";

const AssignVideo = () => {
  const [learners, setLearners] = useState([]);
  const [videos, setVideos] = useState([]);

  const [learnerId, setLearnerId] =
    useState("");

  const [videoId, setVideoId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        learnersResponse,
        videosResponse,
      ] = await Promise.all([
        api.get("/assignments/learners"),
        api.get("/assignments/videos"),
      ]);

      setLearners(
        learnersResponse.data.learners
      );

      setVideos(
        videosResponse.data.videos
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load data"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!learnerId || !videoId) {
      setError(
        "Please select learner and video"
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await api.post("/assignments", {
        learnerId,
        videoId,
      });

      setMessage(
        "Video assigned successfully"
      );

      setLearnerId("");
      setVideoId("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to assign video"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assign-video">

      <h2>Assign Video</h2>

      {message && (
        <div className="success">
          {message}
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Learner</label>

          <select
            value={learnerId}
            onChange={(e) =>
              setLearnerId(e.target.value)
            }
          >
            <option value="">
              Select learner
            </option>

            {learners.map((learner) => (
              <option
                key={learner._id}
                value={learner._id}
              >
                {learner.name} -{" "}
                {learner.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Video</label>

          <select
            value={videoId}
            onChange={(e) =>
              setVideoId(e.target.value)
            }
          >
            <option value="">
              Select video
            </option>

            {videos.map((video) => (
              <option
                key={video._id}
                value={video._id}
              >
                {video.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Assigning..."
            : "Assign Video"}
        </button>

      </form>
    </div>
  );
};

export default AssignVideo;