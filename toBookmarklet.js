const convert = (fileContents) => {
    const minify = require('babel-minify')

    const {
        code,
        map
    } = minify(fileContents)

    return code
}

if (require.main === module) {
    const fs = require('fs')
    const clipboardy = require('clipboardy')

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

        const outputFile = process.argv[3] ? process.argv[3] : "bookmarklet.js"
        const bookmarklet = "javascript:" + convert(data)

        fs.writeFile(outputFile, bookmarklet, () => {
            console.log("Write successful!")
        })

        clipboardy.write(bookmarklet)
        console.log("Copied to clipboard!")
    })
}

exports.convert = convert
