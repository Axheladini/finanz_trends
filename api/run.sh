#!/bin/sh

groupadd -g 1000 www
useradd -u 1000 -ms /bin/bash -g www www

chown www:www-data /var/www/storage
chmod -R g+s /var/www/storage
chown www:www-data /var/www

cd /var/www

composer install --optimize-autoloader --no-dev

# php artisan migrate:fresh --seed
php artisan cache:clear
php artisan route:cache

/usr/bin/supervisord -c /etc/supervisord.conf