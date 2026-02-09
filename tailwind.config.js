export default {
    content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    default: '#ff0000',
                    600: '#dc2626',
                    700: '#b91c1c',
                },

                surface: {
                    default: '#0f0f0f',
                    elevated: '#171717',
                    raised: '#262626',
                    'raised-hover': '#404040',
                },

                overlay: {
                    dark: 'rgba(0,0,0,0.8)',
                    heavy: 'rgba(0,0,0,0.95)',
                },

                card: {
                    DEFAULT: 'rgba(23,23,23,0.7)',
                    hover: 'rgba(38,38,38,0.7)',
                    input: 'rgba(38,38,38,0.6)',
                },
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
