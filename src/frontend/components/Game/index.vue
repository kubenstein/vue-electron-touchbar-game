<template>
  <v-stage id="app" :config="{ width: 1038, height: 32 }">
    <v-layer>
      <KonvaImage :x="0" :y="0" :url="bgUrl" />
      <Logo v-if="state === 'PLAY'" />
      <Score v-if="state === 'PLAY'" :value="score" />
      <KonvaImage :x="dinoX" :y="dinoY" :url="dinoUrl" />
      <KonvaImage
        v-for="missile in missiles"
        :key="missile.id"
        :x="missile.x"
        :y="missile.position === 1 ? 0 : 16"
        :url="missileUrl"
      />
      <GameOver v-if="state === 'GAME_OVER'" :value="score" />
    </v-layer>
  </v-stage>
</template>

<script>
import Logo from "../Logo/index";
import Score from "../Score/index";
import GameOver from "../GameOver/index";
import KonvaImage from "../KonvaImage/index";
import komojuFrontUrl from "../../assets/komoju-front.png";
import komojuBackUrl from "../../assets/komoju-back.png";
import missileUrl from "../../assets/missile.png";
import bgUrl from "../../assets/bg.png";

export default {
  components: {
    Logo,
    GameOver,
    Score,
    KonvaImage,
  },

  data() {
    return {
      state: "PLAY",
      interval: null,
      totalMissilesCount: 0,
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

    score() {
      return this.totalMissilesCount - this.missiles.length;
    },
  },

  watch: {
    state(newValue) {
      if (newValue === "GAME_OVER") this.endGame();
      if (newValue === "PLAY") this.startGame();
    },
  },

  mounted() {
    document.addEventListener("electron-bridge-touchbar-tapped", () => {
      this.dinoPosition *= -1;
      this.state = "PLAY";
    });
    this.startGame();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    startGame() {
      this.totalMissilesCount = 0;
      this.missiles = [];
      this.lastMissileTimestamp = 0;
      this.dinoX = 50;
      this.dinoDirection = 1;
      this.dinoPosition = 1;
      this.interval = setInterval(() => {
        this.moveDino();
        this.moveMissiles();
        this.spawnMissiles();
        this.checkCollision();
      }, 1000 / 30);
    },

    endGame() {
      clearInterval(this.interval);
    },

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
        this.totalMissilesCount += 1;
        this.lastMissileTimestamp = Date.now();
        this.missiles.push(newMissile);
      }
    },

    checkCollision() {
      this.missiles.forEach((missile) => {
        if (this.hit(missile)) {
          this.state = "GAME_OVER";
        }
      });
    },

    hit(missile) {
      if (missile.position !== this.dinoPosition) return false;
      if (missile.x > this.dinoX - 3 && missile.x < this.dinoX + 16 + 3) return true;
      return false;
    },
  },
};
</script>

<style></style>
