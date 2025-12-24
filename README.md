# laravel-docker

Building a Project with Laravel + React + Docker + Nginx + SQLite

# Commands

```

-- Create App

composer create laravel/laravel .

composer require laravel/breeze --dev

npm i

php artisan breeze:install react

php artisan migrate:fresh

php artisan db:seed

php artisan key:generate
php artisan key:generate --show

-- Edit composer.json 

"require": { 
    "ext-pdo_sqlite": "*",
    "ext-sqlite3": "*"
}

composer update
npm run build

-- Composer

composer require symfony/clock:^7.0 symfony/css-selector:^7.0
composer update

-- Run Bankend

php artisan serve --port=8080
php artisan serve

-- Run Frontend

npm run dev

-- Flowbite UI

npm i -S flowbite-react
npm i -D flowbite-typography
npm i -D typescript

-- Primereact UI

npm i -S primereact

-- Icons

npm i -D flowbite-react-icons @iconify-icon/react iconsax-react react-icons flag-icons primeicons

-- Maps

npm i -S leaflet leaflet-draw react-leaflet@next react-leaflet-cluster react-leaflet-draw

npm i -S leaflet-fullscreen

-- Docker

docker build -t laravel-docker -f Dockerfile .

docker run -itd \
--restart unless-stopped \
--name laravel-docker \
--hostname laravel-docker.local \
-p 8080:8080 \
-p 5173:5173 \
laravel-docker

```


