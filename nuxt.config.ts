export default defineNuxtConfig({
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    dir: {
        layouts: 'src/layouts',
        pages: 'src/pages',
        middleware: 'src/middleware',
    },
    css: [
        'assets/css/index.css'
    ],
    modules: [
        '@nuxtjs/supabase',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxt/image-edge',
        'nuxt-icon'
    ],
    ssr: false
})
