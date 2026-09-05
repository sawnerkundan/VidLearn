import multer from "multer";
import path from "path";
import fs from "fs";

const uploadRoot = path.join(process.cwd(), "uploads");

console.log("Upload root path:", uploadRoot);

// Create upload directories
const videoPath = path.join(uploadRoot, "videos");
const thumbnailPath = path.join(uploadRoot, "thumbnails");

fs.mkdirSync(videoPath, { recursive: true });
fs.mkdirSync(thumbnailPath, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "video") {
            return cb(null, videoPath);
        }

        if (file.fieldname === "thumbnail") {
            return cb(null, thumbnailPath);
        }

        return cb(new Error("Invalid upload field"));
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();

        const filename = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${extension}`;

        cb(null, filename);
    },
});

// File validation
const fileFilter = (req, file, cb) => {
    const extension = path
        .extname(file.originalname)
        .toLowerCase();

    console.log("Upload field:", file.fieldname);
    console.log("Original name:", file.originalname);
    console.log("Mimetype:", file.mimetype);
    console.log("Extension:", extension);

    // =========================
    // VIDEO
    // =========================
    if (file.fieldname === "video") {
        const allowedVideoExtensions = [
            ".mp4",
            ".webm",
            ".mov",
        ];

        if (!allowedVideoExtensions.includes(extension)) {
            return cb(
                new Error(
                    "Only MP4, WebM and MOV video files are allowed"
                )
            );
        }

        return cb(null, true);
    }

    // =========================
    // THUMBNAIL
    // =========================
    if (file.fieldname === "thumbnail") {
        const allowedImageExtensions = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
        ];

        if (!allowedImageExtensions.includes(extension)) {
            return cb(
                new Error(
                    "Only JPG, JPEG, PNG and WebP images are allowed"
                )
            );
        }

        return cb(null, true);
    }

    return cb(new Error("Invalid upload field"));
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter,

    limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB
    },
});

export default upload;