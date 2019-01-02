/*
  * Electron script for BrainIDE
  * Copyright 2019 (c) Misha Marinenko
  * ./index.js
*/
const { app, BrowserWindow, Menu } = require('electron');
let win;
/*
// TODO Our own menu
const menu = Menu.buildFromTemplate([
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' }
        ]
    }
])
Menu.setApplicationMenu(menu)
*/
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
