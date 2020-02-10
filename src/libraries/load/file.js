import recursiveReaddirSync from 'recursive-readdir-sync'
import fs from 'fs'
const loadFromArray = (path, extensionList, files) => {
  const matcher = (path, extensionList) => {
    let matchedExtension = false
    for (let extension of extensionList) {
      if (path.indexOf('.' + extension + '.') !== -1) {
        matchedExtension = extension
        break
      }
    }
    return matchedExtension
  }
  let initObject = {}
  for (let key in extensionList) {
    initObject[extensionList[key]] = {}
  }

  files = files.reduce((current, next) => {
    let matchedExtension = matcher(next, extensionList)
    if (matchedExtension) {
      let config = require(next)
      let configName = next
        .replace(path, '')
        .replace('/', '')
        .split('.')[0]
      current[matchedExtension][configName] = config
    }
    return current
  }, initObject)
  return files
}

const loadFromString = (path, extension, files) => {
  files = files.reduce((current, next) => {
    if (next.indexOf('.' + extension + '.') !== -1 && next.indexOf('.map') === -1) {
      let config = require(next)
      let configName = next
        .replace(path, '')
        .replace('/', '')
        .split('.')[0]
      current[configName] = config
    }
    return current
  }, {})
  return files
}

module.exports = function load(path, extension) {
  if (fs.existsSync(path)) {
    let files = recursiveReaddirSync(path)
    const isMultipleExtension = typeof extension === 'object'
    const loader = isMultipleExtension ? loadFromArray : loadFromString
    return loader(path, extension, files)
  }
}
