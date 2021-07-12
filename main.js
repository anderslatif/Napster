const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const path = require('path')
const url = require('url')


process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
process.env['APP_DATA'] = (app || require("electron").remote.app).getPath("userData");

let isDev = process.env.NODE_ENV === "dev";
// If in development use electron-reload to watch for
// changes in the current directory
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`),
        ignored: [/node_modules|[\/\\]\./, /data.db/]
    });
}


const dockMenu = Menu.buildFromTemplate([
    {
        label: "New Window",
        click: createWindow
    }
]);

const menu = new Menu();
menu.append(new MenuItem({
    label: "Napster",
    submenu: [{
        label: "New Window",
        accelerator: process.platform === 'darwin' ? 'Cmd+N' : 'CTRL+N',
        click: createWindow
    }, 
    {
        label: "Quit",
        role: "close",
    }]
}));
Menu.setApplicationMenu(menu);

function createWindow() {
    // Create the browser window with node integration
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // enableRemoteModule: true,
            // backgroundThrottling: false
        }
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'public/index.html'),
            protocol: 'file:',
            slashes: true
        })
    )

    // Open the DevTools only if app is in development
    if (isDev || true)
        win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow();
    if (process.platform === 'darwin') {
        app.dock.setMenu(dockMenu)
    }
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
})

app.on('window-all-closed', function () {
    app.quit()
});
