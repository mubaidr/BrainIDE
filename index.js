/*
  * Electron script for BrainIDE
  * Copyright 2019 (c) Misha Marinenko
  * ./index.js
*/
const { app, BrowserWindow } = require('electron');
let win;

function createWindow() {
    win = new BrowserWindow({ width: 1024, height: 600, title: "BrainIDE" });
    win.loadFile('app/index.html');
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
