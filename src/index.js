const express = require("express")
const dotenv = require("dotenv")
const { PrismaClient } = require("./generated/prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello World!")
})


app.get("/products", async (req, res)=> {
    const products = await prisma.product.findMany();

    res.send(products);
})

app.post("/products", async (req, res)=> {
    const newProductData = req.body;

    const product = await prisma.product.create({
        data : {
            name: newProductData.name,
            description: newProductData.description,
            image: newProductData.image,
            price: newProductData.price
        }
    });

    res.send({
        data : product,
        message: "Create data succses"
    })
})

app.listen(PORT, ()=>{
    console.log(`Express API running in port ${PORT}`)
})