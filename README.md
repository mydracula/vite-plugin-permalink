<h2 align='center'><samp>vite-plugin-permalink</samp></h2>

<p align='center'>Add the abbrlink attribute to the markdown file in the specified directory</p>

<p align='center'>
  <a href='https://www.npmjs.com/package/vite-plugin-permalink'>
    <img src='https://img.shields.io/npm/v/vite-plugin-permalink?color=222&style=flat-square'>
  </a>
  <a href='https://www.npmjs.com/package/vite-plugin-permalink'>
    <img src='https://img.shields.io/badge/license-MIT-blue.svg'>
  </a>
</p>

<br>

[hexo-abbrlink]: https://github.com/Rozbo/hexo-abbrlink
[Vite]: https://github.com/vitejs/vite
[picomatch]: https://github.com/micromatch/picomatch#globbing-features

## Why? 🤔

When using _[Vite]_, I want to listen to the specified directory and automatically add permalink to each markdown article, suitable for static blogs built with vite.

## Installation 💿

Install the package as a development dependency:

```bash
npm i vite-plugin-permalink
```

## Usage 🚀

Add it to your plugins in `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import permalinkPlugin from 'vite-plugin-permalink'

export default defineConfig({
  plugins: [
    plugins: [permalinkPlugin(['src/content/**/*.md'])]
  ],
})
```

To see which file globbing options are available, check [picomatch].

## Acknowledgements

- <kbd>[hexo-abbrlink]</kbd>

  This is a nice plugin, I found it right before publishing this one.

## License

This library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
