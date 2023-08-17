//Improtamos la libreria mongoose
const mongoose = require("mongoose");

//Nos conectamos a la base de datos empresa del motor de base de datos localhost
//Con respecto a los dos use es para habilitar algunas opciones recomendadas
mongoose.connect("mongodb://127.0.0.1:27017/empresa",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//Definimos el esquema y modelo de la tabla clientes
//new mongoose.Schema({ ... }): se crea una instancia de un objeto Schema utilizando la biblioteca Mongoose y
//se almacena en clienteSchema. Un esquema en Mongoose define la estructura de los documentos que se 
//almacenarán en la base de datos. En este caso, el esquema tiene tres campos: nombre, edad y email.
const clienteSchema = new mongoose.Schema({
    nombre: String,
    edad:  Number,
    email: String, 
});

//const Cliente:esta constante almacenará el modelo que se creará. Un modelo en Mongoose es una representación 
//de una colección en la base de datos, y te permitirá realizar diversas operaciones con los documentos en esa colección.
//mongoose.model("Cliente", clienteSchema): Esta parte del código crea el modelo "Cliente" en base al esquema clienteSchema.
//"Cliente": Este es el nombre que le estás dando al modelo. 

const Cliente = mongoose.model("Cliente",clienteSchema);

//se crea una nueva instancia del modelo "Cliente" utilizando la clase constructora proporcionada por Mongoose. 
//Esto crea un objeto que sigue la estructura definida en el esquema clienteSchema
const nuevoCliente = new Cliente({
    nombre: "Martin",
    edad: 21,
    email: "martinmasera@gmail.com"
});

//const result = nuevoCliente.save():el método .save() guarda el documento representado por nuevoCliente 
//en la base de datos en la colección "clientes". Donde save devuelve una promesa.
//.then():si la promesa se resuelve exitosamente,es decir, si .save() se realiza con éxito imprime se ejecuta then().
//.catch()Si la promesa no tiene exito es decir, ocurre algún error durante la operación .save(), se ejecuta catch() 

const result = nuevoCliente
    .save()
    .then(() =>{
      console.log("Cliente guardado correctamente");  
    })
    .catch((err)=>{  //aclarar este catch es de mongoose
       console.log(err); 
    });

    //Recupera y muestra todos los clientes
    /*Cliente.find({}): método que se utiliza para buscar documentos en la colección asociada al modelo "Cliente". 
    En este caso, se pasa un objeto vacío {} como argumento, lo que significa que se seleccionarán todos los documentos en la colección.

    Estructura de manejo de promesas
    .then((clientes) Cuando el metodo Cliente.find({}) se resuelve con éxito, el método .then() se ejecuta y 
    recibe un parámetro clientes, que es un array que contiene los documentos recuperados de la base de datos.
    .catch((err) Si ocurre algún error durante la operación Cliente.find({}), el método .catch() se ejecutará 
    y recibirá un parámetro err, que contiene información sobre el error.*/

    Cliente.find({})
        .then((clientes)=>{
            console.log("Clientes encontrados",clientes);
        })
        .catch((err)=>{
            console.error("Error al recuperar a los clientes",err);
        });

//Actualizar un cliente existente
//updateOne() recibe dos argumentos el primero se especifica los criterios de seleccion y el segundo
//argumento es un objeto que contiene los campos y los valores que se desean actualizar
Cliente.updateOne({nombre: "Juan"},{edad: 40} )
        .then(()=>{
            console.log("Cliente actualizado correctamente");
        })
        .catch((err)=>{
            console.log("Error al actualizar el cliente",err);
        });

//Eliminar un cliente
Cliente.deleteOne({nombre: "Juan"})
        .then(()=>{
            console.log("Cliente eliminado correctamente");
        })
        .catch((err)=>{
            console.log("Error al eliminar el cliente",err);
        });