/**
 * LongLines class that marks lines longer than 80 characters within
 * the code.
 */
export default class LongLines {

    /**
     * Default constructor of the LongLines class.
     */
    constructor() {
    }

    /**
     * Takes in the file content and marks all lines longer
     * than 80 characters within the code, returning the new
     * file content with the notations.
     * @param {String} content 
     */
    markLongLines(content) {
        var fileContent = "";
        var lines = content.split("\n");
        var numLines = lines.length;
        var lineNum = 1;
        var i;
        var toWrite = "";
        for (i = 0; i < numLines; i++) {
            var line = lines[i];
            if (line.length > 80) {
                toWrite = "EXCEEDED LENGTH:" + line;
            } else {
                toWrite = line;
            }
            fileContent += toWrite;
            if (lineNum < numLines) {
                fileContent += "\n";
            }
            lineNum += 1;
        }
        return fileContent;
    }
}