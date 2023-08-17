const libroController = require("../../src/controllers/libroController");

const libroModel = require("../../src/models/libroModel");
jest.mock("../../src/models/libroModel");

describe("Libro Controller", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    });

    test("getAllLibros deberia devolver todos los libros", async()=>{
        
        const mockLibros = [
            {id: "1", titulo: "Libro 1", autor: "Autor 1"},
            {id: "2", titulo: "Libro 2", autor: "Autor 2"}
        ];

        libroModel.find.mockResolvedValue(mockLibros);
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn()};
        await libroController.getAllLibros(req,res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockLibros);
    });

    test("getLibroById deberia devolver el libro indicado", async()=>{

        const mockLibro = {id: "1", titulo: "titulo 1", autor: "autor 1"};
        libroModel.findById.mockResolvedValue(mockLibro);
        const req = {params: {id: "1"}};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn()};
        await libroController.getLibroById(req,res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockLibro);
    });

    test("createLibro deberia crear un libro nuevo", async()=>{

        const mockLibro = {titulo: "titulo 1", autor: "autor 1"};

        libroModel.create.mockResolvedValue(mockLibro);
        mockLibro.save = () => {};//esto es necesario porque la funcion tiene este metodo
        const req = {body: mockLibro};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn()};
        await libroController.createLibro(req,res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockLibro);
    });
   
    test("updateLibro deberia actualizar un libro elegido", async()=>{
        
        const mockBody = {titulo: "Titulo 1", autor: "autor 1"};
        const mockActualizado = {id: "1", mockBody}
        libroModel.findByIdAndUpdate.mockResolvedValue(mockActualizado);
        const req = {params:{id: "1"}, body: mockBody };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        await libroController.updateLibro(req,res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockActualizado);
    });

    test("deleteLibro deberia eliminar un libro especifico", async()=>{
        
        const mockEliminado = {id: "1", titulo: "Titulo 1", autor: "autor 1"};
        libroModel.findByIdAndRemove.mockResolvedValue(mockEliminado);
        const req = {params:{id: "1"}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        await libroController.deleteLibro(req,res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockEliminado);
    });
});