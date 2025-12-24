#!/bin/bash
set -e

# Optional: Laravel commands before starting Apache
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan config:cache
php artisan route:cache

touch /var/www/html/database/database.sqlite
php artisan migrate --force

# Start Apache in the background
apache2-foreground &

# Start Vite in the background (adjust path as needed)
cd /var/www/html && npm run dev &
# Wait on all background processes
wait