const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const NodeHookAddon = require('../../iohook/build/Release/iohook.node')

NodeHookAddon.startHook((event) => {
  if (event !== undefined && event.type <= 5) {
    console.log(event)
  }
}, true)

// const iohook = require('../iohook/index.js')

// iohook.on('keypress', event => {
//   console.log(event)
// })

// iohook.start(true)

// let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 800px
    width: 800,
    // Set the initial height to 600px
    height: 600,
    // Set the default background color of the window to match the CSS
    // background color of the page, this prevents any white flickering
    backgroundColor: "#D6D8DC",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false
  })

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Show window when page is ready
  window.once('ready-to-show', () => {
    window.show()
  })

  // window.on('focus', () => {
  //   NodeHookAddon.stopHook()
  // })

  // window.on('blur', () => {
  //   NodeHookAddon.startHook((event) => {
  //     console.log(event)
  //   }, true)
  // })
})

app.on('before-quit', () => {
  console.log(NodeHookAddon);

  NodeHookAddon.stopHook()
})
