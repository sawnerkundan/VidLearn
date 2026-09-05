import bcrypt from "bcrypt";
import userService from '../services/user.service.js';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    
    userService.createUser({ username, email, passwordHash })
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful", token });  
}