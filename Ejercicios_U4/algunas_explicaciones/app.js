
/**Express.js es un marco de trabajo para construir aplicaciones web 
 * en Node.js de manera más sencilla y estructurada */
const express = require('express');
const app = express();
const routerProductos = require("./routes/productos");
const routeClientes = require("./routes/clientes");
/**express.json() es un middleware incorporado en Express.js que se utiliza para analizar 
 * automáticamente los cuerpos de las solicitudes HTTP que contienen datos en formato JSON. 
 * Este middleware, analiza el cuerpo de la solicitud, interpreta los datos JSON y los 
 * convierte en un objeto JavaScript que luego se adjunta al objeto de solicitud req.body.*/
app.use(express.json());

/*app.get('/'):método .get() de la instancia de la aplicación Express (app) 
se utiliza para definir una ruta que maneja solicitudes HTTP GET. 
El primer argumento ('/') es la ruta en la que deseas que esta función
 de manejo de ruta se active. En este caso, se trata de la ruta raíz ("/"), 
 que es la página principal del servidor.
 Segundo argumento es una funcion de devolucion de llamada con dos parametros req y res 
 req representa a la peticion y res a la respuesta.
 Las funciones de devolución de llamada se utilizan para definir cómo debe comportarse 
 tu servidor web en respuesta a una solicitud específica. */
 app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});



app.use('/productos',routerProductos);
app.use('/clientes',routeClientes);
//Middleware de manejo de errores
/**Se ejecutará cada vez que se llame a next(err) desde cualquier parte de la aplicación, lo 
 * que indica que ha ocurrido un error y el flujo de control debe pasar a este middleware. */
/*res.status(err.status || 500);:
Establece el código de estado de la respuesta HTTP. Si el objeto de error (err) tiene una 
propiedad status, se utilizará ese valor. Si no, se usará un código de estado 500 por defecto.*/
/**res.json({ error: err.message });: Envia una respuesta en formato JSON del error */
app.use((err, req, res, next) => {
    // Manejo de errores
    res.status(err.status || 500);
    res.json({
    error: err.message 
    });
});

const port = 3000;
app.listen(port,()=>{
    console.log(`Servidor Express:js en funcionamiento en el puerto ${port}`);
});