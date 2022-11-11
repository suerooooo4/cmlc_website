<template>
  <v-card class="card-menu">
    <v-container>
      <v-row align="center" style="height: 65px">
        <v-col></v-col>
        <v-col class="text-right pe-3 pt-6">
          <v-btn icon class="print" @click.native="$emit('menu_dialog', false)">
            <i class="hamburger-menu-rotation"></i>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <ul class="menu">
      <li class="menu__main" v-for="(menu, index) of menu_list" :key="index">
        <a @click="openSubMenu(index)" v-if="menu.submenu.length">
          {{ menu.title }}
          <i class="fa fa-chevron-down"></i>
        </a>
        <a @click="openPage(menu.path)" v-else>
          {{ menu.title }}
        </a>
        <ul class="sub-menu" v-if="menu.is_open_submenu">
          <li
            :class="`menu__submenu`"
            v-for="(submenu, index) of menu.submenu"
            :key="index"
            v-show="
              submenu.is_authen
                ? Boolean($store.state.user.user_id != null)
                : true
            "
          >
            <a @click="openPage(submenu.path)">{{ submenu.title }}</a>
          </li>
        </ul>
      </li>
    </ul>
    <hr v-if="!this.$store.state.user.user_id" />
    <ul class="menu" v-if="!this.$store.state.user.user_id">
      <li class="menu__main" @click="login_dialog = true">
        <a class="login">
          <v-btn icon> <i class="fa fa-lock"></i> </v-btn
          >{{ $t('SHARED.LOGIN.NAME') }}
        </a>
        <v-dialog v-model="login_dialog" persistent max-width="305">
          <MLogin @login_dialog="closeLoginModal" />
        </v-dialog>
      </li>
    </ul>
    <hr v-if="!this.$store.state.user.user_id" />
    <ul class="menu" v-if="!this.$store.state.user.user_id">
      <li class="menu__main" @click="register_dialog = true">
        <a class="login">
          <v-btn icon> <i class="fa fa-user"></i> </v-btn
          >{{ $t('SHARED.REGISTER.NAME') }}
        </a>
        <v-dialog v-model="register_dialog" persistent max-width="305">
          <MRegister @register_dialog="closeRegisterModal" />
        </v-dialog>
      </li>
    </ul>
    <hr v-if="this.$store.state.user.user_id" />
    <ul class="menu" v-if="this.$store.state.user.user_id">
      <li class="menu__main" @click="openPage('/profile')">
        <a class="login">
          <v-btn icon> <i class="fa fa-user"></i> </v-btn
          >{{ $t('SHARED.HEADER.PROFILE') }}
        </a>
        <v-dialog v-model="register_dialog" persistent max-width="305">
          <MRegister @register_dialog="closeRegisterModal" />
        </v-dialog>
      </li>
    </ul>
    <hr v-if="this.$store.state.user.user_id" />
    <ul class="menu" v-if="this.$store.state.user.user_id">
      <li class="menu__main" @click="logout()">
        <a class="login">
          <v-btn icon> <i class="fa fa-sign-out-alt"></i> </v-btn
          >{{ $t('SHARED.HEADER.LOGOUT') }}
        </a>
        <v-dialog v-model="register_dialog" persistent max-width="305">
          <MRegister @register_dialog="closeRegisterModal" />
        </v-dialog>
      </li>
    </ul>
    <hr />
  </v-card>
</template>

<script>
import MLogin from '~/components/mobile/shared/MLogin.vue'
import MRegister from '~/components/mobile/shared/MRegister.vue'
export default {
  name: 'MMenu',
  components: {
    MLogin,
    MRegister,
  },
  data() {
    return {
      login_dialog: false,
      register_dialog: false,
      menu_list: [
    //homepage
       {
          title: this.$t('SHARED.HEADER.MENU.HOMEPAGE.NAME'),
         path:'/',
          is_open_submenu: false,
          submenu: [],
        },
      
           // About us
        {
          title: this.$t('SHARED.HEADER.MENU.ABOUT_US.NAME'),
          path: null,
          is_open_submenu: false,
          submenu: [
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.BACKGROUND'),
              path: '/about-us#cmlc-aboutus-mobile-2',
              is_authen: false,
            },
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.RESPONSIBILITY'),
              path: '/about-us#cmlc-aboutus-mobile-3',
              is_authen: false,
            },
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.OBJECTIVE'),
              path: '/about-us#cmlc-aboutus-mobile-4',
              is_authen: false,
            },
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.TARGET'),
              path: '/about-us#cmlc-aboutus-mobile-5',
              is_authen: false,
            },
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.STAFF'),
              path: '/about-us#cmlc-aboutus-mobile-6',
              is_authen: false,
            },
            {
              title: this.$t('SHARED.HEADER.MENU.ABOUT_US.FAQ'),
              path: '/faq',
              is_authen: false,
            },
          ],
        },

        // Training
        {
          title: this.$t('SHARED.HEADER.MENU.TRIANING.NAME'),
          path: null,
          is_open_submenu: false,
          submenu: [
            
            
                   {
              title: this.$t('SHARED.HEADER.MENU.TRIANING.COURSES'),
              path: '/course',
               is_authen: false,
            },
          
        /*     {
              title: this.$t('SHARED.HEADER.MENU.TRIANING.TRIANING'),
              path: '/training',
              is_authen: false,
            }, */
            {
              title: this.$t(
                'SHARED.HEADER.MENU.TRIANING.TRIANING_VEDEO_DOCUMENT'
              ),
              path: '/training-video-document',
              is_authen: false,
            },
          ],
        },
    /*   // News
        {
          title: this.$t('SHARED.HEADER.MENU.NEWS'),
          path: '/news-activity',
          is_open_submenu: false,
          submenu: [],
        }, */
    // News
        {
          title: this.$t('SHARED.HEADER.MENU.NEWS.NAME'),
          path: null,
           is_open_submenu: false,
          submenu: [

                 {
              title: this.$t('SHARED.HEADER.MENU.NEWS.MESSAGE'),
              path: '/news-activity',
              is_authen: false,
            },
                  {
              title: this.$t('SHARED.HEADER.MENU.NEWS.TRIANING'),
              path: '/training',
              is_authen: false,
            },
               {
              title: this.$t('SHARED.HEADER.MENU.NEWS.GALLERY'),
              path: '/gallery',
              is_authen: false,
            },
             {
              title: this.$t('SHARED.HEADER.MENU.NEWS.CSITEREPORT'),
              path: '/csitereport',
              is_authen: false,
            },
          ],
        },
     // Database
        {
          title: this.$t('SHARED.HEADER.MENU.DATABASE.NAME'),
          path: null,
          is_open_submenu: false,
          submenu: [
            {
              title: this.$t('SHARED.HEADER.MENU.DATABASE.MEDIA_MASTER'),
              path: '/media-master',
              is_authen: false,
            },
            {
              title: this.$t('SHARED.HEADER.MENU.DATABASE.MEDIA_TRAINING'),
              path: '/media-training',
              is_authen: false,
            },
            {
              title: this.$t('SHARED.HEADER.MENU.DATABASE.MEDIA_GENERAL'),
              path: '/media-general',
              is_authen: false,
            },
            {
              title: this.$t('SHARED.HEADER.MENU.DATABASE.MEMBER_GROUP'),
              path: '/member-group',
              is_authen: false,
            },
          ],
        },

        // Training portfolio
        {
          title: this.$t('SHARED.HEADER.MENU.TRIANING_PORTFOLIO'),
          path: '/training-portfolio',
          is_open_submenu: false,
          submenu: [],
        },

        // CMLC Collection
        {
          title: this.$t('SHARED.HEADER.MENU.CMLC_COLLECTION.NAME'),
          path: null,
           is_open_submenu: false,
          submenu: [
            {
              title: this.$t('SHARED.HEADER.MENU.CMLC_COLLECTION.COURSE_LAW'),
              path: '/course-law',
              is_authen: false,
            },
               {
              title: this.$t('SHARED.HEADER.MENU.CMLC_COLLECTION.ARTICLE'),
              path: '/article',
              is_authen: false,
            }
          ],
        },
      
 //folum
      {
         title: this.$t('SHARED.HEADER.MENU.FORUM.NAME'),
         path: '/forum',
           is_open_submenu: false,
          submenu: [],
        },
   

  

        // Booking
        {
          title: this.$t('SHARED.HEADER.MENU.BOOKING.NAME'),
          path: null,
          is_open_submenu: false,
          submenu: [
            {
              title: this.$t('SHARED.HEADER.MENU.BOOKING.EQUIPMENT_BORROWING'),
              path: '/booking?tab=1',
              is_authen: false,
            },
            // {
            //   title: this.$t('SHARED.HEADER.MENU.BOOKING.EQUIPMENT_RETURN'),
            //   path: '/booking?tab=2',
            //   is_authen: false,
            // },
            {
              title: this.$t('SHARED.HEADER.MENU.BOOKING.STUDIO_BOOKING'),
              path: '/booking?tab=3',
              is_authen: false,
            },
            {
              title: this.$t('SHARED.HEADER.MENU.BOOKING.ADVISOR_BOOKING'),
              path: '/booking?tab=4',
              is_authen: false,
            },
          ],
        },

           // Quick link
        {
          title: this.$t('SHARED.HEADER.MENU.QUICK_LINK'),
          path: '/',
          is_open_submenu: false,
          submenu: [],
        },
        // Contact us
        {
          title: this.$t('SHARED.HEADER.MENU.CONTACT_US'),
          path: '/contact-us',
          submenu: [],
          is_open_submenu: false,
        },

        // Other
        {
          title: this.$t('SHARED.FOOTER.OTHER.TITLE'),
          path: null,
          submenu: [],
          is_open_submenu: false,
          submenu: [
            {
              title: this.$t('RSS.TITLE'),
              path: '/rss',
              is_authen: false,
            },
            {
              title: this.$t('SITEMAP.TITLE'),
              path: '/sitemap',
              is_authen: false,
            },
            {
              title: this.$t('POLL.TITLE'),
              path: '/poll',
              is_authen: true,
            },
            {
              title: this.$t('ORGANIZATION.TITLE'),
              path: '/organization',
              is_authen: true,
            },
          ],
        },
      ],
    }
  },
  async mounted() {
    await this.getQuickLink()
  },
  methods: {
    openPage(path) {
      this.$router.push({ path: path })
      this.$emit('menu_dialog', false)
      this.$store.commit('media_playlist/setMediaCategoryId', '')
      this.$store.commit('media_playlist/setActiveMenu', 0)
    },
    openSubMenu(index) {
      this.menu_list[index].is_open_submenu =
        !this.menu_list[index].is_open_submenu
    },
    async getQuickLink() {
      let res = await this.$store.dispatch('quick_link/get')

      this.menu_list[9].submenu = res.data.map((data) => {
        data.title = this.$lang(data.name_th, data.name_en)
        data.path = new URL(data.url).pathname
        data.is_authen = false

        return data
      })
    },
    closeLoginModal(data) {
      if (data.is_open_register) {
        this.login_dialog = false
        this.register_dialog = true
      } else if (data.is_submit) {
        this.$emit('menu_dialog', false)
      } else {
        this.login_dialog = false
      }
    },
    closeRegisterModal(data) {
      if (data.is_open_login) {
        this.register_dialog = false
        this.login_dialog = true
      } else {
        this.register_dialog = data
      }
    },
    logout() {
      this.$store.dispatch('user/logout')
      this.$store.commit('user/clearData')
      this.openPage('/')
    },
  },
}
</script>

<style scoped lang="scss">
.card-menu {
  background-color: #001538 !important;

  .menu {
    list-style-type: none;
    &__main,
    &__submenu {
      margin: 17px;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
    i.fa {
      margin-right: 5px;
      color: #fff;
    }
  }
  .sub-menu {
    list-style-type: none;
    li::before {
      content: '\2022';
      color: #fff;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
  .login {
    color: #fff;
    text-decoration: none;
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    padding: 0;
  }
}
</style>
