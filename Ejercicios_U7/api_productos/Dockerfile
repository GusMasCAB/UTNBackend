
#La instrucción FROM en un Dockerfile se utiliza para especificar la imagen base a partir 
#de la cual construirás tu imagen personalizada.
#imagen:imagen base que deseas utilizar. etiqueta: versión específica de la imagen.
#FROM imagen:etiqueta
FROM node:18.16

#Establece el directorio de trabajo dentro del contenedor donde se copiarán y ejecutarán 
#los archivos de tu aplicación. Para aplicarle a este cualquier instrucción ADD, COPY, CMD, 
#ENTRYPOINT o RUN subsiguiente que le siga en el Dockerfile.
#Directorio de trabajo dentro del contenedor
WORKDIR /app

#Copiar los archivos de la API a la imagen
#copiamos las dependencias
COPY package.json ./ 
#copiamos todos los archivos
COPY . .

#Instalamos las dependencias de la API
RUN npm install

#Puerto en el que la API escuhara dentro del contenedor
EXPOSE 3000

#Comando para iniciar la API
CMD ["npm","start"]