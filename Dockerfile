FROM nginx:latest
COPY build/ /usr/share/nginx/html
COPY conf.d/ /etc/nginx/conf.d