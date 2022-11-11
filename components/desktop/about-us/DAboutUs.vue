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
  name: 'DAboutUs',
  data() {
    return {
      images: [
        {
          id: 'cmlc-aboutus-1',
          image_path: '/images/mockup/cmlc-aboutus-1.png',
        },
        {
          id: 'cmlc-aboutus-2',
          image_path: '/images/mockup/cmlc-aboutus-2.png',
        },
        {
          id: 'cmlc-aboutus-3',
          image_path: '/images/mockup/cmlc-aboutus-3.png',
        },
        {
          id: 'cmlc-aboutus-4',
          image_path: '/images/mockup/cmlc-aboutus-4.png',
        },
        {
          id: 'cmlc-aboutus-5',
          image_path: '/images/mockup/cmlc-aboutus-5.png',
        },
        {
          id: 'cmlc-aboutus-6',
          image_path: '/images/mockup/cmlc-aboutus-6.png',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss"></style>
