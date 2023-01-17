import fs from 'fs'
import path from 'path'
import pluginutils from '@rollup/pluginutils'
import { type PluginOption } from 'vite'

export type Img2B64PluginOptions = {
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]
  limit?: number
  dom?: boolean
}

const defaults: Img2B64PluginOptions = {
  dom: false,
}

const mimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

const domTemplate = function (ref: { dataUri: any }) {
  const dataUri = ref.dataUri

  return (`\n  var img = new Image();\n  img.src = "${dataUri}";\n  export default img;\n`)
}

const constTemplate = function (ref: { dataUri: any }) {
  const dataUri = ref.dataUri

  return (`\n  var img = "${dataUri}";\n  export default img;\n`)
}

const getDataUri = function (ref: { format: any; mime: any; source: any }) {
  const format = ref.format
  const mime = ref.mime
  const source = ref.source

  return `data:${mime};${format},${source}`
}

function imageToBase64Plugin(opts?: Img2B64PluginOptions): PluginOption {
  if (!opts)
    opts = {}

  const options = Object.assign({}, defaults, opts)
  const filter = pluginutils.createFilter(options.include, options.exclude)

  return {
    name: 'image',
    enforce: 'pre',
    load: function load(id: string) {
      if (!filter(id))
        return null

      const mime = mimeTypes[path.extname(id)]
      if (!mime) {
        // not an image
        return null
      }
      if (!options.limit)
        options.limit = 8192
      const size = fs.statSync(id).size
      if (options.limit < 0) {
        if (size > 8192)
          console.warn(`[imageToBase64Plugin] ${id} is too big (${size}), it will be inlined as base64 string`)
      }
      else if (size > options.limit) {
        // file is too big
        return null
      }

      const format = 'base64'
      const source = fs.readFileSync(id, format).replace(/[\r\n]+/gm, '')

      const dataUri = getDataUri({ format, mime, source })
      const code = options.dom ? domTemplate({ dataUri }) : constTemplate({ dataUri })

      return code.trim()
    },
  }
}

export default imageToBase64Plugin
