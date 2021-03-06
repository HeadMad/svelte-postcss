const path = require('path')
const fs = require('fs')
const rootPath = __dirname.substring(0, __dirname.indexOf('node_modules'))
const configs = ['postcss.config.js', 'package.json']

const isFile = (dir, file) => {
  let result = false
  const filePath = dir + file
  result = fs.existsSync(filePath)
  return result
}

const getConfig = () => {
  let file = configs.find(fl => isFile(rootPath, fl))
  if (!file) return {}
  
  let isPackage = file === 'package.json'
  let configFile = rootPath + file
  const config = require(configFile)

  if (!isPackage)
    return config
  else if (config.postcss)
    return config.postcss
  else
  return {}
}

const getPlugins = (plugins) => {
  const stack = []
  if (plugins)
  for (const key in plugins)
  stack.push(require(key)(plugins[key]))
  return stack
}

const getOptions = (config) => {
  const stack = {from: undefined}
  for (const key in config) 
    if (key !== 'plugins')
      stack[key] = config[key]
  return stack
}

const config = getConfig()
const options = getOptions(config)
const plugins = getPlugins(config.plugins)


module.exports = {plugins, options}