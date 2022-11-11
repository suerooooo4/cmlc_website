<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon  @click="openPage('/law', {law_category_id: law.law_category_id,})">
      
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="openPage('/law', {law_category_id: law.law_category_id,})"
          >{{ $t('LAW.HEADER') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>
    <div v-if="law">
      <section class="date">{{ law.created_at }}</section>
      <section class="content">
        <h1 class="content__title">{{ $lang(law.name_th, law.name_en) }}</h1>
        <div class="content__image">
          <img :src="`${image_url}${law.image}`" alt="content-image" />
        </div>
        <div
          v-html="$lang(law.detail_th, law.detail_en)"
          class="content__html"
        ></div>
      </section>
    </div>
    <div class="m-auto">
      <ul>
        <li v-for="(pdf, idx) in pdfList" :key="idx">
          <iframe :src="pdf.href" width="100%" height="400px" />
        </li>
      </ul>
    </div>
  </main>
</template>
<script>
import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'

export default {
  name: 'DLawDetail',
  components: {
    DArticleBanner,
  },
  data() {
    return {
      image_url: process.env.image_url,
      id: this.$route.query.id,
      previous_page: this.$store.state.law.page,
      law: null,
      pdfList: [],
    }
  },
  async mounted() {
    await this.getLaw()
    await this.updateTotalView()
    await this.getPdfList()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getLaw() {
      let res = await this.$store.dispatch('law/find', this.id)
      this.law = res.data
    },
    async updateTotalView() {
      await this.$store.dispatch('law/updateTotalView', this.id)
    },
    getPdfList() {
      var html = this.law.detail_th
      var parser = new DOMParser()
      var wrapper = parser.parseFromString(html, 'text/html')
      this.pdfList = wrapper.getElementsByTagName('a')
    },
  },
}
</script>

<style scoped lang="scss">
ul li {
  display: block;
  width: 100%;
  margin-bottom: 2rem;
  margin-left: -1rem;
}
.main {
  padding: 12px;
}
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
.date {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 1rem;
}

.content {
  &__title {
    font-size: 22px;
    color: #001538;
  }
  &__image > img {
    max-width: 100%;
    object-fit: cover;
  }
  &__html {
    color: #001538;
  }
}

.recommend {
  margin-left: -12px;
  padding-left: 12px;
  width: 100vw;
  background: #f8f7f6;

  &__title {
    padding-top: 12px;
    font-size: 22px;
    color: #001538;
  }
}
</style>
