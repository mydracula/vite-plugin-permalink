import { normalizePath, type PluginOption, type ViteDevServer } from 'vite'
import { glob } from 'glob'
import { resolve } from 'path'
import picomatch from 'picomatch'
import fs from 'fs'
import matter from 'gray-matter'
import crc16 from './crc16'
import model from './model'

function normalizePaths(root: string, path: any) {
  return (Array.isArray(path) ? path : [path]).map((path) => resolve(root, path)).map(normalizePath)
}

function setAbbrLink(folderPath: string[] | string) {
  console.log('监听到了', folderPath)
  // const opt_alg = 'crc16'
  // const opt_rep = 'dec'
  const files = glob.sync(folderPath)
  for (const file of files) {
    const content = matter.read(file)
    let { abbrlink, title } = content.data
    if (!abbrlink) {
      const res = crc16(title) >>> 0
      abbrlink = model.check(res)
      const updatedContent = matter.stringify(content.content, {
        ...content.data,
        abbrlink
      })
      fs.writeFileSync(file, updatedContent, 'utf-8')
    }
    model.add(abbrlink)
  }
}

export default function vitePluginPermalink(paths: string[] | string): PluginOption {
  const files = normalizePaths(process.cwd(), paths)
  return {
    // 插件名称
    name: 'vite-plugin-permalink',
    enforce: 'pre',
    config: () => ({
      server: {
        watch: {
          disableGlobbing: false
        }
      }
    }),
    configureServer({ watcher }: ViteDevServer) {
      const shouldReload = picomatch(files)
      const checkReload = (path: string) => {
        if (shouldReload(path)) {
          setAbbrLink(path)
        }
      }
      watcher.add(files)
      watcher.on('add', checkReload)
      watcher.on('change', checkReload)
    },

    buildStart() {
      setAbbrLink(files)
    }
  }
}
