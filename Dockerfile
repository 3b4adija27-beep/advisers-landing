FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY soluciones.html privacidad.html en.html qu.html /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 80
