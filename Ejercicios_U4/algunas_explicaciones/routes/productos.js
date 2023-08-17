const express = require('express');
const routerProductos = express.Router();

/*Cuando utilizas req.query.categoria, estás esperando que el cliente incluya el parámetro categoria 
en la URL de la solicitud para que puedas extraer su valor y usarlo en tu código del servidor.  
Cuando el cliente realiza la solicitud, Express.js automáticamente toma los parámetros de la cadena de 
consulta y los pone en el objeto req.query */
routerProductos.get('/', (req, res) => {
    const categoria = req.query.categoria;
    const stock = req.query.stock;
    res.send(`Realizar búsqueda de productos en la categoría "${categoria} y con stock ${stock}"`);
}); 

routerProductos.get('/:id', (req, res) => {
    const productoId = req.params.id;
    // Lógica para obtener información del usuario con el ID especificado
    res.send(`Información del producto con ID ${productoId}`);
});

   
/** req.body; el objeto body contiene el cuerpo de la solicitud POST, 
 * que generalmente son datos enviados por el clente (en este caso es un producto)
 * JSON.stringify() es una función en JavaScript que toma un objeto como parametro 
 *y lo convierte en una cadena de caracteres en formato JSON. */

routerProductos.post('/', (req, res) => {
    const producto = req.body;
    // Aquí puedes guardar el nuevo producto en la base de datos o realizar otras operaciones relacionadas con el producto
    res.send(`Guardar nuevo producto: ${JSON.stringify(producto)}`);
});

module.exports = routerProductos;