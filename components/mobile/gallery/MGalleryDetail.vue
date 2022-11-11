<template>
  <main class="main">
    <div>
      <img
        v-if="image_path"
        :src="image_path"
        alt="dialog-image"
        width="100%"
      />
    </div>

    <div class="text-center mt-2 mb-2">
      <v-btn outlined @click="$emit('detail_dialog', false)">
        {{ $t('GALLERY.CLOSE') }}
      </v-btn>
    </div>
  </main>
</template>

<script>
export default {
  name: 'MGalleryDetail',
  props: ['image_path'],
  data() {
    return {}
  },
  mounted() {},
}
</script>

<style scoped lang="scss">
.main {
  img {
    max-width: 100%;
    object-fit: cover;
  }
}
</style>
