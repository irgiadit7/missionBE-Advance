const userService = require("./user.service");

const registerUSer = async (req, res)=> {
    try {
        const newUserData = req.body;

        if (
      !newUserData.fullname ||
      !newUserData.username ||
      !newUserData.password ||
      !newUserData.email
    ) {

      return res.status(400).send({ message: "Semua field wajib diisi" });
    }

    const user = await userService.createUser(newUserData);

    res.status(201).send({
      data: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      },
      message: "User berhasil diregistrasi!",
    });

        
    } catch (error) {
       if (error.code === 'P2002') {
        return res.status(409).send({ message: "Username atau email sudah digunakan." });
    }
    res.status(500).send({ message: error.message });
    }
}

const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).send({message: "Email dan password wajib di isi!"})
        };

        const token = await userService.loginUser(email, password);

        res.status(200).send({
            token,
            message: "Login berhasil!"
        })
        
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const verifyEmail = async (req, res)=>{
  try {
    const {token} = req.query;

    if(!token){
      return res.status(400).send({ message: "Token is required" });
    }

    await userService.verifyEmail(token);

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

module.exports = {
    registerUSer,
    loginUser,
    verifyEmail
}