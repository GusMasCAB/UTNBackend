// Importamos la libreria Chance y la guardamos en la constante
const Chance = require('chance');

//Creamos una insatncia de Chance a partir de la constante que tiene la libreria guardada
const chance = new Chance();

//Generamos datos aleatorios gracias a Chance
const nombre = chance.name();
const edad = chance.age();
const email = chance.email();

//Mostramos los datos por consola
console.log(`|Nombre: ${nombre} |Edad: ${edad} |Email: ${email}`);

const Operacion = require('./calculadora');
let suma = Operacion.sumar(2,2);
let multi = Operacion.multiplicar(2,2);
let div = Operacion.dividir(2,2);
let resta = Operacion.restar(2,2);
console.log("Suma:",suma);
console.log("Resta:",resta);
console.log("Multiplicacion:",multi);
console.log("Division:",div);
