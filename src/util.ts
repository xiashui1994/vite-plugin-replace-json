import { Config } from './types'

export function optionsCheck (options: Config[]): boolean {
  if (!options.length) {
    throw new Error('You must provide at least one config')
  }
  options.forEach(option => {
    if (!option.path) {
      throw new Error('You must provide a path')
    }
    if (!option.replace) {
      throw new Error('You must provide a replace')
    }
  })
  return true
}

export function replaceJson (path: string, value: number | string | boolean, file: string) {
  const arr = path.split('.')
  const len = arr.length
  const lastItem = arr[len - 1]

  let i = 0
  let JsonArr = file.split(/\n/)

  for (let index = 0; index < JsonArr.length; index++) {
    const item = JsonArr[index]
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i
    if (i === len) {
      const hasComma = /,/.test(item)
      JsonArr[index] = item.replace(new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`), `"${lastItem}": ${value}${hasComma ? ',' : ''}`)
      break
    }
  }

  return JsonArr.join('\n')
}
