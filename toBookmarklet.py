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
for line in lines:
    line = line.split("//")[0].replace("    ", "")
    if line != "":
        if line[-1] == ";":
            line = line[:-1]
        bookmarklet += line
        if line[-1] != "{":
            bookmarklet += ";"

f.close()

f = open(args.o, "w")
f.write(bookmarklet)
f.close()
pyperclip.copy(bookmarklet)