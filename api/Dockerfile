FROM php:8.0-fpm

# Set working directory
WORKDIR /var/www

# Add docker php ext repo
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# Install php extensions
RUN chmod +x /usr/local/bin/install-php-extensions && sync && install-php-extensions pdo_mysql zip exif pcntl gd memcached

# Install composer
RUN echo "\e[1;33mInstall COMPOSER\e[0m"
RUN cd /tmp \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

RUN docker-php-ext-install pdo pdo_mysql

RUN apt-get update

# Install useful tools
RUN apt-get -y install apt-utils nano wget dialog vim

# Install important libraries
RUN echo "\e[1;33mInstall important libraries\e[0m"
RUN apt-get -y install --fix-missing \
    apt-utils \
    build-essential \
    git \
    curl \
    libcurl4 \
    libcurl4-openssl-dev \
    zlib1g-dev \
    libzip-dev \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    git \
    libbz2-dev \
    locales \
    libmcrypt-dev \
    lua-zlib-dev \
    libicu-dev \
    libonig-dev \
    nano \
    nginx \
    libxml2-dev

# Install supervisor
RUN apt-get install -y supervisor

COPY php.ini /usr/local/etc/php/conf.d/app.ini
COPY nginx.conf /etc/nginx/sites-enabled/default
COPY supervisor.conf /etc/supervisord.conf

COPY ./app ./

# Install dependencies
RUN composer install

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

# PHP Error Log Files
RUN mkdir /var/log/php
RUN touch /var/log/php/errors.log && chmod 777 /var/log/php/errors.log

EXPOSE 80