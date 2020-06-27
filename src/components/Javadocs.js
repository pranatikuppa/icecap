/**
 * Javadocs class that adds java doc comment templates
 * to the provided java code.
 */
export default class Javadocs {

    /**
     * Default constructor for the Javadocs class.
     * Contains information about javadoc class and method
     * formats, and method and class patterns.
     */
    constructor() {
        this.classJavadoc =
            "/**\n" + 
            " * \n" + 
            " * @author\n" + 
            " */\n";
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
     * Adds javadoc comment templates before each method and 
     * class header. Highlights incorrect javadoc comments
     * with a header in order to notify the user to change
     * the javadoc format.
     * @param {String} content the content of the original file.
     */
    addJavadocs(content) {
        var fileContent = "";
        var javadocFound = false;
        var lineNum = 1;
        var javadoc = "";
        var lines = content.split("\n");
        var numLines = lines.length;
        var i;
        for (i = 0; i < lines.length; i++) {
            var line = lines[i];
            var newline = "";
            if (lineNum < numLines) {
                newline = "\n";
            }
            var lineTrim = line.trim();
            if (!lineTrim.startsWith("/**") && lineTrim.startsWith("/*")) {
                fileContent += line + newline;
            } else if (lineTrim.startsWith("/**") && lineTrim.endsWith("*/")) {
                javadocFound = false;
                javadoc += line + newline;
            } else if (lineTrim.startsWith("/**")) {
                javadocFound = true;
                javadoc += line + newline;
            } else if (lineTrim.endsWith("*/")) {
                if (javadocFound) {
                    javadocFound = false;
                    javadoc += line + newline;
                } else {
                    fileContent += line + newline;
                }
            } else if (javadocFound) {
                javadoc += line + newline;
            } else if (line === "" || lineTrim === "") {
                fileContent += line + newline;
            } else if (this.methodPattern.exec(lineTrim)) {
                if (javadoc !== "") {
                    if (this.validateJavadocComment(line, javadoc)) {
                        fileContent += javadoc;
                    } else {
                        fileContent += "------- INCORRECT JAVADOC FORMAT -------\n";
                        fileContent += javadoc;
                        fileContent += "----------------------------------------\n";
                    }
                    fileContent += line + newline;
                    javadoc = "";
                } else {
                    var comment = this.generateMethodJavadoc(line);
                    fileContent += comment;
                    fileContent += line + newline;
                }
            } else if (this.classPattern.exec(line)) {
                if (javadoc !== "") {
                    if (this.validateClassJavadocComment(javadoc)) {
                        fileContent += javadoc;
                    } else {
                        fileContent += "------- ADD @AUTHOR TAG TO JAVADOC -------\n";
                        fileContent += javadoc;
                        fileContent += "----------------------------------------\n";
                    }
                    fileContent += line + newline;
                    javadoc = "";
                } else {
                    fileContent += this.classJavadoc;
                    fileContent += line + newline;
                }
            } else {
                if (javadoc !== "") {
                    fileContent += javadoc + newline;
                }
                fileContent += line + newline;
                javadoc = "";
            }
            lineNum++;
        }
        return fileContent;
    }

    /**
     * Returns true if the provided javadoc comment and 
     * the header are of correct format according 
     * to the style guide and false otherwise.
     * @param {String} header the method header.
     * @param {String} javadocComment the provided javadoc comment.
     */
    validateJavadocComment(header, javadocComment) {
        var returnVal = this.containsReturn(header);
        var paramNames = this.getParamList(header);
        var javadocLower = javadocComment.toLowerCase();
        if (returnVal) {
            if (!(javadocLower.includes("@return") || javadocLower.includes("returns")
                || javadocLower.includes("returning") || javadocLower.includes("return"))) {
                return false;
            }
        }
        var i;
        for (i = 0; i < paramNames; i++) {
            if (!(javadocComment.contains("@param " + paramNames[i]) || javadocComment.contains(paramNames[i].toUpperCase()))) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns true if the provided class javadoc comment
     * is of correct format according to
     * the style guide and false otherwise.
     * @param {String} classJavadocComment the provided class javadoc comment.
     */
    validateClassJavadocComment(classJavadocComment) {
        return classJavadocComment.includes("@author");
    }

    /**
     * Returns a javadoc template for a method header provided.
     * @param {String} header the method header.
     */
    generateMethodJavadoc(header) {
        var params = this.countParameters(header);
        var returnVal = this.containsReturn(header);
        var indentation = this.countIndentations(header);
        var paramNames = this.getParamList(header);
        var indent = "";
        var i;
        for (i = 0; i < indentation; i++) {
            indent += "\t";
        }
        var comment = indent + "/**\n" + indent + " *\n";
        for (i = 0; i < params; i++) {
            comment = comment + indent + " * @param " + paramNames[i] + "\n";
        }
        if (returnVal) {
            comment = comment + indent + " * @return\n";
        }
        comment = comment + indent + " */\n";
        return comment;
    }

    /**
     * Returns the number of parameters in the provided method 
     * header.
     * @param {String} header the method header. 
     */
    countParameters(header) {
        return this.getParamList(header).length;
    }

    /**
     * Returns an array of parameter names that are 
     * contained within the method header provided.
     * @param {String} header the method header.
     */
    getParamList(header) {
        var open = header.indexOf('(');
        var close = header.indexOf(')');
        var paramString = header.substring(open + 1, close);
        var segments = paramString.split(",");
        var names = [];
        var i;
        for (i in segments) {
            var paramSplit = segments[i].split(" ");
            names.push(paramSplit[paramSplit.length - 1]);
        }
        return names;
    }

    /**
     * Returns true if the method header contains a return
     * type other than void and false otherwise.
     * @param {String} header the method header.
     */
    containsReturn(header) {
        return !header.includes("void");
    }

    /**
     * Returns the number of indentations before the method
     * header provided.
     * @param {String} header the method header. 
     */
    countIndentations(header) {
        var count = 0;
        var spaceCount = 0;
        var i = 0;
        for (i = 0; i < header.length; i++) {
            var c = header.charAt(i);
            if (c !== '\t' && c !== ' ') {
                break;
            }
            if (c === '\t') {
                count += 1;
            }
            if (c === ' ') {
                spaceCount++;
            }
        }
        return count + (spaceCount / 4);
    }
}
