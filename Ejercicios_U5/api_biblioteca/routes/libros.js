const express = require("express");
const router = express.Router();
const Libro = require("../models/libro");
const Joi = require("joi");
const libroSchema = Joi.object({
    titulo: Joi.string().required().label("Titulo"),
    autor: Joi.string().required().label("Autor")
});
//a. GET /libros: Devuelve la lista completa de libros.
router.get("/", async (req,res,next)=>{
    try {
        const libros = await Libro.find({});
        if (libros.length === 0) {
            const error = new Error("Error al encontrar libros");
            error.status=404;
            throw error;
        }
        res.status(200).json(libros);
    } catch (error) {
        next(error);
    }
});
//b. GET /libros/:id: Devuelve los detalles de un libro específico según su ID.
router.get("/:id", async (req,res,next)=>{
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) {
            throw Object.assign(new Error("Error al encontrar el libro"), { status: 404 });
        }
        res.status(200).json(libro);
    } catch (error) {
        next(error);
    }
});
//c. POST /libros: Crea un nuevo libro con la información proporcionada.
router.post("/", async(req,res,next)=>{
    try {
        const {error,value} = libroSchema.validate(req.body);
        if (error) {
            throw Object.assign(new Error("Error de validacion de datos"), { status: 400 });
        }
        const nuevoLibro = new Libro(value);
        await nuevoLibro.save();
        res.status(201).json(nuevoLibro);
    } catch (error) {
        next(error);
    }
});
//d. PUT /libros/:id: Actualiza la información de un libro específico según su ID.
router.put("/:id",async(req,res,next)=>{
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body,{new: true});
        res.status(200).json(libro);
    } catch (error) {
        next(error);
    }
});
//e. DELETE /libros/:id: Elimina un libro específico según su ID
router.delete("/:id",async(req,res,next)=>{
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.status(200).json("Libro eliminado con exito");
    } catch (error) {
        next(error);
    }
});
module.exports = router;