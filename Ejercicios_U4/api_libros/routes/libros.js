const express = require("express");
const router = express.Router();
const libros = require('../datos/data');
const Joi = require("joi");
const libroSchema = Joi.object({
    titulo: Joi.string().required().label("Titulo"),
    autor: Joi.string().required().label("Autor")
});
/*La función label se utiliza para proporcionar una etiqueta descriptiva más amigable que se usará 
en los mensajes de error generados por Joi si la validación falla. Por ejemplo, si no se proporciona 
un título para un libro, en lugar de mostrar un mensaje genérico como "El campo es requerido", 
mostraría un mensaje más descriptivo como "El campo Título es requerido".*/ 
//a. GET /libros: Devuelve la lista completa de libros.
router.get("/",(req,res,next)=>{
    try {
        res.status(200).json(libros);
    } catch (err) {
        next(err);
    }
});

//b. GET /libros/:id: Devuelve los detalles de un libro específico según su ID.
router.get("/:id",(req,res,next)=>{
    try {
        const id = parseInt(req.params.id);
        const libro = libros.find((lib) => lib.id == id);

        if (!libro) {
            const error = new Error("Libro no encontrado");
            error.status = 404;
            throw error;
        }
        res.status(200).json(libro);
    } catch (err) {
        next(err);
    }
});

//c. POST /libros: Crea un nuevo libro con la información proporcionada.
router.post("/",(req,res,next)=>{
    try {
        const {error, value} = libroSchema.validate(req.body);

        if(error){
            const errorValidacion = new Error("Error de validacion de los datos");
            errorValidacion.status = 400;
            validationError.details = error.details.map(detail =>
                detail.message);
            throw errorValidacion;
        };
        const {titulo, autor} = value;
        const libro = {
            id: libros.length+1,
            titulo,
            autor
        }
        libros.push(libro);
        res.status(201).json(libro);
    } catch (err) {
        next(err);
    }
});
//d. PUT /libros/:id: Actualiza la información de un libro específico según su ID.
router.put("/:id",(req,res,next)=>{
    try {
        const id = parseInt(req.params.id);
        const {error, value} = libroSchema.validate(req.body);

        if(error){
            const errorValidacion = new Error("Error de validacion de los datos");
            errorValidacion.status = 400;
            validationError.details = error.details.map(detail =>
                detail.message);
            throw errorValidacion;
        };
        const{titulo, autor} = value;
        const libro = libros.find((lib)=>lib.id==id);
        if (!libro) {
            const error = new Error("Libro no encontrado");
            error.status = 404;
            throw error;
        }
        libro.titulo = titulo || libro.titulo;
        libro.autor= autor || libro.autor
        //En javascript se modifica tambien el libro del array porque lo toma como referencia en memoria
        res.status(200).json(libro);

    } catch (err) {
        next(err);
    }
});
//e. DELETE /libros/:id: Elimina un libro específico según su ID.
router.delete("/:id",(req,res,next)=>{
    try {
        const indice = libros.findIndex((lib)=>lib.id==parseInt(req.params.id));

        if(indice===-1){
            const error = new Error("Libro no encotrado");
            error.status = 404;
            throw error;
        }
        res.status(200).json(libros[indice]);
        libros.splice(indice,1);

    } catch (err) {
        next(err);
    }
});

module.exports = router;