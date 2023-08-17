const express = require('express');
const router = express.Router();

//Datos de ejemplos simulando una base de datos
let productos = [
    { id: 1, nombre: "Producto 1", precio: 10.99 },
    { id: 2, nombre: "Producto 2", precio: 17.99 },
    { id: 3, nombre: "Producto 3", precio: 5.99 }
];

//Enrutamiento
router.get("/",(req, res, next) =>{
    try {
        res.json(productos);
    } catch (err) {
        next(err);
    }
    
});

router.get("/:id", (req,res, next)=>{
    try {
        const id = parseInt(req.params.id);
        let producto = productos.find((p)=> p.id===id);
    /**El método find() se utiliza para buscar un elemento en el arreglo. Le pasamos una
     * funcion que se va a llamar una vez por cada producto y recibe como arhumento cada prodcuto.
     * Si la función encuentra un elemento que cumple con la condición, entonces find() devolverá ese elemento 
     * y lo asignará a la variable producto 
      */

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
router.post("/",(req,res,next) =>{
    try {
        const {nombre, precio} = req.body;
        let nuevoProducto = {
            id: productos.length+1,
            nombre, //si la variable tiene el mismo nombre que la propiedad no hace falta ponerlo 2 veces
            precio
        }
        productos.push(nuevoProducto);
        res.status(201).json(nuevoProducto); 
        //201 el producto se creo correctamente
    } catch (err) {
        next(err);
    }
    
});
router.put("/:id",(req,res,next)=>{
    try {
        const id = parseInt(req.params.id);
        const {nombre, precio} = req.body;
        let producto = productos.find( (p) => p.id===id);

        if(!producto){
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }
        /**La línea de código producto.nombre = nombre || producto.nombre; 
         * es un ejemplo de cómo se puede actualizar una propiedad de un objeto en JavaScript 
         * utilizando un valor nuevo si está disponible, o manteniendo el valor existente si el 
         * nuevo valor es falso o no está definido. */
        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;

        res.status(201).json(producto); 
    
    } catch (err) {
        next(err);
    }
    

});
router.delete("/:id", (req, res,next)=>{
    try {
        const id = parseInt(req.params.id);
        const index = productos.findIndex( (p) => p.id===id);
        if (index===-1) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        } 
        const prodcutoEliminado = productos.splice(index,1);
        /**: El segundo argumento de splice() es el número de elementos que 
         * se eliminarán a partir de la posición index */
        res.json(prodcutoEliminado[0]);
        
    } catch (err) {
        next(err);
    }
    
});

module.exports = router;