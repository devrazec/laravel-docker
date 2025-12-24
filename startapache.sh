#!/bin/bash
set -e

# Optional: Laravel commands before starting Apache
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan config:cache
php artisan route:cache

php artisan migrate --force

# Start Apache in the background
apache2-foreground &

# Wait on all background processes
wait