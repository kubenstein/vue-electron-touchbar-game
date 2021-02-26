import Vue from "vue";
import VueKonva from "vue-konva";
import Touchbar from "./components/Touchbar/index.vue";

Vue.use(VueKonva);

// wait for fonts
setTimeout(() => {
  new Vue({
    el: "#app",
    render: (h) => h(Touchbar),
  });
}, 1000);

document.addEventListener("electron-bridge-touchbar-tapped", () => {
  console.log("touchbar tapped");
});

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
  }, 100);
};

// go!
mainLoop();
