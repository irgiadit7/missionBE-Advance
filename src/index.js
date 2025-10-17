const express = require("express");
const dotenv = require("dotenv");
const courseController = require("./course/course.controller");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

const courseRouter = express.Router();

courseRouter.get("/", courseController.getAllCourses);
courseRouter.get("/:id", courseController.getCourseById);
courseRouter.post("/", courseController.createCourse);
courseRouter.delete("/:id", courseController.deleteCourseById);
courseRouter.put("/:id", courseController.editCourseById);
courseRouter.patch("/:id", courseController.patchCourseById);

app.use("/course", courseRouter);

app.listen(PORT, () => {
  console.log("Express API berjalan di port: " + PORT);
});