/**
 * Esta función genera números aleatorios entre 1 y 100
 * @returns {number} retorna números
 */
const generarNumero = () =>{
    return Math.floor(Math.random()*100+1);
}

/**
 * 
 * 
 */
const verificarNumeros = (numSecreto,numIngresado) =>{
    if (numIngresado>numSecreto) {
        console.log("El numero secreto es menor");
        return 0;
    } else if(numIngresado<numSecreto){
        console.log("El numero secreto es mayor");
        return 0;
    } else {
        console.log("¡Adivinaste. Ganaste el juego!");
        return 1;      
    }
} 

const menu = ()=>{
    return `---------------Menu---------------
1.Nuevo Juego
2.Salir del Juego
----------------------------------`;
}
module.exports = {generarNumero,verificarNumeros,menu};