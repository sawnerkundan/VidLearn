import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VideoPlayer.css";
import { UPLOAD_URL } from "../utils/constants";

const API_URL = "http://localhost:5000";

const VideoPlayer = () => {
    const params = useParams();

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //   useEffect(() => {
    //     fetchVideo();
    //   }, [id]);

    //   const fetchVideo = async () => {
    //     try {
    //       setLoading(true);

    //       const response = await axios.get(
    //         `${API_URL}/api/videos/${id}`
    //       );

    //       if (response.data.success) {
    //         setVideo(response.data.video);
    //       } else {
    //         setError("Video not found");
    //       }
    //     } catch (err) {
    //       console.error(err);
    //       setError("Unable to load video");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   if (loading) {
    //     return (
    //       <div className="player-loading">
    //         Loading video...
    //       </div>
    //     );
    //   }

    //   if (error || !video) {
    //     return (
    //       <div className="player-error">
    //         {error || "Video not found"}
    //       </div>
    //     );
    //   }

    //   const videoUrl = `${API_URL}${video.video}`;
    //   const thumbnailUrl = video.thumbnail
    //     ? `${API_URL}${video.thumbnail}`
    //     : undefined;

    const thumbnailUrl = `${UPLOAD_URL}/thumbnails/${params.thumbnail}`;
    const videoUrl = `${UPLOAD_URL}/videos/${params.videoUrl}`;
    console.log(videoUrl);
    
    return (
        <div className="player-page">

            {/* Main Content */}
            <div className="player-main">

                {/* Video */}
                <div className="video-container">
                    <video
                        controls
                        autoPlay
                        preload="metadata"
                        poster={thumbnailUrl}
                        className="video-element"
                    >
                        <source
                            src={videoUrl}
                            type="video/mp4"
                        />

                        Your browser does not support
                        HTML5 video.
                    </video>
                </div>

                {/* Video Information */}
                <div className="video-info">

                    <h1>{"video.title"}</h1>

                    <p className="video-description">
                        {"video.description"}
                    </p>

                    <div className="video-meta">
                        <span>📚 Learning Video</span>
                        <span>▶ Watch & Learn</span>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default VideoPlayer;