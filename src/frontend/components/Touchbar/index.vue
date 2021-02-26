<template>
  <v-stage id="app" :config="{ width: 1038, height: 32 }">
    <v-layer>
      <KonvaImage :x="0" :y="0" :url="bgUrl" />
      <Logo />
      <KonvaImage :x="dinoX" :y="dinoY" :url="dinoUrl" />
      <KonvaImage
        v-for="missile in missiles"
        :key="missile.id"
        :x="missile.x"
        :y="missile.position === 1 ? 0 : 16"
        :url="missileUrl"
      />
    </v-layer>
  </v-stage>
</template>

<script>
import Logo from "../Logo/index";
import KonvaImage from "../KonvaImage/index";
import komojuFrontUrl from "../../assets/komoju-front.png";
import komojuBackUrl from "../../assets/komoju-back.png";
import missileUrl from "../../assets/missile.png";
import bgUrl from "../../assets/bg.png";

export default {
  components: {
    Logo,
    KonvaImage,
  },

  data() {
    return {
      missiles: [],
      missileSpeed: 5,
      lastMissileTimestamp: 0,
      dinoSpeed: 3,
      dinoX: 50,
      dinoDirection: 1,
      dinoPosition: 1,
    };
  },

  computed: {
    bgUrl: () => bgUrl,
    missileUrl: () => missileUrl,

    dinoUrl() {
      return this.dinoDirection === 1 ? komojuBackUrl : komojuFrontUrl;
    },

    dinoY() {
      return this.dinoPosition === 1 ? 0 : 16;
    },
  },

  mounted() {
    document.addEventListener("electron-bridge-touchbar-tapped", () => {
      this.dinoPosition *= -1;
    });

    setInterval(() => {
      this.moveDino();
      this.moveMissiles();
      this.spawnMissiles();
    }, 1000 / 30);
  },

  methods: {
    moveDino() {
      if (this.dinoDirection === 1) {
        this.dinoX = this.dinoX + this.dinoSpeed;
      } else {
        this.dinoX = this.dinoX + this.dinoSpeed * -1;
      }

      if (this.dinoX > 700 || this.dinoX < 50) this.dinoDirection *= -1;
    },
    moveMissiles() {
      this.missiles = this.missiles
        .map((missile) =>
          Object.assign({}, missile, {
            x: missile.x - this.missileSpeed,
          })
        )
        .filter((missile) => missile.x > -16);
    },
    spawnMissiles() {
      const shouldSpawn = Math.random() * 100 < 3 && this.lastMissileTimestamp - Date.now() < -500;

      if (shouldSpawn) {
        const newMissile = {
          id: `${Math.random()}`,
          x: 1040,
          position: Math.random() * 100 < 50 ? 1 : 0,
        };
        this.lastMissileTimestamp = Date.now();
        this.missiles.push(newMissile);
      }
    },
  },
};
</script>

<style></style>
