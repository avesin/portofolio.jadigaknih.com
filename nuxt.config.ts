// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',

  // nitro: {
  //   prerender: {
  //     routes: [
  //       '/'
  //     ],
  //     crawlLinks: true
  //   }
  // },
  // routeRules: {
  //   '/**': { ssr: true }
  // },
  nitro: { preset: 'netlify', static: false, prerender: { routes: ['/'], crawlLinks: false } },
  
  image: {
    domains: ['res.cloudinary.com']
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
