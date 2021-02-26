const path = require("path");
const { app, BrowserWindow, TouchBar, nativeImage, ipcMain } = require("electron");

const { TouchBarButton } = TouchBar;

let b;
const touchBar = new TouchBar({
  items: [
    (b = new TouchBarButton({
      label: "loading...",
      click: console.log,
    })),
  ],
});

let window;

app.whenReady().then(() => {
  window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1138,
    height: 500,
  });
  window.webContents.openDevTools();
  window.loadFile(path.join(__dirname, "./index.html"));
  window.setTouchBar(touchBar);

  ipcMain.on("newImage", (event, arg) => {
    b.label = "";
    b.icon = nativeImage.createFromDataURL(arg);
  });
});
