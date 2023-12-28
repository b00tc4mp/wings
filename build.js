import { promises as fs } from 'fs'

    ; (async () => {
        try {
            const pack = JSON.parse(await fs.readFile('./package.json', 'utf8'))
            const content = (await fs.readFile('./wings.js', 'utf8')).replace(/[0-9]+.[0-9]+.[0-9]+/, pack.version)

            await fs.writeFile('./wings.js', content)
            await fs.writeFile('./dist/wings.cjs', content + '\n\nmodule.exports = Wings')
            await fs.writeFile('./dist/wings.mjs', content + '\n\nexport default Wings')
        } catch (error) {
            console.error(error)
        }
    })()