const express = require("express");
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const errorHandler = require("./middleware/errorHandler");
const routerProductos = require("./routes/productos");
app.use(express.json());//se define que todas las solicitudes http en la estructura de body las transforme a json

/* configuramos un middleware de autenticación (jwtCheck) que se usa para verificar la autenticidad y validez 
de un token JWT antes de permitir que una solicitud continúe en una API o aplicación.
Este verificador utiliza los datos de auht0 para verificar los token JWT*/
const jwtCheck = auth({
    audience: 'https://api.example.com/api/productos',
    issuerBaseURL: 'https://dev-b24dr0cj2k0xabmn.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});
//Validar en todos los endpoints. Antes de declarar las rutas
//app.use(jwtCheck); //usamos el middleware y la primera vez que ejecute el api verifica el token jwt


//Ruta base para probar
app.get("/",(req,res)=>{
    res.send("API de productos");
})
// le pasamos el middleware como parametro
app.use("/productos",jwtCheck,routerProductos);
app.use(errorHandler);//va al ultimo porque sucede despues de cualquier API

const port = 3000;
app.listen(port,()=>{
    console.log(`API de productos escuchando en el puerto ${port}`);
});