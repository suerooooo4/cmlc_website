<template>
  <div>
    <v-container>
      <div class="header">
        <h2 class="sitemap-title">
          {{ $t('SITEMAP.TITLE') }}
        </h2>
      </div>

      <div class="content-container">
        <div v-for="(menu, index) of menu_list" :key="index" class="menu-list">
          <div>
            <a v-if="menu.path" @click="openPage(menu.path)" class="menu">{{
              menu.title
            }}</a>
            <a v-else class="menu">{{ menu.title }}</a>
          </div>

          <ul class="submenu-list">
            <li
              v-for="(submenu, index) of menu.submenu"
              :key="index"
              class="submenu-list"
            >
              <a @click="openPage(submenu.path)" class="submenu">{{
                submenu.title
              }}</a>
            </li>
          </ul>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'MSitemap',
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

        // Training portfolio
        {
          title: this.$t('SHARED.HEADER.MENU.TRIANING_PORTFOLIO'),
          path: '/training-portfolio',
          submenu: [],
        },

      

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

      
      //folum
      {
         title: this.$t('SHARED.HEADER.MENU.FORUM.NAME'),
         path: '/forum',
          submenu: [],
        },

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

          // Quick link
        {
          title: this.$t('SHARED.HEADER.MENU.QUICK_LINK'),
          path: null,
          type: 'quick_link',
          submenu: [],
        },

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
    await this.getQuickLink()
  },
  methods: {
    openPage(page) {
      this.$router.push({ path: page })
    },
    async getQuickLink() {
      let res = await this.$store.dispatch('quick_link/get')

      this.menu_list[6].submenu = res.data.map((data) => {
        data.title = this.$lang(data.name_th, data.name_en)
        data.path = new URL(data.url).pathname

        return data
      })
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  margin: 25px 0 30px;

  .sitemap-title {
    font-size: 36px;
    color: #001538;
  }
}

.content-container {
  width: 100%;
  margin-bottom: 100px;
  padding: 30px;
  background: var(--v-primary-base);
  border-radius: 10px;

  .menu-list {
    margin-bottom: 15px;

    .menu {
      color: #fff;
      font-weight: bold;
      font-size: 20px;
    }

    .submenu-list {
      margin-top: 5px;
      margin-left: 10px;
      color: #c4c4c4;

      .submenu {
        color: #c4c4c4;
      }
    }
  }
}
</style>
