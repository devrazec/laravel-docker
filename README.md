# Laravel as a Docker on render.com

Building a Project with Laravel + Breeze + Inertia + React + Docker + Apache + SQLite

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
change /laravel-docker/composer.lock where are "php": "^8.4", to 8.2

-- Run Bankend

php artisan serve --port=8080
php artisan serve

-- Run Frontend

npm run dev

-- Flowbite UI

npm i -S flowbite-react
npm i -D flowbite-typography
npm i -S tailwind-merge lucide-react tw-animate-css

-- Primereact UI

npm i -S primereact

-- Icons

npm i -D flowbite-react-icons @iconify-icon/react iconsax-react react-icons flag-icons primeicons

-- Maps

npm i -S leaflet leaflet-draw react-leaflet@next react-leaflet-cluster react-leaflet-draw

npm i -S leaflet-fullscreen

-- Docker

docker build -t laravel-docker -f DockerfileApache .

docker build -t laravel-docker -f DockerfileNginx .

docker run -itd \
--restart unless-stopped \
--name laravel-docker \
--hostname laravel-docker.local \
-p 80:80 \
laravel-docker

```

# Web Interface

http://localhost:3000/searchbar

![Pic1](./public/img/pic1.png)
![Pic2](./public/img/pic2.png)
![Pic3](./public/img/pic3.png)
![Pic4](./public/img/pic4.png)
![Pic5](./public/img/pic5.png)


# Demo

https://laravel-docker-1kqh.onrender.com/

# Links

https://flowbite.com/icons/

https://flowbite-react.com/

https://flowbite.com/blocks/

https://icon-sets.iconify.design/

https://react-icons.github.io/react-icons/icons/hi/