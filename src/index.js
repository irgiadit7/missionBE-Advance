const express = require("express");
const dotenv = require("dotenv");
const courseController = require("./course/course.controller");
const userController = require("./user/user.controller")
const { verifyToken } = require("./middleware/auth.middleware.js")
const path = require("path");
const uploadController = require("./upload/upload.controller.js");
const uploadMiddleware = require("./middleware/upload.middleware.js");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

const courseRouter = express.Router();
const authRouter = express.Router();
const uploadRouter = express.Router();

app.use("/course", courseRouter);

courseRouter.get("/",verifyToken, courseController.getAllCourses);
courseRouter.get("/:id",verifyToken, courseController.getCourseById);
courseRouter.post("/",verifyToken, courseController.createCourse);
courseRouter.delete("/:id",verifyToken, courseController.deleteCourseById);
courseRouter.put("/:id",verifyToken, courseController.editCourseById);
courseRouter.patch("/:id",verifyToken, courseController.patchCourseById);

app.use("/auth", authRouter)

authRouter.get("/verify-email", userController.verifyEmail);
authRouter.post("/register", userController.registerUSer);
authRouter.post("/login", userController.loginUser);

app.use("/upload", uploadRouter);
app.use("/uploads", express.static(path.join(__dirname, ".../uploads")));

uploadRouter.post(
  "/",
  verifyToken,
  uploadMiddleware.single("image"),
  uploadController.uploadImage,
);

app.listen(PORT, () => {
  console.log("Express API berjalan di port: " + PORT);
});