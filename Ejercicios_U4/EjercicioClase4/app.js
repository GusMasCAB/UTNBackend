const express = require("express");
const app = express();
const routerProductos = require("./routes/productos");
app.use(express.json());
const errorHandler = require("./middlewares/errorHandler");

app.use("/productos",routerProductos);
app.use(errorHandler);

const port = 3000;
app.listen(port,()=>{
    console.log(`Servidor Express.js en funcionamiento en el purerto ${port}`);
});