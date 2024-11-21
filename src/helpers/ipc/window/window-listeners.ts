import { BrowserWindow, ipcMain } from "electron";
import { WIN_CLOSE_CHANNEL, WIN_MAXIMIZE_CHANNEL, WIN_MINIMIZE_CHANNEL } from "./window-channels";
let idleTimer: any;
const idleTimeout = 30000; // 150 seconds for idle timeout

export function addWindowEventListeners(mainWindow: BrowserWindow) {
    ipcMain.handle(WIN_MINIMIZE_CHANNEL, () => {
        mainWindow.minimize();
    });
    ipcMain.handle(WIN_MAXIMIZE_CHANNEL, () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });
    ipcMain.handle(WIN_CLOSE_CHANNEL, () => {
        mainWindow.close();
    });
    // Function to reset idle timer
    const resetIdleTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            mainWindow.webContents.send('user-idle');
        }, idleTimeout);
    };

    // Monitor user activity in the renderer process via IPC
    ipcMain.on('user-activity', resetIdleTimer);
}

