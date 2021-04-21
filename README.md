## Bookmarklets

### Installing

Copy the code into the url text box of a new bookmark and you can run the bookmarklet by clicking it on a page!

### Note

A simple notepad-esque overlay. [Get](build/Note)

### Tetris

Tetris! [Get](build/Tetris)

### "Building"

Minifying is handled by `babel-minify`, built from some parts of babel and a really nice package

`npm install`

Then `node toBookmarklet.js <input file> <output file (optional)>`

**Note: For typescript you have to run `npx tsc` first, then use the output file in `dist/` in the build command.**
