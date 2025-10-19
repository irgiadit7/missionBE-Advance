const prisma = require("../course/db");

const insertUser = async (userData) => {
    const user = await prisma.user.create({
        data : {
            fullname : userData.fullname,
            username : userData.username,
            password : userData.password,
            email : userData.email,
            verificationToken: userData.verificationToken,
        },
    });

    return user;
}

const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where : {
            email
        }
    })

    return user
}

const findUserByVerificationToken = async (token) => {
    const user = await prisma.user.findFirst ({
        where: {
            verificationToken : token,
        }
    })
}

module.exports = {
    insertUser,
    findUserByEmail
}