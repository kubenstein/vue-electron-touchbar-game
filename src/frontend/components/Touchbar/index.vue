<template>
  <v-stage id="app" :config="{ width: 1038, height: 32 }">
    <v-layer>
      <KonvaImage :x="0" :y="0" :url="bgUrl" />
      <Logo />
      <KonvaImage :x="x" :y="y" :url="url" />
    </v-layer>
  </v-stage>
</template>

<script>
import Logo from "../Logo/index";
import KonvaImage from "../KonvaImage/index";
import komojuFrontUrl from "../../assets/komoju-front.png";
import komojuBackUrl from "../../assets/komoju-back.png";
import bgUrl from "../../assets/bg.png";

export default {
  components: {
    Logo,
    KonvaImage,
  },

  data() {
    return {
      dinoSpeed: 5,
      x: 50,
      direction: 1,
      position: 1,
    };
  },

  computed: {
    bgUrl: () => bgUrl,

    url() {
      return this.direction === 1 ? komojuBackUrl : komojuFrontUrl;
    },

    y() {
      return this.position === 1 ? 0 : 16;
    },
  },

  mounted() {
    document.addEventListener("electron-bridge-touchbar-tapped", () => {
      this.position *= -1;
    });

    setInterval(() => {
      if (this.direction === 1) {
        this.x = this.x + this.dinoSpeed;
      } else {
        this.x = this.x + this.dinoSpeed * -1;
      }

      if (this.x > 700 || this.x < 50) this.direction *= -1;
    }, 1000 / 30);
  },
};
</script>

<style></style>
