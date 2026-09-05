import { Router } from "express";
import authRoutes from "./auth.routes.js";
import videosRoutes from "./video.routes.js";
import assignmentRoutes from "./assignment.routes.js"

const router = Router();

router.get("/health", (_req, res) => {
    res.json({ message: "Video Learning app is running!" });
});

router.use("/auth", authRoutes);
router.use("/videos", videosRoutes);
router.use("/assignments", assignmentRoutes)


export default router;