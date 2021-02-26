import path from "path";
import { app, BrowserWindow, TouchBar, nativeImage, ipcMain } from "electron";

const { TouchBarButton } = TouchBar;

app.whenReady().then(() => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1138,
    height: 500,
  });
  window.webContents.openDevTools();
  window.loadFile(path.join(__dirname, "./index.html"));

  ipcMain.on("rerender", (_event, arg) => {
    screenBtn.label = "";
    screenBtn.icon = nativeImage.createFromDataURL(arg);
  });

  const screenBtn = new TouchBarButton({
    label: "loading...",
    click: () => {
      window.webContents.send("electron-bridge-touchbar-tapped");
    },
  });

  const touchBar = new TouchBar({
    items: [screenBtn],
  });

  window.setTouchBar(touchBar);
});
