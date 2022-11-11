<template>
  <div>
    <div class="media-card">
      <v-row>
        <v-col cols="3">
          <img
            @click="openPage(detail_path, { id: data.id })"
            :src="`${image_url}${data.image}`"
            alt="media-image"
            class="media-image"
          />
        </v-col>

        <v-col cols="9">
          <p
            @click="openPage(detail_path, { id: data.id })"
            class="media-topic"
          >
            {{ $lang(data.name_th, data.name_en) }}
          </p>

          <p class="media-detail">
            {{ $lang(data.detail_th, data.detail_en) }}
          </p>

          <p class="media-date">
            {{ data.created_at }}
          </p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DMediaGlobalCard',
  props: ['data', 'detail_path'],
  data() {
    return {
      image_url: process.env.image_url,
    }
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
  },
}
</script>

<style lang="scss" scoped>
.media-card {
  padding: 15px 0 5px;
  border-bottom: 1px solid #e5e5e5;

  .media-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    object-position: center;
    cursor: pointer;
  }

  .media-topic {
    font-weight: bold;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }

  .media-detail {
    color: #b2b2b2;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .media-date {
    margin-top: 35px;
    color: #b2b2b2;
    font-size: 14px;
  }
}
</style>
