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
        var methodEnd = false;
        var methodLength = 0;
        var i;
        for (i = 0; i < numLines; i++) {
            var line = lines[i];
            if (methodStart) {

            }
        }
    }
}