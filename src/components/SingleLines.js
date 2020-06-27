/**
 * The SingleLines class that removes single line
 * comments from the java code provided.
 */
export default class SingleLines {
    
    /**
     * Default constructor of the single lines class.
     */
    constructor() {
    }

    /**
     * Method that removes single line comments from the java code
     * provided and returns the new fixed file content.
     * @param {String} content the content of the original file.
     */
    removeSingleLines(content) {
        var fileContent = "";
        var lines = content.split("\n");
        var numLines = lines.length;
        var lineNum = 1;
        var i;
        for (i = 0; i < lines.length; i++) {
            var line = lines[i];
            var newline = "";
            if (lineNum < numLines) {
                newline = "\n";
            } else {
                newline = "";
            }
            if (line.includes("//")) {
                var commentIndex = line.indexOf("//", 0);
                if (commentIndex !== 0) {
                var subString = line.substring(0, commentIndex);
                if (subString.trim() === "") {
                    fileContent += subString + newline;
                }
                }
            } else {
                fileContent += line + newline;
            }
            lineNum++;
        }
        return fileContent;
    }
}
