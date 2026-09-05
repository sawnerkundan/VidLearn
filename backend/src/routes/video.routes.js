import { Router } from "express";
import { getVideos, getVideo, createVideo, deleteVideo, updateVideo } from "../controllers/video.controller.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/", getVideos);
router.get("/:id", getVideo);
router.post("/", upload.fields([
    {
        name: "video",
        maxCount: 1
    },
    {
        name: "thumbnail",
        maxCount: 1
    }]), createVideo);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

export default router;