<template>
  <nav>
    <v-toolbar color="primary" flat>
      <v-container class="nav-menu" style="max-width: 100%;">
        <ul class="d-flex">
          <li v-for="(menu, index) of menu_list" :key="index">
            <div v-if="menu.pipe" class="pipe">&nbsp;</div>

            <div v-else-if="!menu.submenu.length">
              <a @click="openPage(menu.path)">
                {{ menu.title }}
              </a>
            </div>

            <div v-else>
              <v-menu offset-y open-on-hover>
                <template v-slot:activator="{ on, attrs }">
                  <a dark v-bind="attrs" v-on="on">
                    <span v-html="menu.title"></span>
                    <i class="fa fa-chevron-down"></i>
                  </a>
                </template>

                <v-list color="primary" dark>
                  <v-list-item
                    v-for="(submenu, index) of menu.submenu"
                    :key="index"
                    @click="openPage(submenu.path)"
                    link
                  >
                    <v-list-item-title>
                      {{ submenu.title }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </li>
        </ul>
      </v-container>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: 'DMenu',
  data() {
    return {
      menu_list: [
       
       //homepage
       {
          title: this.$t('SHARED.HEADER.MENU.HOMEPAGE.NAME'),
         path:'/',
          submenu: [],
        },
        { pipe: true },

        // About us
        {
          title: this.$t('SHARED.HEADER.MENU.ABOUT_US.NAME'),
          path: null,
          submenu: [
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.BACKGROUND'),
              path: '/about-us#cmlc-aboutus-2',
            },
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.RESPONSIBILITY'),
              path: '/about-us#cmlc-aboutus-3',
            },
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.OBJECTIVE'),
              path: '/about-us#cmlc-aboutus-4',
            },
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.TARGET'),
              path: '/about-us#cmlc-aboutus-5',
            },
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.STAFF'),
              path: '/about-us#cmlc-aboutus-6',
            },
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.FAQ'),
              path: '/faq',
            },
          ],
        },
        { pipe: true },
       
       // Training
        {
          title: this.$t('SHARED.HEADER.MENU.TRIANING.NAME'),
          path: null,
          submenu: [
          
                {
              title: this.$t('SHARED.HEADER.MENU.TRIANING.COURSES'),
              path: '/course',
            },
          
    
            {
              title: this.$t(
                'SHARED.HEADER.MENU.TRIANING.TRIANING_VEDEO_DOCUMENT'
              ),
              path: '/training-video-document',
            },
          ],
        },
        { pipe: true },

          // News
        {
          title: this.$t('SHARED.HEADER.MENU.NEWS.NAME'),
          path: null,
          submenu: [

                 {
              title: this.$t('SHARED.HEADER.MENU.NEWS.MESSAGE'),
              path: '/news-activity',
            },
                  {
              title: this.$t('SHARED.HEADER.MENU.NEWS.TRIANING'),
              path: '/training',
            },
               {
              title: this.$t('SHARED.HEADER.MENU.NEWS.GALLERY'),
              path: '/gallery',
            },
             {
              title: this.$t('SHARED.HEADER.MENU.NEWS.CSITEREPORT'),
              path: '/csitereport',
            },
          ],
        },
        { pipe: true },
          // Database
        {
          title: this.$t('SHARED.HEADER.MENU.DATABASE.NAME'),
          path: null,
          submenu: [
            {
              title: this.$t('SHARED.HEADER.MENU.DATABASE.MEDIA_MASTER'),
              path: '/media-master',
            },
            {
              title: this.$t('SHARED.HEADER.MENU.DATABASE.MEDIA_TRAINING'),
              path: '/media-training',
            },
            {
              title: this.$t('SHARED.HEADER.MENU.DATABASE.MEDIA_GENERAL'),
              path: '/media-general',
            },
            {
              title: this.$t('SHARED.HEADER.MENU.DATABASE.MEMBER_GROUP'),
              path: '/member-group',
            },
          ],
        },
        { pipe: true },

        // Training portfolio
        {
          title: this.$t('SHARED.HEADER.MENU.TRIANING_PORTFOLIO'),
          path: '/training-portfolio',
          submenu: [],
        },
        { pipe: true },

      

        // CMLC Collection
        {
          title: this.$t('SHARED.HEADER.MENU.CMLC_COLLECTION.NAME'),
          path: null,
          submenu: [
            {
              title: this.$t('SHARED.HEADER.MENU.CMLC_COLLECTION.COURSE_LAW'),
              path: '/course-law',
            },
               {
              title: this.$t('SHARED.HEADER.MENU.CMLC_COLLECTION.ARTICLE'),
              path: '/article',
            }
          ],
        },
        { pipe: true },

      
      //folum
      {
         title: this.$t('SHARED.HEADER.MENU.FORUM.NAME'),
         path: '/forum',
          submenu: [],
        },
        { pipe: true },

        // Booking
        {
          title: this.$t('SHARED.HEADER.MENU.BOOKING.NAME'),
          path: null,
          submenu: [
            {
              title: this.$t('SHARED.HEADER.MENU.BOOKING.EQUIPMENT_BORROWING'),
              path: '/booking?tab=1',
            },
            // {
            //   title: this.$t('SHARED.HEADER.MENU.BOOKING.EQUIPMENT_RETURN'),
            //   path: '/booking?tab=2',
            // },
            {
              title: this.$t('SHARED.HEADER.MENU.BOOKING.STUDIO_BOOKING'),
              path: '/booking?tab=2',
            },
            {
              title: this.$t('SHARED.HEADER.MENU.BOOKING.ADVISOR_BOOKING'),
              path: '/booking?tab=3',
            },
          ],
        },
        { pipe: true },

          // Quick link
        {
          title: this.$t('SHARED.HEADER.MENU.QUICK_LINK'),
          path: null,
          type: 'quick_link',
          submenu: [],
        },
        { pipe: true },

        // Contact us
        {
          title: this.$t('SHARED.HEADER.MENU.CONTACT_US'),
          path: '/contact-us',
          submenu: [],
        },
        
     
      ],
    }
  },
  async mounted() {
    await this.setMenu()
  },
  methods: {
    openPage(page) {
      this.$router.push({ path: page })
      this.$store.commit('media_playlist/setMediaCategoryId', '')
      this.$store.commit('media_playlist/setActiveMenu', 0)
    },
    async setMenu() {
      let quickLink = await this.getQuickLink()

      for (const menu of this.menu_list) {
        if (menu.type == 'quick_link') {
          menu.submenu = quickLink
        }
      }
    },
    async getQuickLink() {
      let res = await this.$store.dispatch('quick_link/get')

      return res.data.map((data) => {
        data.title = this.$lang(data.name_th, data.name_en)
        data.path = new URL(data.url).pathname

        return data
      })
    },
  },
}
</script>

<style scoped lang="scss">
.nav-menu {
  a {
    color: #fff !important;
  }

  ul {
    list-style: none;
    justify-content: space-between;

    li {
      font-size: 14px;

      i.fa {
        margin-left: 3px;
        font-size: 12px;
      }
    }

    div.pipe {
      border-left: solid 1px #777;
      margin-left: 5px;
    }
  }
}
</style>
