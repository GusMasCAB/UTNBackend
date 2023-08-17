//El errorHandler lo que hace es administrar de una mejor forma las respuestas de errores
// de express
const errorHandler = (err,req,res,next)=>{
    res
        .status(err.status || 500)
        .json({error: err.message || "Error interno del servidor",
                code: err.code || "Internal_error"});
};

module.exports = errorHandler; 