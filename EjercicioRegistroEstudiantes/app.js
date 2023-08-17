/*1. Permitir al usuario ingresar la cantidad de estudiantes que desea registrar.
2. Solicitar al usuario que ingrese los nombres y edades de los estudiantes.
3. Almacenar la información de cada estudiante en un objeto con las propiedades 
nombre y edad.
4. Guardar cada objeto del estudiante en un array.
5. Mostrar en pantalla la lista de estudiantes registrados, mostrando el nombre y la 
 edad de cada uno*/
 const ReadLine = require("readline-sync");

 const registrarEstudiantes = () => {
   console.log("Iniciando registro de estudiantes");
 
   let cantEstudiantes = ReadLine.question(
     "Ingresar la cantidad de estudiantes a registrar: "
   );
 
   console.log("Cantidad de estudiantes a registrar:" + cantEstudiantes);
 
   let estudiantes = []; //definimos el arreglo de estudiantes
   for (let i = 0; i < cantEstudiantes; i++) {
     let nombreE = ReadLine.question(
       "Ingrese el nombre del estudiante" + i + ": "
     );
     let edadE = ReadLine.question("Ingrese la edad: ");
 
     console.log("Nombre: " + nombreE);
     console.log("Edad: " + edadE);
 
     let estudiante = {
       nombre: nombreE,
       edad: edadE,
     };
     estudiantes.push(estudiante); //push me permite agregar  un elemento al arreglo
   }
 
   return estudiantes;
 };
 
 let estudiantes = registrarEstudiantes();
 
 for (let aux in estudiantes) {
   console.log("Nombre:" + estudiantes[aux].nombre);
   console.log("Edad:" + estudiantes[aux].edad);
 }