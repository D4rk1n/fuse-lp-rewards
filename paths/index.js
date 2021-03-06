const path = require('path')

const PATH_ROOT = path.resolve(__dirname, './')
const PATH_DIST = path.resolve(PATH_ROOT, 'dist')
const PATH_NPM = path.resolve(PATH_ROOT, 'node_modules')
const PATH_SRC = path.resolve(PATH_ROOT, 'src')

module.exports = {
  PATH_ROOT,
  PATH_DIST,
  PATH_NPM,
  PATH_SRC
}
