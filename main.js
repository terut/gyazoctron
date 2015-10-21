var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  const Screen = require('screen');
  const size = Screen.getPrimaryDisplay().size

  mainWindow = new BrowserWindow({
    left: 0,
    top: 0,
    width: size.width,
    height: size.height,
    frame: false,
    show: true,
    transparent: true,
    resizable: false,
    'always-on-top': true
  });

  mainWindow.maximize()

  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
