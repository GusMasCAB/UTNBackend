//En esta línea importamos la libreria http de Node.js. 
//Esta libreria proporciona funcionalidades para crear servidores web 
//y manejar solicitudes y respuestas HTTP.
const http = require("http");

/*Aquí definimos la dirección IP (`127.0.0.1`, que es la dirección local o "localhost") 
y el puerto (`3000`) en el que deseamos que el servidor escuche las solicitudes entrantes.*/
const hostname = '127.0.0.1';
const port = 3000;


/*creamos un servidor utilizando el método createServer del módulo http. 
Este método recibe una función que se ejecutará cada vez que llegue una solicitud al servidor. 
En esta función, configuramos la respuesta (`res`) que se enviará al cliente. 
- Se establece el estado de la respuesta a `200` (OK).
- Se configura la cabecera de la respuesta para indicar que el tipo de contenido es text/plain.
- Enciamos "Hola Mundo" como cuerpo de la respuesta utilizando `res.end()`, lo que finaliza la comunicación.
*/
// Creamos un objeto de servidor utilizando el método createServer de http
const server = http.createServer((req,res) => {
    // Configuramos el estado de la respuesta como 200 (OK)
    res.statusCode = 200;
    // Configuramos la cabecera de la respuesta con el tipo de contenido
    res.setHeader('content-type','text/plain');
    // Enviamos "Hola Mundo" como respuesta y terminamos la comunicación
    res.end("Hola Mundo");
});

/*Utilizamos el método listen del servidor para hacer que escuche las solicitudes 
entrantes en la dirección IP y el puerto especificados. La función flecha que le pasamos como 
parametro se ejecutará una vez que el servidor esté en funcionamiento y mostrará "Iniciando servidor web" en la consola.*/
// Iniciamos el servidor, especificando el puerto y la dirección IP
server.listen(port, hostname, () => {
    console.log("Iniciando servidor web");
});
