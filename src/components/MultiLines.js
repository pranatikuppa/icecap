/**
 * MultiLines class that removes multi line comments
 * from the provided java code.
 */
 export default class MultiLines {

    /**
     * Default constructor for the MultiLines
     * class.
     */
    constructor() {
    }

    /**
     * Takes in the file content and removes all the multi line comments
     * from the provided file content, returning the fixed file content.
     * @param {String} content the content of the original file.
     */
    removeMultiLines(content) {
        var fileContent = "";
        var lines = content.split("\n");
        var numLines = lines.length;
        var lineNum = 1;
        var i;
        var toWrite = "";
        var openReached = false;
        var closeReached = false;
        var oneLine = false;
        for (i = 0; i < lines.length; i++) {
            var line = lines[i];
            var newline = "";
            if (lineNum < numLines) {
                newline = "\n";
            } else {
                newline = "";
            }
            if (line.includes("/*") && line.includes("*/")) {
                if (line.indexOf("/**") !== line.indexOf("/*")) {
                    openReached = false;
                    closeReached = false;
                    oneLine = true;
                }
            } else if (line.includes("/*")) {
                if (line.indexOf("/**") !== line.indexOf("/*")) {
                    openReached = true;
                    closeReached = false;
                }
            } else if (line.includes("*/")) {
                if (openReached) {
                    openReached = false;
                    closeReached = true;
                }
            }
            toWrite = line;
            var open = toWrite.indexOf("/*");
            var close = toWrite.indexOf("*/") + 2;
            if (oneLine) {
                toWrite = line.replace(line.substring(open, close), "");
            } else if (openReached && !closeReached) {
                toWrite = "";
            } else if (closeReached) {
                toWrite = line.substring(close);
                openReached = false;
                closeReached = false;
            }

            if (toWrite != "") {
                fileContent += toWrite + newline;
                // fileContent += "tst";
            }
            oneLine = false;
            
            
        }
        return fileContent;
    }
}