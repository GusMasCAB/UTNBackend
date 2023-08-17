    const request = require("supertest");
    const app = require("../../src/app");
    const libroModel = require("../../src/models/libroModel");

    //simulamos la autenticacion
    jest.mock("express-oauth2-jwt-bearer", () => {
        return {
            auth: jest.fn().mockImplementation(() => (req, res, next) => next()),
            requiredScopes: jest.fn().mockImplementation(() => (req, res, next) => next()),
        };
    });

    //Mockup de Mongoose: simulamos la base de datos
    jest.mock("../../src/models/libroModel");

    test("Get deberia obtener todos los libros", async () => {
        const libros = [ 
            { id: "1", titulo: "libro1" },
            { id: "2", titulo: "libro2" },
        ];

        libroModel.find.mockResolvedValue(libros);

        const res = await request(app).get("/api/libros");
        expect(res.status).toBe(200);
        expect(res.body).toEqual(libros);
        expect(libroModel.find).toHaveBeenCalledTimes(1);
    });

    test("Get deberia obtener un libro especifico", async () => {
        const mockLibro =  { id: "1", titulo: "libro1" };

        libroModel.findById.mockResolvedValue(mockLibro);

        const res = await request(app).get("/api/libros/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockLibro);
    });
    test("Post deberia crear un nuevo libro", async () => {
        const libroCreado = {id: "1", titulo: "titulo 1", autor: "autor 1"};
        const mockLibro = {
            ...libroCreado,
            save: () => {}
        };
            
        libroModel.create.mockResolvedValue(mockLibro);
        
        const res = await request(app).post("/api/libros").send(mockLibro);
        expect(res.status).toBe(201);
        expect(res.body).toEqual(libroCreado);
    });

    test("Put deberia modificar un libro especifico", async () => {
        const mockLibro = {id: "1", titulo: "titulo 1", autor: "autor 1"};
        libroModel.findByIdAndUpdate.mockResolvedValue(mockLibro);
        
        const res = await request(app).put("/api/libros/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockLibro);
    });