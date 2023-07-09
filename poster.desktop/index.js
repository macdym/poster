const { app, BrowserWindow } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // Jeśli używasz Reacta z wersją 16.0 i wyższą, zmień na false i zaimplementuj kontekst mostu
    },
  });

  mainWindow.loadURL('http://localhost:6001/');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);