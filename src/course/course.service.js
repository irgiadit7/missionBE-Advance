// src/course/course.service.js
const courseRepository = require("./course.repository");

// Mengambil semua course
const getAllCourses = async () => {
  const courses = await courseRepository.findCourses();
  return courses;
};

// Mengambil course berdasarkan ID
const getCourseById = async (id) => {
  const course = await courseRepository.findCourseById(id);
  if (!course) {
    throw new Error("Kursus tidak ditemukan");
  }
  return course;
};

// Membuat course baru
const createCourse = async (newCourseData) => {
  const course = await courseRepository.insertCourse(newCourseData);
  return course;
};

// Menghapus course berdasarkan ID
const deleteCourseById = async (id) => {
  await getCourseById(id); // Memastikan data ada sebelum dihapus
  await courseRepository.deleteCourse(id);
};

// Mengedit course berdasarkan ID
const editCourseById = async (id, courseData) => {
  await getCourseById(id); // Memastikan data ada sebelum diedit
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