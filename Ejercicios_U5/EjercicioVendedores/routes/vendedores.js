const express = require("express");
const router = express.Router();
const Vendedor = require("../models/vendedor");

//Ruta para obtener todos los vendedores
router.get("/", async (req,res)=>{
    try {
        const vendedores = await Vendedor.find({});
        res.status(200).json(vendedores);
    } catch (error) {
        res.status(500).json({error: "Error al obtener los vendedores" });
    }
});

//c. Crea un nuevo vendedor
router.post("/", async (req,res)=>{
    try {
        const vendedor = new Vendedor(req.body);
        await vendedor.save();
        res.status(200).json(vendedor);
    } catch (error) {
        res.status(500).json({error: "Error al crear el vendedor"});
    }
});

//Actualizar un registro existente
router.put("/:id", async (req,res)=>{
    try {
        const vendedor = await Vendedor.findByIdAndUpdate(req.params.id,req.body,{
            new: true,//Esta opción le indica a Mongoose que debe retornar el documento actualizado 
                      //después de la actualización. false: devolverá el documento antes de la actualización.
        });
        res.json(vendedor);
    } catch (error) {
        res.status(500).json({error: "Error al actualizar el vendedor"});
    }
});
//e. DELETE /libros/:id: Elimina un libro específico según su ID.
router.delete("/:id", async (req,res)=>{
    try {
        await Vendedor.findByIdAndDelete(req.params.id);
        res.json({message: "Vendedor eliminado correctamente"});
    } catch (error) {
        res.status(500).json({error: "Error al eliminar el vendedor"});
    }
});

module.exports = router;