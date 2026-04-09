export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://images.ctfassets.net/0krlnipf2sxy/3VB7b9fXkg1eDs1YDoFrps/2642bc447eed95d83fe187752fa32181/Gemini_Generated_Image_pu6povpu6povpu6p_kdjbku.png',
      light: 'https://images.ctfassets.net/0krlnipf2sxy/3VB7b9fXkg1eDs1YDoFrps/2642bc447eed95d83fe187752fa32181/Gemini_Generated_Image_pu6povpu6povpu6p_kdjbku.png',
      alt: 'My profile picture'
    },
    meetingLink: 'https://calendar.app.google/3QYnSyXYdfiuNaXi9',
    email: 'ui-pro@nuxt.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.com/users/314369555906691073',
      'target': '_blank',
      'aria-label': 'Jadigaknih on Discord'
    }, {
      'icon': 'i-simple-icons-googlechrome',
      'to': 'https://aves.in',
      'target': '_blank',
      'aria-label': 'Another profile website'
    }, 
    {
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/nur-avesina-mustari-331b7685/',
      'target': '_blank',
      'aria-label': 'Avesina on linkedin'
    },
    {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/avesina',
      'target': '_blank',
      'aria-label': 'Avesina on GitHub'
    }]
  }
})
