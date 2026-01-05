/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'onyx': '#050505',
                'charcoal': '#121212',
                'gold': {
                    100: '#F9F1D8',
                    200: '#D4AF37', // Classic Gold
                    300: '#AA8C2C', // Dark Gold
                    400: '#806820',
                },
                'silver': '#E0E0E0',
            },
            fontFamily: {
                'sans': ['Montserrat', 'sans-serif'],
                'serif': ['Playfair Display', 'serif'],
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F9F1D8 50%, #AA8C2C 100%)',
                'subtle-noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
            }
        },
    },
    plugins: [],
}
