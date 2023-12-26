import { promises as fs } from 'fs'
    ; (async () => {
        try {
            const pack = JSON.parse(await fs.readFile('./package.json', 'utf8'))
            const content = (await fs.readFile('./wings.js', 'utf8')).replace(/[0-9]+.[0-9]+.[0-9]+/, pack.version)

            fs.writeFile('./wings.js', content)
            fs.writeFile('./dist/wings.cjs', content + '\n\nmodule.exports = Wings')
            fs.writeFile('./dist/wings.mjs', content + '\n\nexport default Wings')
        } catch (error) {
            console.error(error)
        }
    })()