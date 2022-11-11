<template>
  <div>
    <v-img
      v-for="image of images"
      :src="image.image_path"
      :id="image.id"
      :key="image.id"
      :lazy-src="image.image_path"
      alt="mockup-home"
      width="100%"
    />
  </div>
</template>

<script>
export default {
  name: 'MAboutUs',
  data() {
    return {
      images: [
        {
          id: 'cmlc-aboutus-mobile-1',
          image_path: '/images/mockup/cmlc-aboutus-mobile-1.png',
        },
        {
          id: 'cmlc-aboutus-mobile-2',
          image_path: '/images/mockup/cmlc-aboutus-mobile-2.png',
        },
        {
          id: 'cmlc-aboutus-mobile-3',
          image_path: '/images/mockup/cmlc-aboutus-mobile-3.png',
        },
        {
          id: 'cmlc-aboutus-mobile-4',
          image_path: '/images/mockup/cmlc-aboutus-mobile-4.png',
        },
        {
          id: 'cmlc-aboutus-mobile-5',
          image_path: '/images/mockup/cmlc-aboutus-mobile-5.png',
        },
        {
          id: 'cmlc-aboutus-mobile-6',
          image_path: '/images/mockup/cmlc-aboutus-mobile-6.png',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss"></style>
