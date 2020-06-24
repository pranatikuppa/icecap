export default class Javadocs {

    constructor() {
        this.fileContent = "";
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

    get getFile() {
        return this.file;
    }

    set setFileContent(text) {
        this.fileContent = text;
    }

    javadocMethod(inputFile){
        return new Promise(
          function(resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = (function(reader)
            {
              return function() {
                resolve(reader.result);
              }
            })(reader);
            reader.readAsBinaryString(inputFile);
          });
    }

    addJavadocs(content) {
        // return "blah";
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
            if (!this.startsWith(lineTrim, "/**") && this.startsWith(lineTrim, "/*")) {
                fileContent += line + newline;
            } else if (this.startsWith(lineTrim, "/**") && this.endsWith(lineTrim, "*/")) {
                javadocFound = false;
                javadoc += line + newline;
            } else if (this.startsWith(lineTrim, "/**")) {
                javadocFound = true;
                javadoc += line + newline;
            } else if (this.endsWith(lineTrim, "*/")) {
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
                    fileContent += javadoc;
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

    startsWith(str, item) {
        if (str.indexOf(item) === 0) {
            return true;
        } else {
            return false;
        }
    }

    endsWith(str, item) {
        var endIndex = str.length - item.length;
        if (str.indexOf(item) === endIndex) {
            return true;
        } else {
            return false;
        }
    }

    trimLeft(str) {
        if(!str) return str;
        return str.replace(/^\s+/g, '');
    }

    trimRight(str) {
        if(!str) return str;
        return str.replace(/\s+$/g, '');
    }

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

    countParameters(header) {
        return this.getParamList(header).length;
    }

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

    containsReturn(header) {
        return !header.includes("void");
    }

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
