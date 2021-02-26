const { ipcRenderer } = require("electron");

document.addEventListener("electron-bridge", (e) => {
  const { name, data } = e.detail;
  ipcRenderer.send(name, data);
});

ipcRenderer.on("electron-bridge-touchbar-tapped", () => {
  document.dispatchEvent(new CustomEvent("electron-bridge-touchbar-tapped"));
});
