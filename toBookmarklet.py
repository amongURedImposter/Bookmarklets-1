import argparse
import pyperclip

parser = argparse.ArgumentParser(description='To bookmarklet parameters')
parser.add_argument('-i', help="Input filename", required=True)
parser.add_argument('-o', help="Output filename", required=False, default="bookmarklet.js")
args = parser.parse_args()
f = open(args.i, "r")
lines = f.read()
lines = lines.split("\n")
bookmarklet = "javascript:"
for i in range(len(lines)):
    try:
        if lines[i][-1] == ";":
            lines[i] = lines[i][:-1]
        lines[i] = lines[i].split("//")[0].replace("    ", "")
    except:
        pass
for line, i in zip(lines, range(len(lines))):
    try:
        if line != "":
            bookmarklet += line
            if len(lines[i + 1]) == 0 or (lines[i + 1][0] != "]" and lines[i + 1][0] != "}"):
                if line[-1] != "{" and line[-1] != "[" and line[-1] != ",":
                    bookmarklet += ";"
    except IndexError:
        pass

f.close()

f = open(args.o, "w")
f.write(bookmarklet)
f.close()
pyperclip.copy(bookmarklet)