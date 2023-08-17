//Control de errores en este caso se utilixa el middleware errorHandler
const errorHandler = (err,req,res,next)=>{
    console.error(err);
    res
        .status(err.status || 500)
        .json({error: err.message || "Error en el servidor" });
};

module.exports = errorHandler;
/*res: Es el objeto de respuesta (response) que se envía al cliente desde el servidor.

.status(err.status || 500): Este método establece el código de estado HTTP que se enviará en la respuesta. 
En este caso, utiliza el valor err.status si está definido en el objeto de error (err), de lo contrario, 
establece el código de estado en 500, que es el código estándar para "Error interno del servidor".

.json({error: err.message || "Error en el servidor" }): Este método envía una respuesta en formato JSON al 
cliente. En este caso, está creando un objeto JSON con una propiedad "error". Si el objeto de error (err) 
tiene una propiedad message definida, utiliza ese mensaje de error en la respuesta JSON. 
De lo contrario, si no se proporciona un mensaje de error específico en err.message, se envía el mensaje 
"Error en el servidor" como valor predeterminado.

 console.error(err); imprimirá el mensaje de error en la consola del servidor para que los desarrolladores 
 puedan diagnosticar y solucionar problemas en la aplicación.
*/