/**
 * The RmJavadocs class that removes javadoc comment
 * from the code.
 */
export default class RmJavadocs {
    
    /**
     * Default constructor of the RmJavadocs class.
     */
    constructor() {
    }

    /**
     * Method that takes in the file content and returns the 
     * fixed file content where all javadoc comments have 
     * been removed.
     * @param {String} content the content of the original file.
     */
    removeJavadocs(content) {
        var fileContent = "";
        var lines = content.split("\n");
        var toWrite = "";
        var openReached = false;
        var closeReached = false;
        var oneLine = false;
        var lineNum = 1;
        var numLines = lines.length;
        var newline = "";
        var i;
        for (i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (lineNum < numLines) {
                newline = "\n";
            } else {
                newline = "";
            }
            if (line.includes("/**") && line.includes("*/")) {
                openReached = false;
                closeReached = false;
                oneLine = true;
            } else if (line.includes("/**")) {
                openReached = true;
                closeReached = false;
            } else if (line.includes("*/")) {
                closeReached = true
            }
            toWrite = line;
            if ((openReached && !closeReached) || oneLine || (openReached && closeReached)) {
                toWrite = "";
            }
            if (closeReached) {
                openReached = false;
                closeReached = false;
            }
            oneLine = false;
            fileContent += toWrite + newline;
        }
        return fileContent;
    }
}