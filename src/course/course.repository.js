const prisma = require ("./db/index")

// Fungsi untuk mengambil semua data course
const findCourses = async () => {
  const courses = await prisma.course.findMany();
  return courses;
};

// Fungsi untuk mencari course berdasarkan ID
const findCourseById = async (id) => {
  const course = await prisma.course.findUnique({
    where: { id },
  });
  return course;
};

// Fungsi untuk menambahkan course baru
const insertCourse = async (courseData) => {
  const course = await prisma.course.create({
    data: {
      name: courseData.name,
      description: courseData.description,
      image: courseData.image,
      price: courseData.price,
    },
  });
  return course;
};

// Fungsi untuk menghapus course
const deleteCourse = async (id) => {
  await prisma.course.delete({
    where: { id },
  });
};

// Fungsi untuk mengubah data course
const editCourse = async (id, courseData) => {
  const course = await prisma.course.update({
    where: { id: parseInt(id) },
    data: courseData,
  });
  return course;
};

module.exports = {
  findCourses,
  findCourseById,
  insertCourse,
  deleteCourse,
  editCourse,
};