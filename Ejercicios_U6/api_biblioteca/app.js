const express = require("express");
const {auth} = require("express-oauth2-jwt-bearer");
const app = express();
app.use(express.json());

const autenticacion = auth({
    audience: 'https://api.example.com/api/libros',
    issuerBaseURL: 'https://dev-b24dr0cj2k0xabmn.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});



const routerLibros = require("./routes/libros");
const errorHandler = require("./middlewares/errorHandler");


app.use("/libros",autenticacion,routerLibros);
app.use(errorHandler);


const port = 3000;
app.listen(port,()=>{
    console.log(`Server en funcionamiento en el puerto ${port}`);
});
