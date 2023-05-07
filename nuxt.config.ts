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
    },
    css: [
        'assets/css/index.css'
    ],
    modules: [
        '@nuxtjs/supabase',
        'nuxt-icon',
        '@nuxt/image-edge',
        'nuxt-typed-router',
    ],
})
