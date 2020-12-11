const chokidar = require('chokidar')
const { spawn, execSync } = require('child_process')
const { main } = require('../package.json')

let debounceTimeout
const debounce = (fx) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(fx, 500)
}

console.log('Clearing build area...')
execSync('rm -rf build')

console.log('Starting build process...')
const buildProc = spawn('npm', ['run', 'build', '--', '--watch'], {
  stdio: 'inherit',
})

let serveProc

chokidar.watch('build').on('all', (event, path) => {
  debounce(async () => {
    if (serveProc && !serveProc.exitCode) {
      console.log('Shutting down server...')
      serveProc.kill()

      serveProc.on('exit', () => {
        console.log('Server shut down successfully')
        startServer()
      })
    } else {
      startServer()
    }
  })
})

const startServer = () => {
  console.log('Starting server...')
  serveProc = undefined
  serveProc = spawn('node', [main], {
    stdio: 'inherit',
    // env: lessEnv,
  })
}

// exec('npm run build -- --watch', {
//   stdio: 'inherit',
// }, (err) => {
//   console.log('error', err)
// })

// nodemon({ script: 'build/index.js' }).on('start', () => {
//   console.log('started?')
// })
