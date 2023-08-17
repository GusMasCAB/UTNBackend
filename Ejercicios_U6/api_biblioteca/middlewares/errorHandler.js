const errorHandler = (err,req,res,next)=>{
    res
        .status(err.status || 500)
        json({error: err.message || "Error del servidor",
                code: err.code || "Internal_error"});
};

module.exports = errorHandler; 