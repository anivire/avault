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
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxt/image-edge',
        'nuxt-icon',
        'nuxt-typed-router',
    ],
})
