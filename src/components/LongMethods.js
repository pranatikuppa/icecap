/**
 * LongMethods class that marks the methods longer than
 * 80 lines within the code.
 */
export default class LongMethods {

    /**
     * Default constructor of the LongMethods class.
     */
    constructor() {
        this.methodPattern = new RegExp(
            "(\\p{Space})*(public |protected |private )?" +
            "(static )?" +
            "(void |[\\w\\W]+ )" +
            "([a-zA-Z0-9]+)" +
            "\\(" +
            "(([\\w\\W]+ [a-zA-Z0-9]+)|" +
            "(([\\w\\W]+ [a-zA-Z0-9]+, )+[\\w\\W]+ [a-zA-Z0-9]+))?" + 
            "\\) ?\\{");
        this.classPattern = new RegExp(
            "(\\p{Space})*(public |protected |private )?" +
            "(static )?" + 
            "(class )" +
            "(extends |implements )?" +
            "([a-zA-Z0-9]+) ?\\{"
        );
    }

    /**
     * Takes in the content of the file and marks the point at 
     * which a method exceeds the 80 line limit, if it does.
     * @param {string} content the content of the original file.
     */
    markLongMethods(content) {
        var fileContent = "";
        var lines = content.split("\n");
        var numLines = lines.length;
        var lineNum = 1;
        var methodStart = false;
        var methodLength = 0;
        var exceededLength = false;
        var toWrite = "";
        var netBrace = 0;
        var i;
        for (i = 0; i < numLines; i++) {
            var line = lines[i];
            if (!this.classPattern.exec(line)) {
                if (this.methodPattern.exec(line)) {
                    methodLength = 1;
                    netBrace = 1;
                    methodStart = true;
                } else {
                    netBrace += this.getLineNetBrace(line);
                    if (netBrace === 0) {
                        methodStart = false;
                    }
                    if (methodLength < 60 && methodStart) {
                        methodLength += 1;
                        toWrite += line;
                        if (lineNum < numLines) {
                            toWrite += "\n";
                        }
                    } else if (methodLength >= 60 && methodStart) {
                        methodLength = 0;
                        methodStart = false;
                        exceededLength = true;
                        toWrite += "------------METHOD EXCEEDS 60 LINES HERE------------\n";
                    }
                    if (exceededLength && methodStart) {
                        toWrite += line;
                        if (lineNum < numLines) {
                            toWrite += "\n";
                        }
                    }
                } 
            }
            if (toWrite === "") {
                fileContent += line;
                if (lineNum < numLines) {
                    fileContent += "\n";
                }
                toWrite = "";
            } else {
                fileContent += toWrite;
                toWrite = "";
            }
            lineNum++;
        }
        return fileContent;
    }

    getLineNetBrace(line) {
        var net = 0;
        var i;
        for (i = 0; i < line.length; i++) {
            if (line.charAt(i) === "{") {
                net += 1;
            }
            if (line.charAt(i) === "}") {
                net -= 1;
            }
        }
        return net;
    }
}