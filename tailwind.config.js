/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    theme: {
        extend: {
            colors: {
                'black-cemetery': 'rgb(28, 33, 42)',
                secundaryTxt: '#42E969',
                primaryTxt: '#474747'
            },
            screens: {
                fold: '260px'
            }
        }
    },
    plugins: []
};
