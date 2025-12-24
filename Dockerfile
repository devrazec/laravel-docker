FROM php:8.2-apache

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip sqlite3 libsqlite3-dev \
    libpng-dev libonig-dev libxml2-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

RUN docker-php-ext-install pdo pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd

# Enable mod_rewrite
RUN a2enmod ssl rewrite headers

# Copy your Apache config file
COPY ports.conf /etc/apache2/ports.conf
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

COPY . /var/www/html 

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN composer install --no-interaction --optimize-autoloader \
    && npm install \
    && npm run build

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 80
EXPOSE 5173

COPY startapache.sh /startapache.sh
RUN chmod +x /startapache.sh

ENTRYPOINT ["/startapache.sh"]