<template>
  <v-image
    :config="{
      image,
      x,
      y,
    }"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      image: null,
    };
  },

  watch: {
    url() {
      this.loadImage();
    },
  },
  mounted() {
    this.loadImage();
  },

  methods: {
    loadImage() {
      const image = new window.Image();
      image.src = this.url;
      image.onload = () => {
        this.image = image;
      };
    },
  },
};
</script>

<style></style>
