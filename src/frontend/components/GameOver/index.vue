<template>
  <v-group>
    <v-text
      :config="{
        text: `Your score is: ${value}`,
        x: 450,
        y: 0,
        fontSize: 14,
        fontFamily: 'Press Start 2P',
        fill: '#718F78',
        shadowColor: '#DDD09B',
        shadowOffsetX: 2,
        shadowOffsetY: 2,
      }"
    />
    <v-text
      :config="{
        text: `GAME OVER`,
        x: 500,
        y: 16,
        fontSize: 14,
        fontFamily: 'Press Start 2P',
        fill: '#718F78',
        shadowColor: '#DDD09B',
        shadowOffsetX: 2,
        shadowOffsetY: 2,
      }"
    />
  </v-group>
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
