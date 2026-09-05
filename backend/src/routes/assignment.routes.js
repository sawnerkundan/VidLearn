import express from "express";

import {
    getLearners,
    getVideosForAssignment,
    assignVideo,
    getAllAssignments,
    getMyAssignments,
    updateAssignmentStatus,
    deleteAssignment,
} from "../controllers/assignment.controller.js";

import {
    authenticateToken,
    authorizeRoles,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// ============================
// ADMIN
// ============================

router.get(
    "/learners",
    authenticateToken,
    authorizeRoles("admin"),
    getLearners
);

router.get(
    "/videos",
    authenticateToken,
    authorizeRoles("admin"),
    getVideosForAssignment
);

router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    assignVideo
);

router.get(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    getAllAssignments
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    deleteAssignment
);

// ============================
// LEARNER
// ============================

router.get(
    "/my",
    authenticateToken,
    authorizeRoles("user"),
    getMyAssignments
);

router.patch(
    "/:id/status",
    authenticateToken,
    authorizeRoles("user"),
    updateAssignmentStatus
);

export default router;