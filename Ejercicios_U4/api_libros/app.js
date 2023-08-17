const express = require("express");
const app = express();
app.use(express.json());
const errorHandler = require("./middlewares/errorHandler");
const librosRouter = require("./routes/libros");


app.use("/libros",librosRouter);
app.use(errorHandler);

const port = 3000;
app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
});