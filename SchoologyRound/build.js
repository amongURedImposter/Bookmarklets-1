const toBookmarklet = require('../toBookmarklet')
const exec = require('await-exec')
const cssMod = require('css')
const clipboardy = require('clipboardy')

const fsBase = require('fs')
const fs = fsBase.promises

async function main() {
    await exec('npx tsc')

    const script = await fs.readFile('../dist/SchoologyRound/SchoologyRound.js', {
        encoding: 'utf8'
    })
    const css = await fs.readFile('style.css', {
        encoding: 'utf8'
    })

    const bookmarklet = "javascript:" + toBookmarklet.convert(
        script.replace('{STYLE_INJECT_HERE}', cssMod.stringify(
            cssMod.parse(css), {
                indent: "0",
                compress: true
            }))
    )

    await fs.writeFile('bookmarklet.js', bookmarklet)
    clipboardy.write(bookmarklet)
}

if (require.main === module) {
    main()
        .then(() => {})
        .catch(err => console.log(err))
}
