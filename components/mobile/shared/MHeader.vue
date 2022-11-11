<template>
  <v-app-bar app color="white" elevation="0" height="82">
    <header>
      <v-container>
        <v-row style="height: 65px">
          <v-col cols="3"
            ><img
              @click="openPage('/')"
              class="logo"
              alt="logo-cmlc"
              src="@/static/images/LOGO-CMLC.png"
          /></v-col>
          <v-col cols="6" class="text-right ps-0 pe-0">
            <v-text-field
              append-icon="mdi-magnify"
              type="text"
              name="input-10-1"
              :label="$t('SHARED.HEADER.SEARCH')"
              class="pt-1 mt-0"
              v-model="keyword"
              @click:append="search"
              single-line
            ></v-text-field>
          </v-col>
          <v-col cols="1" class="mr-1">
            <v-btn icon class="print" @click="$router.push('/')">
              <v-icon size="30" color="#001538">mdi-home-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="1" class="text-right">
            <v-btn icon class="print" @click="menu_dialog = true">
              <i class="hamburger-menu" style="background: #001538"></i>
            </v-btn>

            <v-dialog
              v-model="menu_dialog"
              fullscreen
              hide-overlay
              transition="dialog-top-transition"
            >
              <MMenu @menu_dialog="closeMenuDialog" />
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </header>
  </v-app-bar>
</template>

<script>
  import MMenu from '~/components/mobile/shared/MMenu.vue'
  export default {
    name: 'MHeader',
    components: {
      MMenu,
    },
    data() {
      return {
        menu_dialog: false,
        keyword: '',
      }
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      closeMenuDialog(value) {
        this.menu_dialog = value
      },
      search($event) {
        if (this.keyword.trim()) {
          this.openPage('/search', { keyword: this.keyword })
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  header {
    width: 100vw;
    border-bottom: 18px solid #001538;
    .logo {
      width: 100%;
      margin: 6px 0;
    }
  }
</style>
<style>
  .v-toolbar__content,
  .v-toolbar__extension {
    height: 65px;
    padding: 0 !important;
  }
</style>
