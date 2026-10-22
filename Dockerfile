FROM nginx:alpine

# Copia os arquivos estáticos do site da Arcanjosa para o diretório padrão do Nginx
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY app.js /usr/share/nginx/html/app.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
