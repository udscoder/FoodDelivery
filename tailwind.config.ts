import scrollbarHide from 'tailwind-scrollbar-hide'

export default{
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}", // Captures Vue components and scripts
    ],
    theme: {
        extend: {
            colors: {
                brand: {

                },
            },
        },
    },
    plugins: [
        scrollbarHide
    ],
}