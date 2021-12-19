const electron = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const CreateWindow = () => {
  let win = new BrowserWindow({ show: false, icon: "%PUBLIC_URL%/client.ico" });
  win.maximize();
  win.show();
  win.setMenuBarVisibility(false);
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  win.on("close", () => {
    win = null;
  });
};

app.on("ready", CreateWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    CreateWindow();
  }
});
