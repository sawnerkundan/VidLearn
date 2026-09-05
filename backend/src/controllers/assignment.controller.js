import VideoAssignment from "../models/videoAssignment.model.js";
import User from "../models/user.model.js";
import Video from "../models/video.model.js";

// Get all learners for admin
export const getLearners = async (req, res) => {
  try {
    const learners = await User.find({
        role: 'user'
    })
      .select("_id username email")
      .sort({ username: 1 });

    res.status(200).json({
      success: true,
      learners,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch learners",
    });
  }
};

// Get all videos for admin
export const getVideosForAssignment = async (
  req,
  res
) => {
  try {
    const videos = await Video.find()
      .select("_id title thumbnailUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch videos",
    });
  }
};

// Assign video to learner
export const assignVideo = async (req, res) => {
  try {
    const { learnerId, videoId } = req.body;

    if (!learnerId || !videoId) {
      return res.status(400).json({
        success: false,
        message: "Learner and video are required",
      });
    }

    const learner = await User.findOne({
      _id: learnerId,
      role: "user",
    });

    console.log('learner', learner);

    if (!learner) {
      return res.status(404).json({
        success: false,
        message: "Learner not found",
      });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    const existingAssignment =
      await VideoAssignment.findOne({
        learner: learnerId,
        video: videoId,
      });

    if (existingAssignment) {
      return res.status(409).json({
        success: false,
        message: "Video already assigned to this learner",
      });
    }

    const assignment = await VideoAssignment.create({
      learner: learnerId,
      video: videoId,
      assignedBy: req.user._id,
    });

    const populatedAssignment =
      await VideoAssignment.findById(
        assignment._id
      )
        .populate("learner", "name email")
        .populate("video", "title thumbnailUrl")
        .populate("assignedBy", "name email");

    res.status(201).json({
      success: true,
      message: "Video assigned successfully",
      assignment: populatedAssignment,
    });
  } catch (error) {
    console.error("Assign video error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to assign video",
    });
  }
};

// Get assignments for admin
export const getAllAssignments = async (
  req,
  res
) => {
  try {
    const assignments = await VideoAssignment.find()
      .populate("learner", "name email")
      .populate(
        "video",
        "title thumbnailUrl videoUrl"
      )
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assignments",
    });
  }
};

// Get logged-in learner's assigned videos
export const getMyAssignments = async (
  req,
  res
) => {
  try {
    const assignments =
      await VideoAssignment.find({
        learner: req.user._id,
      })
        .populate(
          "video",
          "title description videoUrl thumbnail"
        )
        .populate("assignedBy", "name")
        .sort({ assignedAt: -1 });

    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch assigned videos",
    });
  }
};

// Update assignment status
export const updateAssignmentStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "assigned",
      "in-progress",
      "completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const assignment =
      await VideoAssignment.findOne({
        _id: req.params.id,
        learner: req.user._id,
      });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    assignment.status = status;

    if (status === "completed") {
      assignment.completedAt = new Date();
    } else {
      assignment.completedAt = null;
    }

    await assignment.save();

    res.status(200).json({
      success: true,
      message: "Assignment status updated",
      assignment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

// Remove assignment - Admin
export const deleteAssignment = async (
  req,
  res
) => {
  try {
    const assignment =
      await VideoAssignment.findById(
        req.params.id
      );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    await assignment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Assignment removed successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to remove assignment",
    });
  }
};