# Usar una imagen base de Node.js
FROM node:14-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package*.json ./
RUN npm install

# Copia el script wait-for-it.sh al contenedor
COPY wait-for-it.sh ./  

# Asegúrate de que el script sea ejecutable
RUN chmod +x wait-for-it.sh

# Instalar Nginx
RUN apk add --no-cache nginx

# Copiar la configuración de Nginx al contenedor
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copia los certificados SSL al contenedor
COPY ./path/to/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY ./path/to/privkey.pem /etc/nginx/certs/privkey.pem

# Copiar los archivos de frontend (ajusta la ruta según sea necesario)
COPY ./frontend /app/frontend

# Exponer puertos para Nginx y backend
EXPOSE 80 443 3000

# Inicia tanto el servidor backend como Nginx
CMD sh -c "nginx && sh ./wait-for-it.sh db:3306 -- node server.js"

