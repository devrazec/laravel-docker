#!/bin/bash
set -e

# Optional: Laravel commands before starting Apache

php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan config:cache
php artisan route:cache

# Start Apache in the foreground (required in Docker)
exec apache2-foreground