import { Plugin } from 'vite'
import { Config } from './types'
import { optionsCheck, replaceJson } from './util'
const fs = require('fs')

export default function vitePluginReplaceJson(options: Config[]): Plugin {
  const name = 'vite-plugin-replace-json'
  if (!optionsCheck(options)) {
    return { name }
  }
  return {
    name,
    enforce: 'pre',
    config() {
      options.forEach(option => {
        const { path, replace } = option
        try {
          let file = fs.readFileSync(path, { encoding: 'utf-8' })
          for (const key in replace) {
            file = replaceJson(key, replace[key], file)
          }
          fs.writeFileSync(path, file, { "flag": "w" })
        } catch (err: any) {
          throw new Error(err)
        }
      })
    }
  }
}
