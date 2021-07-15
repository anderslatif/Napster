const { app, BrowserWindow, Menu, MenuItem, globalShortcut } = require('electron')
const path = require('path')
const initialize = require("./electron_processes/initialize.js");
const eventHandler = require("./electron_processes/eventHandler.js");
const storage = require("./electron_processes/storage.js");

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
process.env['APP_DATA'] = (app || require("electron").remote.app).getPath("userData");

// If in development use electron-reload to watch for
// changes in the current directory
if (process.env.NODE_ENV === "dev") {
    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`),
        ignored: [/node_modules|[\/\\]\./, /data.db/]
    });
}


const dockMenu = Menu.buildFromTemplate([
    {
        label: "New Window",
        click: initialize.createWindow
    }
]);

const menu = new Menu();
menu.append(new MenuItem({
    label: "Napster",
    submenu: [{
        label: "New Window",
        accelerator: process.platform === 'darwin' ? 'Cmd+N' : 'CTRL+N',
        click: initialize.createWindow
    }, 
    {
        label: "Quit",
        role: "close",
    }]
}));
Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
    // database call here and loop through each playlist and create a 
    initialize.initializeWindowsWithPlaylists(storage);
    if (process.platform === 'darwin') {
        app.dock.setMenu(dockMenu);
        
        globalShortcut.register('Command+Q', () => {
            app.quit();
        });
    }
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) initialize.createWindow()
    });
})

app.on('window-all-closed', function () {
    app.quit()
});
