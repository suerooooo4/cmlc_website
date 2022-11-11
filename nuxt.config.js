import colors from 'vuetify/es5/util/colors'
import {
  locale as th
} from "./static/lang/th";
import {
  locale as en
} from "./static/lang/en";

export default {
  // mode: "spa",

  env: {
    image_url: "http://cmlc-api.bca.up.ac.th",
    document_url: "http://cmlc-api.bca.up.ac.th",
    video_url: "http://cmlc-api.bca.up.ac.th",
    audio_url: "http://cmlc-api.bca.up.ac.th",
    download_url: "http://cmlc-api.bca.up.ac.th/api/v1/user/media/download/",
    download_training_video_url: "http://cmlc-api.bca.up.ac.th/api/v1/user/training_video/download/",
    download_training_document_url: "http://cmlc-api.bca.up.ac.th/api/v1/user/training_document/download/",
    ckeditor_upload_url: 'http://cmlc-api.bca.up.ac.th/api/v1/admin/ckeditor_image_upload',
    google_api_token: 'AIzaSyCb-Cr081cGsWBbI8agi4iNQPJK0qcnCI8'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'CMLC | ศูนย์เรียนรู้สื่อชุมชน มหาวิทยาลัยพะเยา',
    htmlAttrs: {
      lang: 'th'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'description',
        content: 'CMLC ศูนย์เรียนรู้สื่อชุมชน มหาวิทยาลัยพะเยา เป็นศูนย์ที่เกิดจากความร่วมมือระหว่าง สาขาวิชาการสื่อสารสื่อใหม่ คณะบริหารธุรกิจและนิเทศศาสตร์ และกองทุนวิจัยและพัฒนากิจการกระจายเสียง กิจการโทรทัศน์ และกิจการโทรคมนาคม เพื่อประโยชน์สาธารณะ (กทปส.) จัดตั้งขึ้นเพื่อให้บริการฝึกอบรมพัฒนาบุคลากรให้มีความพร้อมด้านการผลิตสื่อ ชุมชนและเตรียมความพร้อมให้กับประชาชนในการขอใบอนุญาตการเป็น ผู้ประกอบการโทรทัศน์บริการชุมชน'
      },
      {
        name: 'keywords',
        content: 'ศูนย์การเรียนรู้,สื่อชุมชน,ฝึกอบรม'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      // { hid: 'description', name: 'description', content: '' },
      {
        property: "og:title",
        content: "ศูนย์เรียนรู้สื่อชุมชน มหาวิทยาลัยพะเยา"
      },
      {
        property: "og:description",
        content: "CMLC ศูนย์เรียนรู้สื่อชุมชน มหาวิทยาลัยพะเยา เป็นศูนย์ที่เกิดจากความร่วมมือระหว่าง สาขาวิชาการสื่อสารสื่อใหม่ คณะบริหารธุรกิจและนิเทศศาสตร์ และกองทุนวิจัยและพัฒนากิจการกระจายเสียง กิจการโทรทัศน์ และกิจการโทรคมนาคม เพื่อประโยชน์สาธารณะ (กทปส.) จัดตั้งขึ้นเพื่อให้บริการฝึกอบรมพัฒนาบุคลากรให้มีความพร้อมด้านการผลิตสื่อ ชุมชนและเตรียมความพร้อมให้กับประชาชนในการขอใบอนุญาตการเป็น ผู้ประกอบการโทรทัศน์บริการชุมชน"
      },
      {
        property: "og:image",
        content: "/logo-letter-CMLC.png"
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: '/css/fontawesome-5.15.4/css/all.css'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/strip-html.js'
    },
    {
      src: '~/plugins/fake-data.js'
    },
    {
      src: '~/plugins/set-param.js'
    },
    {
      src: '~/plugins/language.js'
    },
    {
      src: '~/plugins/infiniteloading',
      ssr: false
    },
    {
      src: "~/plugins/google-maps",
      ssr: true
    },
    {
      src: '~/plugins/get-image-html.js'
    },
    {
      src: '~/plugins/auth.js'
    },
    {
      src: '~/plugins/vue-slick-carousel.js'
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n',
  ],

  // Change Language: https://i18n.nuxtjs.org/
  i18n: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
    vueI18n: {
      lazy: true,
      fallbackLocale: 'th',
      messages: {
        en: en,
        th: th
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://cmlc-api.bca.up.ac.th/api/v1/user'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true
      },
      dark: false,
      themes: {
        dark: {
          primary: '#001538',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#001538',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background_color: '#FECC32',
          button_text_color: '#FFFFFF',
        }
      }
    }
  },

  // Google analytic https://google-analytics.nuxtjs.org
  googleAnalytics: {
    id: 'UA-144980585-6', // Use as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: 'UA-144980585-6'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  },

  loading: {
    color: '#F00000',
    // height: '5px',
    // throttle: 0,
    // duration: 1000
  },
}
