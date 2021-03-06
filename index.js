const postcss = require('postcss')
let {plugins, options} = require('./lib/config')

const run = (input) => {
  return postcss(plugins)
    .process(input, options)
    .then(result => {
      result.warnings().forEach(warn => console.warn(warn.toString()))
      return result.css
    })
}

const style = async ({content}) => {
  if (!plugins.length) return
  let code
  await run(content)
    .then(css => code = css)
  return { code }
}

const sveltePostcssPlugin = (plugs = false, opts = false) => {
  if (typeof opts === 'object')
    options = opts
  if (Array.isArray(plugs) && plugs.length)
    plugins = plugs
  return {style, run}
}

sveltePostcssPlugin.style = style
sveltePostcssPlugin.run = run

module.exports = sveltePostcssPlugin
