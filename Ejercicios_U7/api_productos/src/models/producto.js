const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/productos", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const productoSchema = new mongoose.Schema({
    descripcion: String,
    precio: Number
},{collection: "Productos"});

const Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;
