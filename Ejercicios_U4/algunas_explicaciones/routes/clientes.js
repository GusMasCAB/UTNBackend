const express = require('express');
const routerClientes = express.Router();

routerClientes.get('/', (req, res, next) => {
    const productos = [
    { id: 1, nombre: 'Tablet'},
    { id: 2, nombre: 'PC'}
    ];
    return next({status: 400, message: 'Error'});

    res.json(productos);
});

/**const authToken = req.header('Authorization');, el código captura el valor del encabezado de 
 * autorización (Authorization) de la solicitud. */
routerClientes.get('/clientes', (req, res) => {
    const authToken = req.header('Authorization');
    // Aquí puedes usar el authToken para autenticar al usuario o realizar validaciones adicionales
    res.send(`Token de autorización: ${authToken}`);
});

module.exports = routerClientes;
