import Vue from "vue";
import VueKonva from "vue-konva";
import Game from "./components/Game/index.vue";

Vue.use(VueKonva);

// wait for fonts
setTimeout(() => {
  new Vue({
    el: "#app",
    render: (h) => h(Game),
  });
}, 1000);

const renderOnTouchbar = () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const context = canvas.getContext("2d");
  context.imageSmoothingQuality = "high";
  const data = canvas.toDataURL("image/png", 1);
  document.dispatchEvent(new CustomEvent("electron-bridge", { detail: { name: "rerender", data } }));
};

const mainLoop = () => {
  setInterval(() => {
    renderOnTouchbar();
  }, 1000 / 30);
};

// go!
mainLoop();
