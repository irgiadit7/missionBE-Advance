const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("./generated/prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello World!");
});

app.get("/course", async (req, res) => {
    const courses = await prisma.course.findMany();
    res.send(courses);
});

app.get("/course/:id", async (req, res) => {
    try {
        const courseId = parseInt(req.params.id);

        if (isNaN(courseId)) {
            return res.status(400).send({
                message: "Invalid ID format. ID must be a number."
            });
        }

        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
        });

        if (!course) {
            return res.status(404).send({
                message: "Course not found!"
            });
        }
        res.send(course);

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Something went wrong on the server."
        });
    }
});


app.post("/course", async (req, res) => {
    const newCourseData = req.body;
    const course = await prisma.course.create({
        data: {
            name: newCourseData.name,
            description: newCourseData.description,
            image: newCourseData.image,
            price: newCourseData.price,
        },
    });

    res.status(201).send({
        data: course,
        message: "Create course success!",
    });
});

app.delete("/course/:id", async (req, res) => {
    try {
        const courseId = parseInt(req.params.id);

        if (isNaN(courseId)) {
            return res.status(400).send({ message: "Invalid ID format." });
        }

        await prisma.course.delete({
            where: { id: courseId },
        });

        res.status(200).send({
            message: "Course successfully deleted."
        });

    } catch (error) {
        if (error.code === 'P2025') { 
            return res.status(404).send({ message: "Course not found!" });
        }
        res.status(500).send({ message: "Something went wrong." });
    }
});


app.put("/course/:id", async (req, res) => {
    const courseId = req.params.id;
    const courseData = req.body;

    if (
        !(
            courseData.image &&
            courseData.description &&
            courseData.name &&
            typeof courseData.price !== 'undefined'
        )
    ) {
        return res.status(400).send({ message: "All fields are required for PUT request!" });
    }

    const course = await prisma.course.update({
        where: {
            id: parseInt(courseId),
        },
        data: {
            description: courseData.description,
            image: courseData.image,
            name: courseData.name,
            price: courseData.price,
        },
    });

    res.send({
        data: course,
        message: "Edit course success!",
    });
});

app.patch("/course/:id", async (req, res) => {
    const courseId = req.params.id;
    const courseData = req.body;
    const course = await prisma.course.update({
        where: {
            id: parseInt(courseId),
        },
        data: courseData, 
    });

    res.send({
        data: course,
        message: "Edit course success!",
    });
});


app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
});