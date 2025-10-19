const courseRepository = require("./course.repository");

const getAllCourses = async (params) => {
  const courses = await courseRepository.findCourses(params);
  return courses;
};

const getCourseById = async (id) => {
  const course = await courseRepository.findCourseById(id);
  if (!course) {
    throw new Error("Kursus tidak ditemukan");
  }
  return course;
};

const createCourse = async (newCourseData) => {
  const course = await courseRepository.insertCourse(newCourseData);
  return course;
};

const deleteCourseById = async (id) => {
  await getCourseById(id); 
  await courseRepository.deleteCourse(id);
};

const editCourseById = async (id, courseData) => {
  await getCourseById(id); 
  const course = await courseRepository.editCourse(id, courseData);
  return course;
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourseById,
  editCourseById,
};