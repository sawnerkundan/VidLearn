import { Router } from "express";
import videosRoutes from "./video.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
    res.json({ message: "Video Learning app is running!" });
});

router.use("/videos", videosRoutes);
router.use("/auth", authRoutes);


export default router;