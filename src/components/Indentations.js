export default class Indentations {
    
    constructor() {
    }

    fixIndentations(content) {
        var fileContent = "";
        var levels = 0;
        var lineToWrite = "";
        var newline = "";
        var lineNum = 1;
        var lines = content.split("\n");
        var numLines = lines.length;
        var comment = false;
        var i;
        for (i = 0; i < lines.length; i++) {
            var l = lines[i];
            if (lineNum < numLines) {
                newline = "\n";
            } else {
                newline = "";
            }
            if (l.trim() === "") {
                lineToWrite = l + newline;
            } else {
                var line = l.trim();
                if (line.indexOf('//') === 0) {
                    lineToWrite = this.generateIndentation(levels) + line + newline;
                } else if (line.endsWith("*/")) {
                    lineToWrite = this.generateIndentation(levels) + line + newline;
                    comment = false;
                } else if (line.startsWith("/**") || line.startsWith("/*")) {
                    lineToWrite = this.generateIndentation(levels) + line + newline;
                    comment = true;
                } else if (!comment && this.elseIndentMark(line)) {
                    levels -= 1;
                    lineToWrite = this.generateIndentation(levels) + line + newline;
                    levels += 1;
                } else if (!comment && this.isIndentMark(line)) {
                    lineToWrite = this.generateIndentation(levels) + line + newline;
                    levels += 1;
                } else if (!comment && this.isEndIndentMark(line)) {
                    levels -= 1;
                    lineToWrite = this.generateIndentation(levels) + line + newline;
                } else {
                    lineToWrite = this.generateIndentation(levels) + line + newline;
                }
            }
            fileContent += lineToWrite;
            lineNum += 1;
        }
        return fileContent;
    }

    isIndentMark(line) {
        if (line.trim().endsWith("{")) {
            return true;
        } else if (line.includes("//")) {
            var subLine = line.substring(0, line.indexOf("//"));
            if (subLine.trim().endsWith("{")) {
                return true;
            }
        }
        return false;
    }

    isEndIndentMark(line) {
        if (line.trim() === "}" || line.trim() === "};") {
            return true;
        }
        return false;
    }

    elseIndentMark(line) {
        if (line.includes("}")) {
            if (line.includes("else") && (line.indexOf("}") < line.indexOf("else"))) {
                return true;
            }
            if (line.includes("else if") && (line.indexOf("}") < line.indexOf("else if"))) {
                return true;
            }
        } else {
            return false;
        }
    }

    generateIndentation(levels) {
        var indent = "";
        var i;
        for (i = 0; i < levels; i++) {
            indent += "    ";
        }
        return indent;
    }
}