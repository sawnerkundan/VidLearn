import User from "../models/user.model.js";
import bcrypt from "bcrypt";


const seedAdmin = async () => {
  try {
    const adminEmail = "admin@sawnerkundan.com";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("Sawner@539", 10);

    // Create admin
    await User.create({
      username: "Admin",
      email: adminEmail,
      passwordHash: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};


export default seedAdmin;