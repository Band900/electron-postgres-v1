
const { app, BrowserWindow } = require('electron')
const cmd = require('node-cmd')
var os = require('os')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  installPg()
  mainWindow.loadFile('index.html')
}

function installPg() {
  const opsys = process.platform
  const checkVersionPg = cmd.runSync('psql --version')

  if (opsys == "darwin") {
    opsys = "MacOS";
  } else if (opsys == "win32" || opsys == "win64") {
    opsys = "Windows";
  } else if (opsys == "linux") {
    opsys = "Linux";
  }

  if (checkVersionPg.data) {
    console.log("INSTALL")
  } else {
    console.log("NOT INSTALL")
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})