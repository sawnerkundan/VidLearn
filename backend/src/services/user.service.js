import User from "../models/user.model.js";

const createUser = async (data) => {
    return User.create(data);
}

const findUserByEmail = async (email) => {
    return User.findOne({ email });
}

export default { createUser, findUserByEmail };