const request = require("supertest");
const app = require("../../src/app");

test("Obtener lista completa", async()=>{
    //request(app): Esto crea un objeto que representa la aplicación Express, que luego puedes usar 
    //para realizar solicitudes HTTP simuladas a las rutas de tu aplicación.
    const response = await request(app).get("/productos");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);

});

test("Crear un nuevo producto", async()=>{
    const nuevoProducto = {nombre: "Producto 1", precio: 18};

    const response = await request(app)
        .post("/productos")
        .send(nuevoProducto);

    expect(response.statusCode).toBe(201);
    expect(response.body.nombre).toBe("Producto 1");
});