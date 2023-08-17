const mongoose = require("mongoose");

//Conectamos a la base de datos
mongoose.connect("mongodb://127.0.0.1:27017/Bibloteca",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//El esquema representa la estructura de los documentos
const librosSchema = new mongoose.Schema({
    titulo: String,
    autor: String
},{collection:"Libros"});

const Libro = mongoose.model("Libro",librosSchema);

module.exports = Libro;
