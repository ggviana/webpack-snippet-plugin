const fs = require('fs')
const ejs = require('ejs')

const defaultOptions = {
  data: {},
  path: undefined,
  template: ''
}

function WebpackSnippetPlugin (options) {
  this.options = Object.assign({}, defaultOptions, options)

  const template = fs.readFileSync(this.options.template).toString()
  
  this.compiler = ejs.compile(template)
}

WebpackSnippetPlugin.prototype.apply = function (compiler) {
  const plugin = this

  function processFile () {
    if (plugin.options.path) {
      const compiled = plugin.compiler(plugin.options.data)
      fs.writeFileSync(plugin.options.path, compiled)
    }
  }

  compiler.plugin('compilation', processFile)
}

module.exports = WebpackSnippetPlugin