import { promises as fs } from 'fs'

    ; (async () => {
        try {
            const pack = JSON.parse(await fs.readFile('./package.json', 'utf8'))

            const wings_js = (await fs.readFile('./wings.js', 'utf8')).replace(/[0-9]+.[0-9]+.[0-9]+/, pack.version)
            await fs.writeFile('./wings.js', wings_js)
            await fs.writeFile('./dist/wings.cjs', wings_js + '\n\nmodule.exports = Wings')
            await fs.writeFile('./dist/wings.mjs', wings_js + '\n\nexport default Wings')

            const index_html = (await fs.readFile('./index.html', 'utf8')).replace(/<sub>[0-9]+.[0-9]+.[0-9]+<\/sub>/, `<sub>${pack.version}</sub>`)
            await fs.writeFile('./index.html', index_html)
        } catch (error) {
            console.error(error)
        }
    })()