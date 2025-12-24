import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
const classList = require('./.flowbite-react/class-list.json');

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        '../../modules/flowbite-react/**/*.js'
    ],
    safelist: classList,
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};