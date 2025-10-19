const { error } = require("console");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "uploads/");
    },

    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
});

const fileFilter = (req, file, cb)=> {
    if(
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
    ){
        cb(null, true);
    }else {
        cb(new error("Hanya file gambar (JPEG, PNG, JPG) yang diizinkan!"), false)
    }
}

const upload = multer ({
    storage,
    fileFilter,
    limits : {
        fileSize: 1024 * 1024 * 5,
    }
})

module.exports = upload