const readLine = require("readline-sync");
const Adivinanza = require("./adivinanza");

let numAleatorio;
let numUsuario;
let aux;

while(readLine.question(Adivinanza.menu())!=2){
    numAleatorio = Adivinanza.generarNumero();
    console.log(numAleatorio);
    let intentos = 10;
    do {
        numUsuario = readLine.question("Ingrese un numero: ");
        intentos--;
        console.log(`Intentos: ${intentos}`);
        aux = Adivinanza.verificarNumeros(numAleatorio,numUsuario);
    } while (aux!=1 && intentos!=0);
};