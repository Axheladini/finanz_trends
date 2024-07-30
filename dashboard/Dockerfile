FROM nginx:1.19.0-alpine

USER root

RUN apk update

RUN apk add --update nghttp2-dev nodejs npm unzip sudo nano openrc tcpflow

RUN sudo chown -R nginx:nginx /usr/share/nginx/html;
RUN sudo chmod -R 755 /usr/share/nginx/html;

#WORKDIR /usr/share/nginx/html

#RUN rm -rf *

#COPY ./public/package.json ./
#COPY ./public/package-lock.json ./
#COPY ./public/webpack.config.js ./

#RUN npm cache clear --force
#RUN npm install npm

#COPY ./public/dist/ ./dist/
#COPY ./public/js/ ./js/
#COPY ./public/media/ ./media/
#COPY ./public/src/ ./src/
#COPY ./public/index.html ./

#RUN npm run build

WORKDIR /etc/nginx/conf.d

RUN rm default.conf 

COPY default.conf default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]