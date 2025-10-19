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

    return user;
}

const updateUserVerification = async(userID)=>{
    const user = await prisma.user.update({
        where: {
            id : userID,
        },

        data : {
            isVerified : true,
            verificationToken : null,
        }
    })

    return user
}


module.exports = {
    insertUser,
    findUserByEmail,
    findUserByVerificationToken,
    updateUserVerification
}