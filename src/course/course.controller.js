const courseService = require("./course.service");

const getAllCourses = async (req, res) => {
  const courses = await courseService.getAllCourses();
  res.send(courses);
};

const getCourseById = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const course = await courseService.getCourseById(courseId);
    res.send(course);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const newCourseData = req.body;
    const course = await courseService.createCourse(newCourseData);
    res.status(201).send({
      data: course,
      message: "Kursus berhasil dibuat!",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    await courseService.deleteCourseById(courseId);
    res.send({ message: "Kursus berhasil dihapus" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const editCourseById = async (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseData = req.body;

  if (
    !courseData.title ||
    !courseData.description ||
    !courseData.price ||
    !courseData.author ||
    !courseData.category ||
    !courseData.imageUrl ||
    !courseData.rating
  ) {
    return res
      .status(400)
      .send({ message: "Semua field wajib diisi untuk method PUT" });
  }

  try {
    const course = await courseService.editCourseById(courseId, courseData);
    res.send({
      data: course,
      message: "Kursus berhasil diubah!",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const patchCourseById = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const courseData = req.body;

    const course = await courseService.editCourseById(courseId, courseData);

    res.send({
      data: course,
      message: "Kursus berhasil diubah!",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourseById,
  editCourseById,
  patchCourseById,
};