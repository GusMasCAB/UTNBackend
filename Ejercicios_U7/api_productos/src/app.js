const express = require("express");
const routerProductos = require("./routes/productos");
const errorHandler = require("./middleware/errorHandler");

const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: 'https://api.example.com/api/productos',
    issuerBaseURL: 'https://dev-b24dr0cj2k0xabmn.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

const app = express();
app.use(express.json());

// le pasamos el middleware como parametro
app.use("/productos",jwtCheck,routerProductos);
app.use(errorHandler);//va al ultimo porque sucede despues de cualquier API

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`API de productos escuchando en el puerto ${PORT}`);
});

module.exports = app;