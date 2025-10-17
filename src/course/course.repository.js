const prisma = require("./db");

const findCourses = async () => {
  const courses = await prisma.course.findMany();
  return courses;
};

const findCourseById = async (id) => {
  const course = await prisma.course.findUnique({
    where: { id },
  });
  return course;
};

const insertCourse = async (courseData) => {
  const course = await prisma.course.create({
    data: {
      title: courseData.title,
      description: courseData.description,
      price: courseData.price,
      author: courseData.author,
      category: courseData.category,
      imageUrl: courseData.imageUrl,
      rating: courseData.rating,
    },
  });
  return course;
};

const deleteCourse = async (id) => {
  await prisma.course.delete({
    where: { id },
  });
};

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