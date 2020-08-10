/**
 * The Whitespace class that fixes incorrect
 * or missing whitespaces in the java code.
 */
export default class Whitespaces {
  /**
   * Default constructor for the Whitespaces class.
   */
  constructor() {
    this.wordPattern = new RegExp("^[A-Za-z]*$");
  }

  /**
   * Applies all the whitespaces fixing helper methods 
   * to the appropriate items and the file content and returns
   * the new fixed file content.
   * @param {String} content the content of the original file.
   */
  fixWhitespaces(content) {
    var fileContent = content;
    var noSpaceBeforeKeywords = ["++", "--", ";", ")"];
    var noSpaceAfterKeywords = ["(", "!", "++", "--"];
    var spaceBeforeChars = ["&&", "||", "{", "*", "+", "-", "/", "=", "==", "+=","-=", "?", ":"];
    var spaceBeforeKeywords = ["catch", "do", "else", "finally", "synchronized"];
    var spaceAfterChars = ["&&", "||", ";", ",", "+", "/", "-", "*", "=", "+=", "==", "-=", "?", ":"];
    var spaceAfterKeywords = ["assert", "catch", "do", "else", "finally", 
    "for", "if", "synchronized", "try", "while"];
    var i;
    for (i = 0; i < noSpaceBeforeKeywords.length; i++) {
      fileContent = this.noSpaceBefore(fileContent.split("\n"), noSpaceBeforeKeywords[i]);
    }
    for (i = 0; i < noSpaceAfterKeywords.length; i++) {
      fileContent = this.noSpaceAfter(fileContent.split("\n"), noSpaceAfterKeywords[i]);
    }
    for (i = 0; i < spaceBeforeChars.length; i++) {
      fileContent = this.spaceBefore(fileContent.split("\n"), spaceBeforeChars[i]);
    }
    for (i = 0; i < spaceBeforeKeywords.length; i++) {
      fileContent = this.spaceBefore(fileContent.split("\n"), spaceBeforeKeywords[i]);
    }
    for (i = 0; i < spaceAfterChars.length; i++) {
      fileContent = this.spaceAfter(fileContent.split("\n"), spaceAfterChars[i]);
    }
    for (i = 0; i < spaceAfterKeywords.length; i++) {
      fileContent = this.spaceAfter(fileContent.split("\n"), spaceAfterKeywords[i]);
    }
    
    fileContent = this.removeTrailingBlank(fileContent.split("\n"));;
    return fileContent;
  }

  /**
   * Method that ensures there is no space before the item provided
   * in the lines provided.
   * @param {Array} lines the array of the lines of code.
   * @param {String} item the item to look for in the code.
   */
  noSpaceBefore(lines, item) {
      var fileContent = "";
      var toWrite = "";
      var itemLen = item.length;
      var changed = false;
      var numLines = lines.length;
      var lineNum = 1;
      var newline = "";
      var i;
      for (i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (lineNum < numLines) {
          newline = "\n";
        } else {
          newline = "";
        }
        if (line.includes(item)) {
          var ind = line.indexOf(item);
          var numPotentialErrs = this.numItems(line, item, itemLen);
          var indices = this.allIndices(line, item, ind, itemLen);
          var j;
          for (j = 0; j < numPotentialErrs; j++) {
            if (!this.checkJavaDocInterfere(line)) {
              if (toWrite === "") {
                if (line.charAt(indices[j] - 1) === ' ') {
                  toWrite = line.substring(0, indices[j]).trimRight();
                  toWrite += line.substring(indices[j]);
                  indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                  changed = true;
                }
              } else {
                var temp;
                temp = toWrite.substring(indices[j]);
                toWrite = toWrite.substring(0, indices[j]).trimRight();
                toWrite += temp;
                indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                changed = true;
              }
            }
          }
          if (toWrite !== "") {
            fileContent += toWrite + newline;
          }
          toWrite = "";
        }
        if (!changed) {
          fileContent += line + newline;
        }
        changed = false;
        lineNum++;
      }
      return fileContent;
  }

  /**
   * Method that ensures there is no space after the item provided
   * in the lines provided.
   * @param {Array} lines the array of the lines of code.
   * @param {String} item the item to look for in the code.
   */
  noSpaceAfter(lines, item) {
    var fileContent = "";
    var toWrite = "";
    var itemLen = item.length;
    var changed = false;
    var numLines = lines.length;
    var lineNum = 1;
    var newline = "";
    var i;
    for (i = 0; i < numLines; i++) {
      var line = lines[i];
      if (lineNum < numLines) {
        newline = "\n";
      } else {
        newline = "";
      }
      if (line.includes(item)) {
        var ind = line.indexOf(item);
        var numPotentialErrs = this.numItems(line, item, itemLen);
        var indices = this.allIndices(line, item, ind, itemLen);
        var j;
        for (j = 0; j < numPotentialErrs; j++) {
          if (!this.checkJavaDocInterfere(line)) {
            if (toWrite === "") {
              if (line.charAt(indices[j] + 1) ===  ' ') {
                  toWrite = line.substring(0, indices[j] + itemLen);
                  toWrite += line.substring(indices[j] + itemLen).trimLeft();
                  indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                  changed = true;
              }
          } else {
                var temp = toWrite.substring(indices[j] + itemLen).trimLeft();
                toWrite = toWrite.substring(0, indices[j] + itemLen);
                toWrite += temp;
                indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                changed = true;
            } 
          }
        }
        if (toWrite !== "") {
          fileContent += toWrite + newline;
        }
        toWrite = "";
      }
      if (!changed) {
        fileContent += line + newline;
      }
      changed = false;
      lineNum++;
    }
    return fileContent;
  }
    
  /**
   * Method that ensures there is a single space before the item 
   * provided in the lines provided.
   * @param {Array} lines the array of the lines of code.
   * @param {String} item the item to look for in the code. 
   */
  spaceBefore(lines, item) {
    var fileContent = "";
    var itemLen = item.length;
    var toWrite = "";
    var changed = false;
    var proper = "";
    var numLines = lines.length;
    var lineNum = 1;
    var newline = "";
    var i;
    for (i = 0; i < numLines; i++) {
      var line = lines[i];
      if (lineNum < numLines) {
        newline = "\n";
      } else {
        newline = "";
      }
      if (line.includes(item)) {
        var ind = line.indexOf(item);
        var numPotentialErrs = this.numItems(line, item, itemLen);
        var indices = this.allIndices(line, item, ind, itemLen);
        var j;
        for (j = 0; j < numPotentialErrs; j++) {
          if (!this.checkJavaDocInterfere(line)) { 
            if (toWrite === "") {
              proper = this.getProperBefore(line, ind);
              if (ind === 0 && !this.checkMult(line, item) 
                && !this.checkMultiComment(line, item, indices[j]) && !this.partOfWord(line, item, indices[j])) {
                toWrite = line.substring(0, indices[j]); 
                toWrite += " " + line.substring(indices[j]); 
                indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                changed = true; 
              }
              if (ind !== 0) {
                if (line.charAt(ind - 1) !== ' ' && !this.checkMult(line, item) 
                  && !this.checkMultiComment(line, item, indices[j])&& !this.partOfWord(line, item, indices[j])) {
                  toWrite = line.substring(0, indices[j]);
                  toWrite += " " + line.substring(indices[j]);
                  indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                  changed = true;
                } else if (proper.trim() !== line.trim() && !this.checkMult(line, item) 
                  && !this.checkMultiComment(line, item, indices[j]) && !this.partOfWord(line, item, indices[j])) {
                  toWrite = line.substring(0, indices[j]).trimRight();
                  toWrite += " " + line.substring(indices[j]);
                  indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                  changed = true;
                }
              }
            } else {
              if (!this.checkMult(toWrite, item) && !this.checkMultiComment(toWrite, item, indices[j]) && !this.partOfWord(line, item, indices[j])) {
                proper = this.getProperBefore(toWrite, indices[j]);
                var temp = " " + toWrite.substring(indices[j]);
                toWrite = toWrite.substring(0, indices[j]).trimRight();
                toWrite += temp;
                indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                changed = true;
              }
            }
          }
        }
        if (toWrite !== "") {
          fileContent += toWrite + newline;
        }
        toWrite = "";
      }
      if (!changed) {
        fileContent += line + newline;
      }
      changed = false;
      lineNum++;
    }
    return fileContent;
  }
    
  /**
   * Method that ensures there is a single space after the item
   * provided in the lines provided.
   * @param {Array} lines the array of the lines of code.
   * @param {String} item the item to look for in the code.
   */
  spaceAfter(lines, item) {
    var fileContent = "";
    var toWrite = "";
    var itemLen = item.length;
    var changed = false;
    var numLines = lines.length;
    var lineNum = 1;
    var i;
    var newline = "";
    for (i = 0; i < numLines; i++) {
      var line = lines[i];
      if (lineNum < numLines) {
        newline = "\n";
      } else {
        newline = "";
      }
      if (line.includes(item)) {
        var ind = line.indexOf(item);
        var numPotentialErrs = this.numItems(line, item, itemLen);
        var proper = "";
        var indices = this.allIndices(line, item, ind, itemLen);
        var j;
        for (j = 0; j < numPotentialErrs; j++) {
              if (!this.checkJavaDocInterfere(line)) {
                  if (toWrite === "") {
                      proper = this.getProperAfter(line, ind, itemLen);
                      if (indices[j] === line.length - 1) {
                        toWrite = line + " ";
                        indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                        changed = true;
                      } else if (proper.trim() !== line.trim() && !this.checkMult(line, item)
                        && !this.checkMultiComment(line, item, indices[j]) && !this.partOfWord(line, item, indices[j])) {
                        toWrite = line.substring(0, indices[j] + itemLen);
                        toWrite += " " + line.substring(indices[j] + itemLen).trimLeft();
                        indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                        changed = true;
                    }
                  } else {
                    if (indices[j] === toWrite.length - 1) {
                      toWrite = toWrite + " ";
                      indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                      changed = true;
                    } else if (!this.checkMult(toWrite, item) && !this.checkMultiComment(toWrite, item, indices[j]) && !this.partOfWord(line, item, indices[j])) {
                      proper = this.getProperAfter(toWrite, indices[j], itemLen);
                      var temp = toWrite.substring(indices[j] + itemLen).trimLeft();
                      toWrite = toWrite.substring(0, indices[j] + itemLen) + " ";
                      toWrite += temp;
                      indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                      changed = true;
                    }
                  }
                }
              }
        if (toWrite !== ("")) {
          fileContent += toWrite + newline;
        }
        toWrite = "";
      }
      if (!changed) {
        fileContent += line + newline;
      }
      changed = false;
      lineNum++;
    }
    return fileContent;
  }
        
  /**
   * Reads a line and ensures that it does not interefere 
   * with other ICEcΔp edits.
   * @param {String} line the line to look over.
   */
  checkJavaDocInterfere(line) {
    if (line === "------- INCORRECT JAVADOC FORMAT -------" || line === "----------------------------------------") {
      return true; 
    }
    return false; 
  }
    
  /**
   * Reads a line and counts all appearances of item within
   * it. Takes in the line, the item and the item's length. 
   * @param {String} line the line to look over. 
   * @param {String} item the item to count.
   * @param {number} itemLen the length of the item.
   */
  numItems(line, item, itemLen) {
    var total = 0;
    var temp = line;
    while (temp.includes(item) && temp.trim() !== item) {
      total += 1;
      var ind = temp.indexOf(item);
      if (itemLen === 1) {
        temp = temp.substring(ind + itemLen);
      } else {
        temp = temp.substring(ind + itemLen - 1);
      }
    }
    return total;
  }
    
  /**
   * Reads a line and using the line, the item the first index 
   * of the item and the item's length, returns a list of
   * all the indices of a string snippet within that line.
   * @param {String} line the line to read over.
   * @param {String} item the item to look for.
   * @param {number} ind the first index of the item in the given line.
   * @param {number} itemLen the length of the item.
   */
  allIndices(line, item, ind, itemLen) {
    var indices = [];
    indices.push(ind);
    var curr = 0;
    if (itemLen === 1) {
      curr = ind + itemLen;
    } else {
      curr = ind + itemLen - 1;
    }
    var temp = line.substring(curr);
    while (temp.includes(item) && temp.trim() !== item) {
      curr += temp.indexOf(item);
      indices.push(curr);
      if (itemLen === 1) {
        curr += itemLen;
        temp = temp.substring(temp.indexOf(item) + itemLen);
      } else {
        curr += itemLen - 1;
        temp = temp.substring(temp.indexOf(item) + itemLen - 1);
      }
    }
    return indices;
  }

  /**
   * Takes in a line, item and the index of the item and determines
   * whether or not the item is part of a word within the line or
   * not.
   * @param {String} line 
   * @param {String} item 
   * @param {number} ind 
   */
  partOfWord(line, item, ind) {
    var itemLen = item.length; 
    // var letters = /^[A-Za-z]+$/; 
    var keywords = ["assert", "catch", "do", "else", "finally", "for", "if", "synchronized", "try", "while"];
    if (keywords.includes(item)) {
      if (ind !== 0 && ind+itemLen+1 <= line.length-1) {
        var strBefore = line.substring(ind-1, ind);
        var strAfter = line.substring(ind+itemLen, ind+itemLen+1); 
        
        if (this.wordPattern.exec(strBefore) || this.wordPattern.exec(strAfter)) {
          return true; 
        } 
      } else if (ind === 0) {
        var strAfter2 = line.substring(ind+itemLen, ind+itemLen+1); 
        if (this.wordPattern.exec(strAfter2)) {
          return true; 
        }
      } else if (ind+itemLen+1 > line.length-1) {
        var strBefore2 = line.substring(ind-1, ind);
        if (this.wordPattern.exec(strBefore2)) {
          return true; 
        }
      }
      return false; 
    } 
    return false; 
  }

  /**
   * Inspects a line and determines if the occurence of item is
   * a multiple (ex. item is "+", checks if the first occurence 
   * in line is "++" or "+="). Takes in the line and the item. 
   * @param {String} line the line in which to check for the item.
   * @param {String} item the item to look for.
   */
  checkMult(line, item) {
    if (line.includes(item)) {
      var ind = line.indexOf(item);
      if (ind !== 0 && ind !== (line.length-1)) {
          if ((item === "+" || item === "-" || item === "=")
          && (line.charAt(ind + 1) === '+' || line.charAt(ind + 1) === '-'
          || line.charAt(ind + 1) === '=')) {
          return true;
        } else if ((item === "+" && line.charAt(ind + 1) === '=') || (item === "="
            && line.charAt(ind - 1) === '+')) {
            return true;
        } else if (item === "/" && line.charAt(ind + 1) === '/') {
            return true;
        } else if (item === "/" && line.charAt(ind - 1) === '/') {
            return true;
        } else {
            return false;
        }
      } else if (ind === 0) {
        if ((item === "+" || item === "-" || item === "=")
          && (line.charAt(ind + 1) === '+' || line.charAt(ind + 1) === '-'
          || line.charAt(ind + 1) === '=')) {
          return true;
        } else if ((item === "+" && line.charAt(ind + 1) === '=')) {
            return true;
        } else if (item === "/" && line.charAt(ind + 1) === '/') {
            return true;
        } else {
            return false;
        }
        } else if (ind !== (line.length-1)) {
            if (item === "="
              && line.charAt(ind - 1) === '+') {
              return true;
        } else if (item === "/" && line.charAt(ind - 1) === '/') {
            return true;
        } else {
            return false;
        }
      }
    }
    return false;
  }

  /**
   * Read a line and using the line and the index, determins if 
   * a certain '/' is part of a multiline comment declaration.
   * @param {String} line the line to read over.
   * @param {number} ind the index of the /.
   */
  checkMultiSlash(line, ind) {
    if (line.trim() === "*/" || line.trim() === "/**" || line.trim() === "/*") {
      return true; 
    } else if (ind !== 0 && ind !== line.length-1) {
        if (line.charAt(ind + 1) === '*' || line.charAt(ind-1) === '*') {
            return true; 
        }
        return false; 
    } else if (ind !== line.length -1) {
        if (line.charAt(ind + 1) === '*') {
            return true; 
        }
        return false; 
    } else if (ind !== 0) {
        if (line.charAt(ind - 1) === '*') {
              return true;
        }
        return false; 
    }    
    return false;
  }

  /**
   * Reads a line and using the line and the index determines if
   * a certain '*' being inspected is part of a multiline comment
   * declaration. 
   * @param {String} line the line to read over.
   * @param {number} ind the index of the *. 
   */
  checkMultiStar(line, ind) {
    if (line.trim() === "*/" || line.trim() === "/**" || line.trim() === "/*") {
    return true; 
    } else if (ind !== 0 && line.charAt(ind-1)=== '.') {
      return true; 
    } 
    else if (ind !== 0 && ind !== line.length - 1) {
        if (line.charAt(ind + 1) === '/' || line.charAt(ind - 1) === '/') {
          return true;
        } else if (line.charAt(ind + 1) === '*' || line.charAt(ind - 1) === '*') {
          return true; 
        }
        return false; 
    } else if (ind !== line.length -1) {
          if (line.charAt(ind + 1) ==='/') {
            return true;
          } else if (line.charAt(ind + 1) === '*') {
            return true; 
        }
        return false; 
        
    }
    
    return false;
  }

  /**
   * Reads a line and using the line, the item and the first index
   * of the item, determins if a certain element being inspected
   * is part of a multiline comment declaration.  
   * @param {String} line the line to read over.
   * @param {String} item the item to look for. 
   * @param {number} ind the first index of the item within the line.
   */
  checkMultiComment(line, item, ind) {
    if (item.trim() === "*" && this.checkMultiStar(line, ind)) {
      return true;
    } else if (item.trim() === "/" && this.checkMultiSlash(line, ind)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Takes in the line, the index and the item length and inspects a 
   * line and determins the proper format if there were to be a space
   * after an item (substring representing character(s)). 
   * @param {String} line the line to read over.
   * @param {number} ind the index of the item in the line.
   * @param {number} itemLen the item's length.
   */
  getProperAfter(line, ind, itemLen) {
    var proper = "";
    if (ind !== line.length - 1 && (ind + itemLen) <= line.length - 1) {
      var portion = line.substring(0, ind + itemLen);
      var end = line.substring(ind + itemLen).trim();
      proper = portion + " " + end;
    }
    return proper;
  }

  /**
   * Takes in the line and the index of the item and inspects it
   * to determine the proper format if there were to be a space
   * before an item (substring representing character(s)).
   * @param {String} line the line to read over.
   * @param {number} ind the index of the item
   */
  getProperBefore(line, ind) {
    var portion = line.substring(0, ind).trim();
    var end = line.substring(ind);
    var proper = portion + " " + end;
    return proper;
  }

  /**
   * Takes in the lines of a file and ensures that each line in it
   * has no trailing blank spaces.
   * @param {Array} lines the lines of the file.
   */
  removeTrailingBlank(lines) {
    var fileContent = "";
    var toWrite = "";
    var numLines = lines.length;
    var i;
    for (i = 0; i < numLines; i++) {
        var line = lines[i];
        toWrite = line.trimRight();
        fileContent += toWrite;
        fileContent += "\n"; 
    }
    return fileContent;
  }
}