import videoService from "../services/video.service.js";

export const getVideos = async (req, res) => {
    const videos = await videoService.getVideos();
    res.json({ data: videos, success: true, message: 'Videos fetched successfully' });
};

export const getVideo = async (req, res) => {
    const video = await videoService.getVideo(req.params.id);
    res.json({ data: video, success: true, message: 'Video fetched successfully' });
};

export const createVideo = async (req, res) => {
    
    const { title, description } = req.body;
    
    if (!req.files?.video) {
        return res.status(400).json({
            message: "Video file is required",
        });
    }

    if (!req.files?.thumbnail) {
      return res.status(400).json({
        message: "Thumbnail file is required",
      });
    }
    
    const videoData = {
        title,
        description,
        thumbnail: req.files['thumbnail'][0].filename,
        videoUrl: req.files['video'][0].filename
    };
    const video = await videoService.createVideo(videoData, 1);
    res.json({ data: video, success: true, message: 'Video created successfully' });
};

export const deleteVideo = async (req, res) => {
    const videoId = req.params.id;
    const video = await videoService.deleteVideo(videoId);
    res.json({ data: video, success: true, message: 'Video deleted successfully' });
};

export const updateVideo = async (req, res) => {
    const videoId = req.params.id;
    const video = req.body;
    const updatedVideo = await videoService.updateVideo(videoId, video);
    res.json({ data: updatedVideo, success: true, message: 'Video updated successfully' });
};
