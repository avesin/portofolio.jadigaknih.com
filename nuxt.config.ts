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
  nitro: { preset: 'netlify', static: false, prerender: { routes: ['/'], crawlLinks: false } },
  image: {
    domains: ['res.cloudinary.com','images.ctfassets.net'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    densities: [1, 2], 
    quality: 90,
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  runtimeConfig: {
    public: {
      projectId: process.env.NUXT_PUBLIC_PROJECT_ID,
      accessToken: process.env.NUXT_PUBLIC_ACCESS_TOKEN
    },
  },
})
