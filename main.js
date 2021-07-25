const { app, BrowserWindow, Menu, MenuItem, globalShortcut } = require('electron')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
process.env['APP_DATA'] = (app || require("electron").remote.app).getPath("userData");

const initialize = require("./electron_processes/initialize.js");

// If in development use electron-reload to watch for
// changes in the current directory
if (process.env.NODE_ENV === "dev") {
    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`),
        ignored: [/node_modules|[\/\\]\./, /data.db/]
    });
}

const menu = new Menu();
menu.append(new MenuItem({
    label: "Napster",
    submenu: [
    {
        label: "Quit",
        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'CTRL+Q',
        click: () => {
            app.quit()
        }
    }]
}));
Menu.setApplicationMenu(menu);

app.on("ready", () => {
    // database call here and loop through each playlist and create a 
    initialize.initializeWindowsWithPlaylists();

    if (process.platform === 'darwin') {
    }
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) initialize.createWindow()
    });
})

app.on('window-all-closed', function () {
    initialize.quit();
    app.quit()
});
