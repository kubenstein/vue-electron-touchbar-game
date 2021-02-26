<template>
  <v-text
    :config="{
      text: `Score: ${value}`,
      x: 900,
      y: 1,
      fontSize: 14,
      fontFamily: 'Press Start 2P',
      fill: '#718F78',
      shadowColor: '#DDD09B',
      shadowOffsetX: 2,
      shadowOffsetY: 2,
    }"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style></style>
