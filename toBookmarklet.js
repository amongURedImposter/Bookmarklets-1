const clipboardy = require('clipboardy')
const minify = require('babel-minify')
const fs = require('fs')

if (process.argv.length < 3) {
    console.log(`
    USAGE:
    node toBookmarklet.js <input file> <output file (optional)>
    `)
    process.exit()
}

fs.readFile(process.argv[2], 'utf8', function (err, data) {
    if (err) {
        console.error(err)
        return
    }
    let originalCode = data

    const {
        code,
        map
    } = minify(originalCode)

    let outputFile = process.argv[3] ? process.argv[3] : "bookmarklet.js"

    fs.writeFile(outputFile, "javascript:" + code, () => {console.log("Write successful!")})
    clipboardy.write("javascript:" + code)
})