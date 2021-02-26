import glyph from "./assets/glyph.png";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = glyph;
canvas.width = 1038;
canvas.height = 32;
ctx.imageSmoothingQuality = "high";
let color;
let x = 0;

setInterval(() => {
  color = color === "white" ? "red" : "white";
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.font = "12px Roboto";
  ctx.fillStyle = color;
  ctx.fillText("Touch bar game demo....", 40, 11);
  ctx.font = "600 16px Roboto";
  ctx.fillText("Open Hack Day Degica", 40 + x, 29);
  const data = canvas.toDataURL("image/png", 1);
  document.dispatchEvent(new CustomEvent("electron-bridge", { detail: { name: "rerender", data } }));
}, 100);

document.addEventListener("electron-bridge-touchbar-tapped", () => {
  x += 10;
});
