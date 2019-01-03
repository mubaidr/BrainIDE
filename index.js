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
const { Menu } = require('electron')

const template = [
    {
        label: 'IDE',
        submenu: [
            { id: "1", label: 'Start' },
            { id: "2", label: 'Stop' }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
