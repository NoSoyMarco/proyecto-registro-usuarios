FROM nginx:latest

# Copia la configuración de Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copia los archivos del frontend a la carpeta correspondiente en Nginx
COPY ./ /usr/share/nginx/html/

# Expón los puertos
EXPOSE 80 443
