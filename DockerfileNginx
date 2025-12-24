FROM php:8.2-fpm

# System deps
RUN apt-get update && apt-get install -y \
    nginx \
    git \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    sqlite3 \
    libsqlite3-dev \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# PHP extensions
RUN docker-php-ext-install pdo pdo_mysql pdo_sqlite mbstring bcmath gd

COPY nginx-site.conf /etc/nginx/conf.d/default.conf

COPY . /var/www/html 

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install deps
RUN composer install --no-interaction --optimize-autoloader \
    && npm install \
    && npm run build

# Permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 80
EXPOSE 5173

COPY startnginx.sh /startnginx.sh
RUN chmod +x /startnginx.sh

ENTRYPOINT ["/startnginx.sh"]