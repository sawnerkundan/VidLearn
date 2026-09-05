import Video from "../models/video.model.js";

const createVideo = async (data, adminId) => {
    return Video.create({ ...data, createdBy: adminId });
}

const getVideos = async () => {
    return Video.find();
}

const getVideo = async (id) => {
    return Video.findById(id);
}

const deleteVideo = async (id) => {
    return Video.findByIdAndDelete(id);
}

const updateVideo = async (id, data) => {
    return Video.findByIdAndUpdate(id, data, { new: true });
}

export default { createVideo, getVideos, getVideo, deleteVideo, updateVideo };