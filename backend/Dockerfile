# Usa la imagen base para el backend (Node.js)
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

# Instala Nginx
RUN apk add --no-cache nginx

# Copia la configuración de Nginx al contenedor
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copia los certificados SSL (si tienes HTTPS habilitado)
COPY ./path/to/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY ./path/to/privkey.pem /etc/nginx/certs/privkey.pem

# Exponer puertos para el backend y Nginx
EXPOSE 80 443 3000

# Inicia tanto el servidor backend como Nginx
CMD sh -c "nginx && sh ./wait-for-it.sh db:3306 -- node server.js"
