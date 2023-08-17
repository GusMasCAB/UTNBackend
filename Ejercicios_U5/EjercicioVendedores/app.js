const express = require("express");
const app = express();
const routerVendedores = require("./routes/vendedores");

app.use(express.json());
app.use("/vendedores",routerVendedores);


const port = 3000;
app.listen(port,()=>{
    console.log(`Servidor iniciado en el puerto ${port}`);
});