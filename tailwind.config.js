export default {
    content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#ff0000',
                surface: '#0f0f0f',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            maxWidth: {
                layout: '1600px',
                hero: '1400px',
            },
        },
    },
    plugins: [],
};
