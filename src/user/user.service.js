const bcrypt = require("bcrypt");
const userRepository = require("./user.repository");
const jwt = require("jsonwebtoken")

const createUser = async (newUserData) =>{
    const hashedPassword = await bcrypt.hash(newUserData.password, 10);

    const user = await userRepository.insertUser({
        ...newUserData,
        password: hashedPassword,
    });

    return user;
}

const loginUser = async (email, password) => {
    const user = await userRepository.findUserByEmail(email);
    if(!user){
        throw new Error("Email atau password salah!")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        throw new Error("Email atau password salah!");
    }

    const token = jwt.sign({id : user.id}, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    return token;
}

module.exports = {
    createUser,
    loginUser
}