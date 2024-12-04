# Dockerfile para el backend
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json (si existe)
COPY package.json ./
RUN npm install

# Copia el script wait-for-it.sh al contenedor
COPY wait-for-it.sh ./  

# Asegúrate de que el script sea ejecutable
RUN chmod +x wait-for-it.sh

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la aplicación, usando wait-for-it.sh
CMD ["sh", "./wait-for-it.sh", "db:3306", "--", "node", "server.js"]