<template>
  <main>
    <MArticleBanner
      :title="$t('MEDIA_GENERAL.TITLE')"
      :image="'/images/banner-media-general.jpg'"
    />
    <section class="media-general-container">
      <v-container>
        <header class="header">
          <span class="header__topbar mt-4">
            <v-btn icon @click="openPage('/media-general', {})">
              <i class="back"></i>
            </v-btn>
            <a class="link" @click="openPage('/media-general', {})"
              >{{ $t('MEDIA_GLOBAL.TITLE') }}&nbsp;&nbsp;&nbsp;</a
            >
          </span>
          <hr />
        </header>
      </v-container>
    </section>
    <section class="media_global">
      <div v-for="(item, index) in media_global" :key="index">
        <MMediaGeneralCard
          @open="openMediaGlobalDialog(item.id)"
          :data="item"
        />
      </div>
    </section>
    <infinite-loading
      spinner="spiral"
      @infinite="infiniteScroll"
      force-use-infinite-wrapper=".el-table__body-wrapper"
      ref="infiniteloading"
    >
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
    <v-dialog v-model="media_global_dialog" fullscreen hide-overlay>
      <MMediaGlobalDetail
        :id.sync="media_global_dialog_id"
        @detail_dialog="closeMediaGlobalDialog"
      />
    </v-dialog>
  </main>
</template>

<script>
import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
import MMediaGeneralCard from '~/components/mobile/shared/MMediaGeneralCard.vue'
import MMediaGlobalDetail from '~/components/mobile/media-global/MMediaGlobalDetail.vue'
export default {
  name: 'MMediaGlobal',
  components: {
    MArticleBanner,
    MMediaGeneralCard,
    MMediaGlobalDetail,
  },
  data() {
    return {
      page: 1,
      per_page: 8,
      last_page: 0,
      media_global: [],
      media_global_main: null,
      media_global_dialog: false,
      media_global_dialog_id: null,
    }
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    openCategory(path, query) {
      this.$router.push({ path, query })
    },
    openMediaGlobalDialog(id) {
      this.media_global_dialog = true
      this.media_global_dialog_id = id
    },
    closeMediaGlobalDialog(value) {
      this.media_global_dialog = value
    },
    infiniteScroll($state = null) {
      setTimeout(async () => {
        let res = await this.$store.dispatch('media_global/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: false,
        })
        if (res.data.data.length >= 1) {
          this.media_global = this.media_global.concat(
            res.data.data.map((data) => {
              data.detail_th = this.$stripHtml(data.detail_th)
              data.detail_en = this.$stripHtml(data.detail_en)

              return data
            })
          )
          this.last_page = res.data.lastPage
          this.total = res.data.total
          this.page++
          $state.loaded()
        } else {
          $state.complete()
        }
      }, 500)
    },
  },
}
</script>

<style scoped lang="scss">
.media-general-container {
  padding: 10px 0;
  .header {
    &__topbar {
      color: #001538;
      position: relative;

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 6px;
        border-radius: 6px;
        background: #000;
        position: absolute;
        bottom: -11px;
        left: 0;
      }
      .link {
        color: #001538;
      }
    }
    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 2px solid #ccc;
      padding: 0;
    }
  }
  .v-sheet {
    background-color: unset;
    border-color: unset;
    color: #001538;
  }
}
.media_global {
  .header {
    margin-bottom: 15px;
    &__topbar {
      color: #001538;
      position: relative;

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 6px;
        border-radius: 6px;
        background: #000;
        position: absolute;
        bottom: -11px;
        left: 0;
      }
      .link {
        color: #001538;
      }
    }
    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 2px solid #ccc;
      padding: 0;
    }
  }
}
</style>
