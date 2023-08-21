const axios=require('axios');
const url = 'http://localhost:3000/productos';

const obtenerProductos = async ()=>{
    try {
        const respuesta = await axios.get(url);
        if (respuesta.status===200) {
            console.log("Productos obtenidos correctamente");
            console.log("Productos: ",respuesta.data);
        }else{
            console.log("Error al obtener los productos:", respuesta.status);
        }
    } catch (error) {
        console.log("Error al obtener los productos:", error);
    }
}

const agregarProducto = async ()=>{
    const nuevoProducto = {
        nombre: "Producto nuevo",
        precio: 1000
    }
    try {
        const respuesta = await axios.post(url, nuevoProducto);
        if (respuesta.status===201) {
            console.log("Producto agregado correctamente");
            console.log("Producto: ",respuesta.data);
        }else{
            console.log("Error al agregar el producto:", respuesta.status);
        }
    } catch (error) {
        console.log("Error al agregar el producto:", error);
    }
    
}
agregarProducto();
obtenerProductos();

