const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host : process.env.EMAIL_HOST,
    port : process.env.EMAIL_PORT,
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS,
    }
})

const sendVerificationEmail = async (user, token)=>{
    const verificationLink = `https://localhost:2000/auth/verify-email?token=${token}`;

    const mailOptions = {
        from : process.env.EMAIL_FROM,
        to : user.email,
        subject : "Verifikasi email anda untuk platform EduCourse",
        html : `<h2>halo ${user.fullname}</h2>
                <p>Terima kasih sudah mendaftar di platform kami. Silakan klik link di bawah ini untuk memverifikasi alamat email Anda:</p>
                <a href="${verificationLink}">${verificationLink}</a>
        `
        };

        await transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerificationEmail
}