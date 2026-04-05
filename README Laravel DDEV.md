# Building a Laravel Project with DDEV

# Create DDEV Project

mkdir laravel-ddev
cd laravel-ddev

ddev config \
  --project-name=laravel \
  --project-type=laravel \
  --docroot=public \
  --create-docroot

ddev start

# Create DDEV Project Manually

```

ddev config 

Project name (laravel): 

The docroot is the directory from which your site is served.
This is a relative path from your project root at /Users/user/projects/laravel-ddev
 
Leave docroot empty (hit <RETURN>) to use the location shown in parentheses.
Or specify a custom path if your index.php is in a different directory.
Or use '.' (a dot) to explicitly set it to the project root.
 
Docroot Location (project root): 
Found a php codebase at /Users/user/projects/laravel-ddev. 
Project Type [backdrop, cakephp, craftcms, drupal, drupal6, drupal7, drupal8, drupal9, drupal10, drupal11, generic, laravel, magento, magento2, php, shopware6, silverstripe, symfony, typo3, laravel] (php): laravel

Configuration complete. You may now run 'ddev start'. 

```

# DDEV Describe

```

ddev describe

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Project: laravel ~/projects/laravel-ddev https://laravel.ddev.site                                               │
│ Docker platform: docker-desktop                                                                                  │
│ Router: traefik                                                                                                  │
├──────────────┬──────┬───────────────────────────────────────────────────────────────────────┬────────────────────┤
│ SERVICE      │ STAT │ URL/PORT                                                              │ INFO               │
├──────────────┼──────┼───────────────────────────────────────────────────────────────────────┼────────────────────┤
│ web          │ OK   │ https://laravel.ddev.site                                             │ laravel PHP 8.3    │
│              │      │ InDocker -> Host:                                                     │ Server: nginx-fpm  │
│              │      │  - web:80 -> 127.0.0.1:55695                                          │ Docroot: 'public'  │
│              │      │  - web:443 -> 127.0.0.1:55697                                         │ Perf mode: mutagen │
│              │      │  - web:8025 -> 127.0.0.1:55696                                        │ Node.js: 22        │
├──────────────┼──────┼───────────────────────────────────────────────────────────────────────┼────────────────────┤
│ db           │ OK   │ InDocker -> Host:                                                     │ mariadb:10.11      │
│              │      │  - db:3306 -> 127.0.0.1:55694                                         │ User/Pass: 'db/db' │
│              │      │                                                                       │ or 'root/root'     │
├──────────────┼──────┼───────────────────────────────────────────────────────────────────────┼────────────────────┤
│ Mailpit      │      │ Mailpit: https://laravel.ddev.site:8026                               │                    │
│              │      │ Launch: ddev mailpit                                                  │                    │
├──────────────┼──────┼───────────────────────────────────────────────────────────────────────┼────────────────────┤
│ Project URLs │      │ https://laravel.ddev.site, https://127.0.0.1:55697,                   │                    │
│              │      │ http://laravel.ddev.site:33001, http://127.0.0.1:55695                │                    │
└──────────────┴──────┴───────────────────────────────────────────────────────────────────────┴────────────────────┘

```

# laravel Commands

```

-- Install Laravel with React

ddev composer create laravel/laravel .
ddev composer require laravel/breeze --dev

-- Install React with JavaScript

ddev artisan breeze:install react

-- Install React with TypeScript

ddev artisan breeze:install react --typescript
ddev npm install -D @types/node@^20.19.0
rm -rf node_modules package-lock.json
ddev npm install
ddev npm run build

-- Install Shadcn

ddev npm i -D shadcn
ddev npx shadcn init

-- Open laravel Page 

ddev launch

-- Install Nightwatch

ddev composer require laravel/nightwatch --dev

ddev artisan nightwatch:agent

-- Delete DDEV Project

ddev list
ddev delete laravel
rm -rf laravel-ddev

```

# Links

https://laravel.ddev.site

https://laravel.site/login
