//importamos la funcion que quiero probar
const sumar = require("./sumar");

      //descripcion de la prueba
test('sumar devuelve la suma correcta de dos números', () => {
    const a = 2;
    const b = 3;
    const resultadoEsperado = 5;
    const resultado = sumar(a, b);
      //aserciones con expect, son verificaciones si devuelve lo esperado
    expect(resultado).toBe(resultadoEsperado);
                  //debe ser
});
//Estos son pruebas unitarias