const express = require('express');
const router = express.Router();
const { requiredScopes } = require('express-oauth2-jwt-bearer');
//Le tenemos que indicar a cada ruta que scope tiene el usuario

let productos = [
    { id: 1, nombre: "Producto 1", precio: 10.99 },
    { id: 2, nombre: "Producto 2", precio: 17.99 },
    { id: 3, nombre: "Producto 3", precio: 5.99 }
];

//Enrutamiento
router.get("/",requiredScopes("read:productos"),(req, res, next) =>{
    try {
        res.json(productos);
    } catch (err) {
        next(err);
    }
    
});

router.get("/:id",requiredScopes("read:productos"), (req,res, next)=>{
    try {
        const id = parseInt(req.params.id);
        let producto = productos.find((p)=> p.id===id);

        if(!producto){
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }
    
        res.json(producto);
    
    } catch (err) {
        next(err);
    }
});
router.post("/",requiredScopes("write:productos"),(req,res,next) =>{
    try {
        const {nombre, precio} = req.body;
        let nuevoProducto = {
            id: productos.length+1,
            nombre,
            precio
        }
        productos.push(nuevoProducto);
        res.status(201).json(nuevoProducto); 
    } catch (err) {
        next(err);
    }
    
});
router.put("/:id",requiredScopes("write:productos"),(req,res,next)=>{
    try {
        const id = parseInt(req.params.id);
        const {nombre, precio} = req.body;
        let producto = productos.find( (p) => p.id===id);

        if(!producto){
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }
        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;

        res.status(201).json(producto); 
    
    } catch (err) {
        next(err);
    }
    

});
router.delete("/:id",requiredScopes("write:productos"), (req, res,next)=>{
    try {
        const id = parseInt(req.params.id);
        const index = productos.findIndex( (p) => p.id===id);
        if (index===-1) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        } 
        const prodcutoEliminado = productos.splice(index,1);
        res.json(prodcutoEliminado[0]);
        
    } catch (err) {
        next(err);
    }
    
});

module.exports = router;