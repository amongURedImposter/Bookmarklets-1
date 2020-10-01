import argparse

parser = argparse.ArgumentParser(description='To bookmarklet parameters')
parser.add_argument('-i', help="Input filename", required=True)
parser.add_argument('-o', help="Output filename", required=False, default="bookmarklet.js")
args = parser.parse_args()
f = open(args.i, "r")
lines = f.read()
lines = lines.split("\n")
bookmarklet = "javascript:"
for line in lines:
    if line != "":
        bookmarklet += line.replace("    ", "") + ";"
f.close()

f = open(args.o, "w")
f.write(bookmarklet)