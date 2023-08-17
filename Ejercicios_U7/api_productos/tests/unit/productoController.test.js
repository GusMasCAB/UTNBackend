
//Se exporta solo los controladores (funciones de los metodos htttp) y no las rutas 
//para hacer pruebas especificas a las funciones
//Esta línea importa la función getAllProductos desde el módulo productoController
const {getAllProductos,createProducto}= require("../../src/controllers/productoController");

//mockups
const productoModel = require("../../src/models/producto");
//Un mock es una simulación de un módulo o componente real. En este caso simular la base de datos
jest.mock("../../src/models/producto");
/*en resumen, const productoModel = require("../../src/models/producto"); importa el módulo real, mientras que 
jest.mock("../../src/models/producto"); crea un mock de ese mismo módulo para simular su comportamiento en las pruebas.
Ahora productoModel es un mock controlado por jest*/

//describe("Producto controller", () => { ... });: Esto define un bloque describe que agrupa todas 
//las pruebas relacionadas con el controlador de productos. 
describe("Producto controller", ()=>{
    afterEach(()=>{ //despues de cada prueba
       jest.clearAllMocks();//limpiamos todos los mockups es decir los datos ficticios
    });
    //definimos una prueba unitaria
    test("getAllProductos deberia obtener los productos",async ()=>{
        const mockProductos = [
            {name: "Producto 1", precio: 10},//Se define un array de objetos ficticios que representan productos simulaados.
            {name: "Producto 2", precio: 18} //Estos datos se utilizarán como respuesta simulada del modelo de producto.
        ];
    //mockResolvedValue metodo que permite configurar un valor resuelto para una promesa simulada
    /**en resumen, la línea de código productoModel.find.mockResolvedValue(mockProductos); establece que 
     * cuando se llame a la función find del mock productoModel, en lugar de realizar una consulta a una 
     * base de datos real, se resolverá con el valor mockProductos, que contiene datos ficticios predefinidos. 
     */ 
                        //valor resuelto simulado
        productoModel.find.mockResolvedValue(mockProductos);
        const req = {}; //se simulan tanto la peticion y como la respuesta
        const res = {
            status: jest.fn().mockReturnThis(), //jest.fn() simulamos status
            json: jest.fn(),                    // simula json
        };
        //: Aquí se llama a la función getAllProductos con los objetos simulados req y res
        await getAllProductos(req,res);

        //Se verifica que la función status del objeto de respuesta res haya sido llamada con el código de estado HTTP 200.
        expect(res.status).toHaveBeenCalledWith(200);
        // Se verifica que la función json del objeto de respuesta res haya sido llamada con los datos simulados mockProductos.
        expect(res.json).toHaveBeenCalledWith(mockProductos);
        //se verifica que la funcion find del modelo d producto haya sido llamada exactactamente una vez
        expect(productoModel.find).toHaveBeenCalledTimes(1);
    }); 

    test("getAllProductos deberia manejar errores",async ()=>{
        const errorMessage = "Error al obtener los productos";
        
        //Decimos que hacer caundo el metodo find rechaza
        productoModel.find.mockRejectedValue(new Error(errorMessage));
        const req = {}; //se simulan tanto la peticion y como la respuesta
        const res = {
            status: jest.fn().mockReturnThis(), //jest.fn() simulamos status
            json: jest.fn(),                    // simula json
        };
        //: Aquí se llama a la función getAllProductos con los objetos simulados req y res
        await getAllProductos(req,res);

        //Se verifica que la función status del objeto de respuesta res haya sido llamada con el código de estado HTTP 200.
        expect(res.status).toHaveBeenCalledWith(500);
        // Se verifica que la función json del objeto de respuesta res haya sido llamada con los datos simulados mockProductos.
        expect(res.json).toHaveBeenCalledWith({error: errorMessage});
        //se verifica que la funcion find del modelo d producto haya sido llamada exactactamente una vez
        expect(productoModel.find).toHaveBeenCalledTimes(1);
    }); 
    test("createProductos deberia crear un nuevo producto",async ()=>{
        const mockProductoData = {name: "Nuevo Producto", precio: 15};//simulamos que creamos un producto
        const mockSavedProducto = {_id: '1', ...mockProductoData};//simulamos que se actualizo
        
        //Decimos que hacer caundo el metodo find se ejecuta bien
        productoModel.create.mockResolvedValue(mockSavedProducto);
        const req = {body: mockProductoData}; //se simulan tanto la peticion y como la respuesta
        const res = {
            status: jest.fn().mockReturnThis(), //jest.fn() simulamos status
            json: jest.fn(),                    // simula json
        };
        //jest.fn() crea un "espía" de la función json() de la respuesta (res). Jest rastreará todas las llamadas a res.json()
        // y los argumentos con los que se llamó. Luego, puedes usar expect para verificar si se llamó con los argumentos correctos.
        //mockReturnThis() devuelve la instancia actual (this), que en este caso es el propio objeto res.

        //: Aquí se llama a la función getAllProductos con los objetos simulados req y res
        await createProducto(req,res);

        //Se verifica que la función status del objeto de respuesta res haya sido llamada con el código de estado HTTP 200.
        expect(res.status).toHaveBeenCalledWith(201); //toHaveBeenCalledWith es tiene que haber sido llamado con
        // Se verifica que la función json del objeto de respuesta res haya sido llamada con los datos simulados mockProductos.
        expect(res.json).toHaveBeenCalledWith(mockSavedProducto);
        //se verifica que la funcion find del modelo d producto haya sido llamada exactactamente una vez
        expect(productoModel.create).toHaveBeenCalledTimes(1);
        expect(productoModel.create).toHaveBeenCalledWith(mockProductoData);
    }); 
    
});