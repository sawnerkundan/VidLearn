import mongoose from "mongoose";

const videoAssignmentSchema = new mongoose.Schema(
  {
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["assigned", "in-progress", "completed"],
      default: "assigned",
    },

    assignedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent assigning the same video twice
videoAssignmentSchema.index(
  {
    learner: 1,
    video: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model('VideoAssignment', videoAssignmentSchema);