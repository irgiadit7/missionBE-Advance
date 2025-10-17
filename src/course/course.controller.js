const courseService = require("./course.service");

// Controller untuk mendapatkan semua course
const getAllCourses = async (req, res) => {
  const courses = await courseService.getAllCourses();
  res.send(courses);
};

// Controller untuk mendapatkan course berdasarkan ID
const getCourseById = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const course = await courseService.getCourseById(courseId);
    res.send(course);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

// Controller untuk membuat course baru
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

// Controller untuk menghapus course
const deleteCourseById = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    await courseService.deleteCourseById(courseId);
    res.send({ message: "Kursus berhasil dihapus" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Controller untuk mengedit course (PUT)
const editCourseById = async (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseData = req.body;

  if (!courseData.name || !courseData.price || !courseData.description || !courseData.image) {
     return res.status(400).send({ message: "Beberapa field wajib diisi" });
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

// Controller untuk mengedit sebagian data course (PATCH)
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
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourseById,
  editCourseById,
  patchCourseById,
};