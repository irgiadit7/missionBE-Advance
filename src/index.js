const express =require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("./generated/prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();


const PORT = process.env.PORT

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello World!");
})

app.get("/products", async (req, res)=> {
    const products = await prisma.product.findMany();

    res.send(products)
})

app.get("/products/:id", async (req, res)=>{
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
        where: {
            id : parseInt(productId),
        }
    })

    if (!product) {
    return res.status(400).send("Product not found!")
}

res.send(product);

});

app.post("/products", async (req, res) => {
    const newProductData = req.body;

    const product = await prisma.product.create({
            data : {
                    name : newProductData.name,
                    description : newProductData.description,
                    image : newProductData.image,
                    price : newProductData.price
            }
    });

    res.send({
        data : product,
        massage : "create product succsess!"
    })
})

app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id //string

    await prisma.product.delete({
        where : {
            id: parseInt(productId),
        },
    });

    res.send("Product Deleted!")
})

app.put("/products/:id", async (req, res)=> {;
    const productId = req.params.id;
    const productData = req.body;

    if (!(productData.image && productData.description && productData.name && productData.price)) {
       return res.status(400).send("Some file are missing!")
    }

    const product = await prisma.product.update({
            where : {
                id: parseInt(productId),
            },
            data : {
                description: productData.description,
                image: productData.image,
                name: productData.name,
                price: productData.price
            }
    });

    res.send({
        data: product,
        massage: "Edit product succses!"
    })
})

app.patch("/products/:id", async (req, res)=>{ 
       const productId = req.params.id;
    const productData = req.body;

    const product = await prisma.product.update({
            where : {
                id: parseInt(productId),
            },
            data : {
                description: productData.description,
                image: productData.image,
                name: productData.name,
                price: productData.price
            }
    });

    res.send({
        data: product,
        massage: "Edit product succses!"
    })
})

app.listen(PORT, () => {
    console.log("Express API running in port:" + PORT)
})