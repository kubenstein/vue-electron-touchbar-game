<template>
  <v-stage id="app" :config="{ width: 1038, height: 32 }">
    <v-layer>
      <v-rect :config="{ x: 0, y: 0, width: 1038, height: 32, fill: 'white' }" />
      <v-text
        :config="{ text: 'Hello Degica', x: 50, y: 10, fontSize: 14, fontFamily: 'Press Start 2P', fill: 'black' }"
      />

      <KonvaImage :x="10" :y="0" :url="url" />
    </v-layer>
  </v-stage>
</template>

<script>
import KonvaImage from "../KonvaImage/index";
import komojuUrl from "../../assets/komoju.png";
export default {
  components: {
    KonvaImage,
  },

  computed: {
    url() {
      return komojuUrl;
    },
  },
};
</script>

<style></style>
