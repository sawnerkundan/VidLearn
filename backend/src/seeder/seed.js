import mongoose from "mongoose";
import seedAdmin from "./seed.admin.js";
import { config } from "dotenv";

config();

const runSeed = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
            .then(async () => {
                console.log('Successfully connected to MongoDB.');
                await seedAdmin();

                console.log("Seeding completed.");

                process.exit(0);
            })
            .catch((error) => {
                console.error('Connection error:', error.message);
                process.exit(1);
            });
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

runSeed();