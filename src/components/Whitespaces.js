export default class Whitespaces {

    constructor() {

    }

    fixWhitespaces(content) {
      var fileContent = "";
      var noSpaceBeforeKeywords = ["++", "--", ";", ")"];
      var noSpaceAfterKeywords = ["(", "!", "++", "--"];
      var spaceBeforeKeywords = ["&&", "||", "{", "*", "+", "-", "/", "=", "==", "+=","-=", "assert", "catch", "do", "else", "finally", 
      "for", "if", "return", "synchronized", "try", "while", "?", ":"];
      var spaceAfterKeywords = ["&&", "||", ";", ",", "+", "/", "-", "*", "=", "+=", "==", "-=", "assert", "catch", "do", "else", "finally", 
      "for", "if", "return", "synchronized", "try", "while", "?", ":"];
      var i;
      for (i = 0; i < noSpaceBeforeKeywords.length; i++) {
        var item = noSpaceBeforeKeywords[i];
        fileContent = this.noSpaceBefore(content.split("\n"), item);
      }
      for (i = 0; i < noSpaceAfterKeywords.length; i++) {
        var item = noSpaceAfterKeywords[i];
        fileContent = this.noSpaceAfter(fileContent.split("\n"), item);
      }
      for (i = 0; i < spaceBeforeKeywords.length; i++) {
        var item = spaceBeforeKeywords[i];
        fileContent = this.spaceBefore(fileContent.split("\n"), item);
      }
      for (i = 0; i < spaceAfterKeywords.length; i++) {
        var item = spaceAfterKeywords[i];
        fileContent = this.spaceAfter(fileContent.split("\n"), item);
      }
      fileContent = this.removeTrailingBlank(fileContent.split("\n"));;
      return fileContent;
    }

    noSpaceBefore(lines, item) {
        var fileContent = "";
        var toWrite = "";
        var itemLen = item.length;
        var changed = false;
        var numLines = lines.length;
        var lineNum = 1;
        var i;
        for (i = 0; i < lines.length; i++) {
            var line = lines[i];
          if (line.includes(item)) {
            //indexOf(item, 0)
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
                    //indexOf(item, 0)
                    indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                    changed = true;
                    }
                  } else {
                    var temp;
                    temp = toWrite.substring(indices[j]);
                    toWrite = toWrite.substring(0, indices[j]).trimRight();
                    toWrite += temp;
                    //indexOf(item, 0)
                    indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                    changed = true;
                  }
                }
            }
            if (toWrite !== "") {
              fileContent += toWrite;
              if (lineNum < numLines) {
                fileContent += "\n";
              }
            }
            toWrite = "";
          }
          if (!changed) {
            fileContent += line;
            if (lineNum < numLines) {
              fileContent += "\n";
            }
          }
          changed = false;
          lineNum++;
        }
        return fileContent;
      }

      noSpaceAfter(lines, item) {
        var fileContent = "";
        var toWrite = "";
        var itemLen = item.length;
        var changed = false;
        var numLines = lines.length;
        var lineNum = 1;
        var i;
        for (i = 0; i < numLines; i++) {
            var line = lines[i];
          if (line.includes(item)) {
            //indexOf(item, 0)
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
                            //indexOf(item, 0)
                            indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                            changed = true;
                        }
                      } else {
                            var temp = toWrite.substring(indices[j] + itemLen).trimLeft();
                            toWrite = toWrite.substring(0, indices[j] + itemLen);
                            toWrite += temp;
                            //indexOf(item, 0)
                            indices = this.allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                            changed = true;
                        } 
                  }
            }
            if (toWrite !== "") {
              fileContent += toWrite;
              if (lineNum < numLines) {
                fileContent += "\n";
              }
            }
            toWrite = "";
          }
          if (!changed) {
            fileContent += line;
            if (lineNum < numLines) {
                fileContent += "\n";
            }
          }
          changed = false;
          lineNum++;
        }
        return fileContent;
      }
    
      /*
       * Method that takes in the lines of a file and ensures
       * that the desired character(s) have a space before it in
       * lines that it appears. 
       */
      spaceBefore(lines, item) {
        var fileContent = "";
        var itemLen = item.length;
        var toWrite = "";
        var changed = false;
        var proper = "";
        var numLines = lines.length;
        var lineNum = 1;
        var i;
        for (i = 0; i < numLines; i++) {
            var line = lines[i];
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
                    && !this.checkMultiComment(line, item, indices[j])&& !this.partOfWord(line, item, indices[j])) {
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
              fileContent += toWrite;
              if (lineNum < numLines) {
                fileContent += "\n";
              }
            }
            toWrite = "";
          }
          if (!changed) {
            fileContent += line;
            if (lineNum < numLines) {
                fileContent += "\n";
            }
          }
          changed = false;
          lineNum++;
        }
        return fileContent;
      }
    
      /*
       * Method that takes in the lines of a file and ensures
       * that the desired character(s) has a space after it
       * in lines that it appears. 
       */
      spaceAfter(lines, item) {
        var fileContent = "";
        var toWrite = "";
        var itemLen = item.length;
        var changed = false;
        var numLines = lines.length;
        var lineNum = 1;
        var i;
        for (i = 0; i < numLines; i++) {
            var line = lines[i];
          if (line.includes(item)) {
            //indexOf(item, 0)
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
              fileContent += toWrite;
              if (lineNum < numLines) {
                fileContent += "\n";
              }
            }
            toWrite = "";
          }
          if (!changed) {
            fileContent += line;
            if (lineNum < numLines) {
                fileContent += "\n";
            }
          }
          changed = false;
          lineNum++;
        }
        return fileContent;
      }
        
      /*
        * Reads a line and ensures that it does not interefere 
        * with other ICEcΔp edits.
      */
      checkJavaDocInterfere(line) {
        if (line === "------- INCORRECT JAVADOC FORMAT -------" || line === "----------------------------------------") {
          return true; 
        }
        return false; 
      }
    
      /*
       * Reads a line and counts all appearances of item within
       * it. Takes in the line, the item and the item's length. 
       */
      numItems(line, item, itemLen) {
        var total = 0;
        var temp = line;
        while (temp.includes(item) && !(temp.trim() === item)) {
          total++;
          //indexOf(item, 0)
          var ind = temp.indexOf(item);
          if (itemLen === 1) {
            temp = temp.substring(ind + itemLen);
          } else {
            temp = temp.substring(ind + itemLen - 1);
          }
        }
        return total;
      }
    
      /*
       * Reads a line and using the line, the item the first index 
       * of the item and the item's length, returns a list of
       * all the indices of a string snippet within that line.
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
        while (temp.includes(item) && !(temp.trim() === item)) {
          //indexOf(item, 0)
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

      partOfWord(line, item, ind) { //include int ind, so that 
        var itemLen = item.length; 
        // boolean zeroInd = (ind == 0); 
        // boolean 
        var letters = /^[A-Za-z]+$/; 
    
        if (ind != 0 && ind+itemLen+1 <= line.length-1) { //preventing out of bounds
          var strBefore = line.substring(ind-1, ind);
          var strAfter = line.substring(ind+itemLen, ind+itemLen+1); 
          
          if (strBefore.match(letters) || strAfter.match(letters)) {
            //the keyword might be part of an actual word
            return true; 
          } 
          //return false;
        } else if (ind == 0) { // ex. doSmth
          var strAfter = line.substring(ind+itemLen, ind+itemLen+1); 
          if (strAfter.match(letters)) {
            //the keyword might be part of an actual word
            return true; 
          }
        } else if (ind+itemLen+1 > line.length-1) { //ex. howdo
          var strBefore = line.substring(ind-1, ind);
          if (strBefore.match(letters)) {
            //the keyword might be part of an actual word
            return true; 
          }
        }
        return false; 
        
      }
    
      /*
       * Inspects a line and determines if the occurence of item is
       * a multiple (ex. item is "+", checks if the first occurence 
       * in line is "++" or "+="). Takes in the line and the item. 
       */
      checkMult(line, item) {
        var ind = line.indexOf(item);
        if (ind !== 0 && ind !== (line.length-1)) {
            //changing back to line.charAt(index)
            if ((item === "+" || item === "-" || item === "=")
            && (line.charAt(ind + 1) === '+' || line.charAt(ind + 1) === '-'
            || line.charAt(ind + 1) === '=')) {
            return true;
          } else if ((item === "+" && line.charAt(ind + 1) === '=') || item === "="
              && line.charAt(ind - 1) === '+') {
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
        return false;
      }
    
      /*
       * Read a line and using the line and the index, determins if 
       * a certain '/' is part of a multiline comment declaration.  
       */
      checkMultiSlash(line, ind) {
        if (line.trim() === "*/" || line.trim() === "/**" || line.trim() === "/*") {
        return true; 
        } else if (ind !== 0 && ind != line.length-1) {
            if (line.charAt(ind + 1) === '*' || line.charAt(ind-1) === '*') {
                return true; 
            }
            return false; 
        } else if (ind !== line.length -1) {
            if (line.charAt(ind +1) === '*') {
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
    
      /*
       * Reads a line and using the line and the index determines if
       * a certain '*' being inspected is part of a multiline comment
       * declaration. 
       */
      checkMultiStar(line, ind) {
        if (line.trim() === "*/" || line.trim() === "/**" || line.trim() === "/*") {
        return true; 
        } else if (ind != 0 && line.charAt(ind-1)=== '.') {
          //likely part of an import 
          return true; 
        } 
        else if (ind !== 0 && ind !== line.length -1) {
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
    
      /*
       * Reads a line and using the line, the item and the first index
       * of the item, determins if a certain element being inspected
       * is part of a multiline comment declaration.  
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
    
      /*
       * Takes in the line, the index and the item length and inspects a 
       * line and determins the proper format if there were to be a space
       * after an item (substring representing character(s)). 
       */
      getProperAfter(line, ind, itemLen) {
        var proper = "";
        if (ind !== line.length - 1 && (ind + itemLen) <= line.length - 1) {
          var portion = line.substring(0, ind + itemLen);
          var end = line.substring(ind + itemLen).trim();
          var proper = portion + " " + end;
        }
        return proper;
      }
    
      /*
       * Takes in the line, the index and the item length and inspects
       * a line and determins the proper format if there were to be 
       * a space before an item (substring representing character(s)). 
       */
      getProperBefore(line, ind) {
        var portion = line.substring(0, ind).trim();
        var end = line.substring(ind);
        var proper = portion + " " + end;
        return proper;
      }
    
      /*
       * Takes in the lines of a file and ensures that each line in it
       * has no trailing blanks.  
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