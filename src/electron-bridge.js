const { ipcRenderer } = require("electron");
document.addEventListener("electron-bridge", (e) => {
  const { name, data } = e.detail;
  ipcRenderer.send(name, data);
});
