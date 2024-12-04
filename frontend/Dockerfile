# Dockerfile para el frontend
FROM nginx:alpine

# Copiar los archivos del frontend (HTML, CSS, JS) a la carpeta donde Nginx los sirve
COPY . /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx a la ubicación de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
