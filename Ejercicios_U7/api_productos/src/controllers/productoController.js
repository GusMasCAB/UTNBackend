const Producto = require("../models/producto");
//Enrutamiento
exports.getAllProductos = async(req, res, next) =>{
    try {
        const productos = await Producto.find({});
        res.status(200).json(productos);
    } catch (err) {
        res.status(500).json({error: "Error al obtener los productos"});
    }
};

exports.getProductoById = async (req,res, next)=>{
    try {
        const producto = await Producto.findById(req.params.id);

        if(!producto){
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }
    
        res.json(producto);
    
    } catch (err) {
        next(err);
    }
};
exports.createProducto = async (req,res,next) =>{
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json(producto); 
    } catch (err) {
        res.status(500).json({error: "Error al crear un producto"});
    }
    
};

exports.updateProductoById= async (req,res,next)=>{
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id,req.body,{new: true});

        if(!producto){
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }

        res.status(201).json(producto); 
    
    } catch (err) {
        next(err);
    }
    

};
exports.deleteProductoById = async (req, res,next)=>{
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        } 
        res.status(200).json(productoEliminado);
        
    } catch (err) {
        next(err);
    }   
};