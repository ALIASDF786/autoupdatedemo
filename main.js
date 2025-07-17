const { app, BrowserWindow } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

log.transports.file.resolvePathFn = () => path.join("D:/malia/autoUpdateDemo", 'logs/main.log');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});



autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
    log.info('Update available:', info);
});

autoUpdater.on('update-not-available', (info) => {
    log.info('No update available:', info);
});

autoUpdater.on('error', (err) => {
    log.error('Error in auto-updater:', err);
});

autoUpdater.on('download-progress', (progressObj) => {
    log.info(`Download speed: ${progressObj.bytesPerSecond}`);
    log.info(`Downloaded ${progressObj.percent}%`);
});

autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded. Will quit and install.');
    autoUpdater.quitAndInstall();
});
