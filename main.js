const { app, BrowserWindow, Menu, MenuItem, globalShortcut } = require('electron');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
process.env['APP_DATA'] = (app || require("electron").remote.app).getPath("userData");

const initialize = require("./electron_processes/initialize.js");
const { handleNewPaths, handleUndoDeletePlaylist } = require("./electron_processes/ipcMainHandler.js");

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
        accelerator: process.platform === 'darwin' ? 'CMD+Q' : 'CTRL+Q',
        click: () => {
            console.log("********************");
            app.quit()
        }
    },
    {
        label: "Turn Debug On",
        accelerator: process.platform === 'darwin' ? 'CMD+D' : 'CTRL+D',
        click: () => {
            window.webContents.openDevTools();
        }
    },
    {
        label: `Open in ${process.platform === 'darwin' ? 'Finder' : 'File Explorer'}. Click not supported. Use the shortcut.`,
        accelerator: process.platform === 'darwin' ? 'CMD+O' : 'CTRL+O',
     },
    {
        label: "Undo Deleted Tab",
        accelerator: process.platform === 'darwin' ? 'CMD+T' : 'CTRL+T',
        click: () => {
            handleUndoDeletePlaylist(window);
        }
    }, 
    {
        label: "Stop video. Click not supported. Use the shortcut.",
        accelerator: 's'
    },
    , 
    {
        label: "Show playlist pane in video view. Click not supported. Use the shortcut.",
        accelerator: 'l'
    }]
}));
Menu.setApplicationMenu(menu);

let window;

app.on("ready", async () => {
    app.on("open-file", (event, path) => {
        handleNewPaths(path);
    });    

    // database call here and loop through each playlist and create a 
    window = await initialize.initializeWindowsWithPlaylists();

    if (process.platform === 'darwin') {
    }
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) initialize.createWindow(files)
    });
});

function quitApplication() {
    app.quit();
}


app.on('window-all-closed', () => {
    app.quit();
});

module.exports = {
    quitApplication
};
