<template>
  <v-group>
    <KonvaImage :x="200" :y="0" :url="komojuBackUrl" />
    <v-text
      :config="{
        text: `WELCOME TO THE KOMOJU RUNNER!!!`,
        x: 300,
        y: 0,
        fontSize: 14,
        fontFamily: 'Press Start 2P',
        fill: '#718F78',
        shadowColor: '#DDD09B',
        shadowOffsetX: 2,
        shadowOffsetY: 2,
      }"
    />
    <KonvaImage :x="800" :y="0" :url="komojuFrontUrl" />
  </v-group>
</template>

<script>
import KonvaImage from "../KonvaImage/index";
import komojuFrontUrl from "../../assets/komoju-big-front.png";
import komojuBackUrl from "../../assets/komoju-big-back.png";

export default {
  components: {
    KonvaImage,
  },

  computed: {
    komojuFrontUrl: () => komojuFrontUrl,
    komojuBackUrl: () => komojuBackUrl,
  },
};
</script>

<style></style>
