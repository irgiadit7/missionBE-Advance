const express = require("express");
const dotenv = require("dotenv");
const courseController = require("./course/course.controller");
const userController = require("./user/user.controller")

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

const courseRouter = express.Router();
const authRouter = express.Router();

courseRouter.get("/", courseController.getAllCourses);
courseRouter.get("/:id", courseController.getCourseById);
courseRouter.post("/", courseController.createCourse);
courseRouter.delete("/:id", courseController.deleteCourseById);
courseRouter.put("/:id", courseController.editCourseById);
courseRouter.patch("/:id", courseController.patchCourseById);

app.use("/course", courseRouter);

app.use("/auth", authRouter)

authRouter.post("/register", userController.registerUSer);
authRouter.post("/login", userController.loginUser);

app.listen(PORT, () => {
  console.log("Express API berjalan di port: " + PORT);
});