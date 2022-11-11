<template>
  <v-app
    v-if="this.$store.state.common.platform_ready"
    :class="[
      $store.state.common.device_type == 'desktop'
        ? 'desktop-mode'
        : 'mobile-mode',
    ]"
  >
    <div v-if="$store.state.common.device_type">
      <DHeader v-if="$store.state.common.device_type == 'desktop'" />
      <MHeader v-else />
    </div>

    <v-main>
      <div v-if="$store.state.common.device_type">
        <div v-if="$store.state.common.device_type == 'desktop'">
          <nuxt />
        </div>

        <v-container v-else>
          <nuxt />
        </v-container>
      </div>
    </v-main>

    <div v-if="$store.state.common.device_type">
      <DFooter v-if="$store.state.common.device_type == 'desktop'" />
      <MFooter v-else />
    </div>
  </v-app>
</template>

<script>
  import DHeader from '~/components/desktop/shared/DHeader.vue'
  import DFooter from '~/components/desktop/shared/DFooter.vue'
  import MHeader from '~/components/mobile/shared/MHeader.vue'
  import MFooter from '~/components/mobile/shared/MFooter.vue'

  export default {
    name: 'DefaultLayout',
    components: {
      DHeader,
      DFooter,
      MHeader,
      MFooter,
    },
    mounted() {
      this.getSetDeviceType()
      this.counterSiteView()
      this.setDataFromStorage()
      this.setPlatformReady()
    },
    watch: {
      $route() {
        this.counterSiteView()
      },
    },
    methods: {
      getSetDeviceType() {
        let displayWidth = document.body.clientWidth
        let deviceType = null

        if (displayWidth > 800) {
          deviceType = 'desktop'
        } else {
          deviceType = 'mobile'
        }

        this.$store.commit('common/setDeviceType', deviceType)
      },
      async counterSiteView() {
        await this.$store.dispatch('view_counter/count')
      },
      setDataFromStorage() {
        this.$store.commit('user/setDataFromStorage')
      },
      setPlatformReady() {
        this.$store.commit('common/setPlatformReady')
      },
    },
  }
</script>

<style lang="scss">
  @font-face {
    font-family: 'Prompt';
    font-weight: 400;
    src: url('/fonts//Prompt/Prompt-Regular.ttf');
  }

  @font-face {
    font-family: 'Prompt';
    font-weight: 700;
    src: url('/fonts/Prompt/Prompt-Bold.ttf');
  }

  .swal2-title,
  .swal2-content,
  .swal2-html-container,
  .swal2-actions {
    font-family: 'Prompt' !important;
  }

  .swal2-title {
    font-size: 1.854em;
  }

  .swal2-confirm {
    background: var(--v-primary-base) !important;
  }

  #app {
    font-family: 'Prompt', sans-serif !important;
  }

  /* .v-main__wrap {
                                              display: flex;
                                              justify-content: center;
                                              align-items: center;
                                            } */

  .justify-content-center {
    justify-content: center;
  }

  .justify-content-between {
    justify-content: space-between;
  }

  .justify-content-end {
    justify-content: end;
  }

  .v-dialog {
    background: #fff !important;
     border-radius: 18.5294px !important; 
  }

  .pointer {
    cursor: pointer;
  }

  .fixed-overflow::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  .fixed-overflow::-webkit-scrollbar:vertical {
    width: 7px;
  }

  .fixed-overflow::-webkit-scrollbar-track {
    background: #e5e5e5;
    border-radius: 100px;
  }

  .fixed-overflow::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 2px solid #8c8c8c;
    /* should match background, can't be transparent */
    background: #8c8c8c;
  }

  // icon
  i.gallery {
    background-color: #fff;
    mask: url('@/static/icon/gallery.svg') no-repeat center / contain;
    -webkit-mask: url('@/static/icon/gallery.svg') no-repeat center / contain;
    width: 24px;
    height: 24px;
  }
  i.heart {
    background-color: #001538;
    mask: url('@/static/icon/heart.svg') no-repeat center / contain;
    -webkit-mask: url('@/static/icon/heart.svg') no-repeat center / contain;
    width: 24px;
    height: 24px;
  }
  i.chatbubble-ellipses {
    background-color: #001538;
    mask: url('@/static/icon/chatbubble-ellipses.svg') no-repeat center / contain;
    -webkit-mask: url('@/static/icon/chatbubble-ellipses.svg') no-repeat center /
      contain;
    width: 24px;
    height: 24px;
  }
  i.play {
    background-color: #fff;
    mask: url('@/static/icon/play.svg') no-repeat center / contain;
    -webkit-mask: url('@/static/icon/play.svg') no-repeat center / contain;
    width: 24px;
    height: 24px;
  }
  i.circle-back {
    background-color: #001538;
    mask: url('@/static/icon/circle-back.svg') no-repeat center / 16px 16px;
    -webkit-mask: url('@/static/icon/circle-back.svg') no-repeat center / 16px
      16px;
    width: 18px;
    height: 18px;
  }
  i.circle-next {
    background-color: #001538;
    mask: url('@/static/icon/circle-next.svg') no-repeat center / 16px 16px;
    -webkit-mask: url('@/static/icon/circle-next.svg') no-repeat center / 16px
      16px;
    width: 18px;
    height: 18px;
    border: 1px solid #fff;
  }
  i.paper-download {
    background-color: #fff;
    mask: url('@/static/icon/paper-download.svg') no-repeat center / 16px 16px;
    -webkit-mask: url('@/static/icon/paper-download.svg') no-repeat center / 16px
      16px;
    width: 18px;
    height: 18px;
  }
  i.back {
    background-color: #001538;
    mask: url('@/static/icon/back.svg') no-repeat center / 22px 22px;
    -webkit-mask: url('@/static/icon/back.svg') no-repeat center / 22px 22px;
    width: 24px;
    height: 24px;
    border: 1px solid #fff;
  }
  i.next {
    background-color: #001538;
    mask: url('@/static/icon/next.svg') no-repeat center / 22px 22px;
    -webkit-mask: url('@/static/icon/next.svg') no-repeat center / 22px 22px;
    width: 24px;
    height: 24px;
    border: 1px solid #fff;
  }
  i.circle-success {
    background-color: #00632b;
    mask: url('@/static/icon/circle.svg') no-repeat center / 8px 8px;
    -webkit-mask: url('@/static/icon/circle.svg') no-repeat center / 8px 8px;
    width: 10px;
    height: 10px;
  }
  i.circle-danger {
    background-color: #b01212;
    mask: url('@/static/icon/circle.svg') no-repeat center / 8px 8px;
    -webkit-mask: url('@/static/icon/circle.svg') no-repeat center / 8px 8px;
    width: 10px;
    height: 10px;
  }
  i.circle-warning {
    background-color: #efb008;
    mask: url('@/static/icon/circle.svg') no-repeat center / 8px 8px;
    -webkit-mask: url('@/static/icon/circle.svg') no-repeat center / 8px 8px;
    width: 10px;
    height: 10px;
  }
  i.circle-gray {
    background-color: #222;
    mask: url('@/static/icon/circle.svg') no-repeat center / 8px 8px;
    -webkit-mask: url('@/static/icon/circle.svg') no-repeat center / 8px 8px;
    width: 10px;
    height: 10px;
  }

  i.hamburger-menu {
    background-color: #fff;
    mask: url('@/static/icon/hamburger-menu.svg') no-repeat center / 22px 22px;
    -webkit-mask: url('@/static/icon/hamburger-menu.svg') no-repeat center / 22px
      22px;
    width: 24px;
    height: 24px;
    border: 1px solid #fff;
  }

  i.hamburger-menu-rotation {
    background-color: #fff;
    mask: url('@/static/icon/hamburger-menu-rotation.svg') no-repeat center / 22px
      22px;
    -webkit-mask: url('@/static/icon/hamburger-menu-rotation.svg') no-repeat
      center / 22px 22px;
    width: 24px;
    height: 24px;
  }

  i.facebook {
    background-color: #fff;
    mask: url('@/static/icon/facebook.svg') no-repeat center / 22px 22px;
    -webkit-mask: url('@/static/icon/facebook.svg') no-repeat center / 22px 22px;
    width: 24px;
    height: 24px;
  }

  i.instagram {
    background-color: #fff;
    mask: url('@/static/icon/instagram.svg') no-repeat center / 22px 22px;
    -webkit-mask: url('@/static/icon/instagram.svg') no-repeat center / 22px 22px;
    width: 24px;
    height: 24px;
  }

  i.youtube {
    background-color: #fff;
    mask: url('@/static/icon/youtube.svg') no-repeat center / 22px 22px;
    -webkit-mask: url('@/static/icon/youtube.svg') no-repeat center / 22px 22px;
    width: 24px;
    height: 24px;
  }

  i.arrow-up {
    background-color: #fff;
    mask: url('@/static/icon/arrow-up.svg') no-repeat center / 14px 14px;
    -webkit-mask: url('@/static/icon/arrow-up.svg') no-repeat center / 14px 14px;
    width: 16px;
    height: 16px;
  }

  i.lock {
    background-color: #fff;
    mask: url('@/static/icon/lock.svg') no-repeat center / 14px 14px;
    -webkit-mask: url('@/static/icon/lock.svg') no-repeat center / 14px 14px;
    width: 16px;
    height: 16px;
  }

  i.profile {
    background-color: #fff;
    mask: url('@/static/icon/profile.svg') no-repeat center / 14px 14px;
    -webkit-mask: url('@/static/icon/profile.svg') no-repeat center / 14px 14px;
    width: 16px;
    height: 16px;
  }

  #app.desktop-mode {
    color: #001538;

    .section-title {
      padding-bottom: 1px;
      margin-bottom: 30px;
      // border-bottom: 2px solid #b2b2b2;

      span {
        font-size: 36px;
        // border-bottom: 6px solid #001538;

        i.fa {
          margin-right: 5px;
          color: #001538;
          opacity: 0.57 !important;
          cursor: pointer;
        }
      }
    }
    .hover-card:hover {
      box-shadow: 1px 5px 10px 3px #00000040 !important;
    }
  }
</style>
