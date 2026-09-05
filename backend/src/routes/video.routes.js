import { Router } from "express";
import { getVideos, getVideo, createVideo, deleteVideo, updateVideo } from "../controllers/video.controller.js";
import upload from "../middleware/upload.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, authorizeRoles("admin"), getVideos);
router.get("/:id", authenticateToken, getVideo);
router.post("/", authenticateToken, authorizeRoles("admin"), upload.fields([
    {
        name: "video",
        maxCount: 1
    },
    {
        name: "thumbnail",
        maxCount: 1
    }]), createVideo);
router.put("/:id", authenticateToken, authorizeRoles("admin"), updateVideo);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deleteVideo);

export default router;