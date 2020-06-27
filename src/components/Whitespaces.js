export default class Whitespaces {

    constructor() {

    }

    whitespaceMethod(inputFile) {
        return new Promise(
        function(resolve) {
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

    noSpaceBefore(lines, item) {
        var fileContent = "";
        var toWrite = "";
        var itemLen = item.length;
        var changed = false;
        var numLines = lines.length;
        var lineNum = 1;
        for (i = 0; i < lines.length; i++) {
            var line = lines[i];
          if (line.includes(item)) {
            var ind = line.indexOf(item, 0);
            var numPotentialErrs = numItems(line, item, itemLen);
            //ALL INDICES HAS TO RETURN []
            var indices = allIndices(line, item, ind, itemLen);
            for (j = 0; j < numPotentialErrs; j++) {
                  if (!checkJavaDocInterfere(line)) {
                      //changing == to .equals()
                      if (toWrite.equals("")) {
                    if (charAt(line, indices[j] - 1) == " ") {
                    toWrite = line.substring(0, indices[j]).trimRight();
                    toWrite += line.substring(indices[j]);
                    indices = allIndices(toWrite, item, toWrite.indexOf(item, 0), itemLen);
                    changed = true;
                    }
                  } else {
                  temp = toWrite.substring(indices[j]);
                  toWrite = toWrite.substring(0, indices[j]).trimRight();
                  toWrite += temp;
                  indices = allIndices(toWrite, item, toWrite.indexOf(item, 0), itemLen);
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
      }

      noSpaceAfter(lines, item) {
        var fileContent = "";
        var toWrite = "";
        var itemLen = item.length;
        var changed = false;
        var numLines = lines.length;
        var lineNum = 1;
        
        //for (String line in lines) {
        for (i = 0; i < numLines; i++) {
            var line = lines[i];
          if (line.includes(item)) {
            var ind = line.indexOf(item, 0);
            var numPotentialErrs = numItems(line, item, itemLen);
            var indices = allIndices(line, item, ind, itemLen);
            for (j = 0; j < numPotentialErrs; j++) {
                  if (!checkJavaDocInterfere(line)) {
                      if (toWrite.equals("")) {
                          //changing all the i --> j for inner statements
                        if (charAt(line, indices[j] + 1) == " ") {
                            toWrite = line.substring(0, indices[j] + itemLen);
                            toWrite += line.substring(indices[j] + itemLen).trimLeft();
                            indices = allIndices(toWrite, item, toWrite.indexOf(item, 0), itemLen);
                            changed = true;
                        }
                      } else {
                            var temp = toWrite.substring(indices[j] + itemLen).trimLeft();
                            toWrite = toWrite.substring(0, indices[j] + itemLen);
                            toWrite += temp;
                            indices = allIndices(toWrite, item, toWrite.indexOf(item, 0), itemLen);
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
        //for (String line in lines) {
        for (i = 0; i < numLines; i++) {
            var line = lines[i];
          if (line.includes(item)) {
            var ind = line.indexOf(item);
            var numPotentialErrs = numItems(line, item, itemLen);
            var indices = allIndices(line, item, ind, itemLen);
            for (j = 0; j < numPotentialErrs; j++) {
                  if (!checkJavaDocInterfere(line)) { 
                      if (toWrite === "") {
                        proper = getProperBefore(line, ind);
                        if (ind == 0 && !checkMult(line, item) 
                          && !checkMultiComment(line, item, indices[j])) {
                    toWrite = line.substring(0, indices[j]); 
                    toWrite += " " + line.substring(indices[j]); 
                    indices = allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                    changed = true; 
                        }
                      if (ind != 0) {
                          if (charAt(line, ind - 1) != " " && !checkMult(line, item) 
                          && !checkMultiComment(line, item, indices[j])) {
                              toWrite = line.substring(0, indices[j]);
                              toWrite += " " + line.substring(indices[j]);
                              indices = allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                              changed = true;
                        } else if (proper.trim() != line.trim() && !checkMult(line, item) 
                            && !checkMultiComment(line, item, indices[j])) {
                              toWrite = line.substring(0, indices[j]).trimRight();
                              toWrite += " " + line.substring(indices[j]);
                              indices = allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
                              changed = true;
                        }
                
                      }
              } else {
                  if (!checkMult(toWrite, item) && !checkMultiComment(toWrite, item, indices[j])) {
                    proper = getProperBefore(toWrite, indices[j]);
                    var temp = " " + toWrite.substring(indices[j]);
                    toWrite = toWrite.substring(0, indices[j]).trimRight();
                    toWrite += temp;
                    indices = allIndices(toWrite, item, toWrite.indexOf(item), itemLen);
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
        //for (String line in lines) {
        for (i = 0; i < numLines; i++) {
            //changing .contains() to .includes()
            var line = lines[i];
          if (line.includes(item)) {
            var ind = line.indexOf(item, 0);
            var numPotentialErrs = numItems(line, item, itemLen);
            var proper = "";
            var indices = allIndices(line, item, ind, itemLen);
            for (j = 0; j < numPotentialErrs; j++) {
                  if (!checkJavaDocInterfere(line)) {
                      if (toWrite === "") {
                  proper = getProperAfter(line, ind, itemLen);
                  if (indices[j] == line.length - 1) {
                    toWrite = line + " ";
                    indices = allIndices(toWrite, item, toWrite.indexOf(item, 0), itemLen);
                    changed = true;
                  } else if (proper.trim() != line.trim() && !checkMult(line, item)
                    && !checkMultiComment(line, item, indices[j])) {
                    toWrite = line.substring(0, indices[j] + itemLen);
                    toWrite += " " + line.substring(indices[j] + itemLen).trimLeft();
                    indices = allIndices(toWrite, item, toWrite.indexOf(item, 0), itemLen);
                    changed = true;
                  }
                } else {
                  if (indices[j] == toWrite.length - 1) {
                    toWrite = toWrite + " ";
                    indices = allIndices(toWrite, item, toWrite.indexOf(item, 0), itemLen);
                    changed = true;
                  } else if (!checkMult(toWrite, item) && !checkMultiComment(toWrite, item, indices[j])) {
                    proper = getProperAfter(toWrite, indices[j], itemLen);
                    var temp = toWrite.substring(indices[j] + itemLen).trimLeft();
                    toWrite = toWrite.substring(0, indices[j] + itemLen) + " ";
                    toWrite += temp;
                    indices = allIndices(toWrite, item, toWrite.indexOf(item, 0), itemLen);
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
      }
        
      /*
        * Reads a line and ensures that it does not interefere 
        * with other ICEcΔp edits.
      */
      checkJavaDocInterfere(line) {
        if (line == "------- INCORRECT JAVADOC FORMAT -------" || line == "----------------------------------------") {
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
        while (temp.includes(item) && !(temp.trim() == item)) {
          total++;
          var ind = temp.indexOf(item, 0);
          if (itemLen == 1) {
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
        if (itemLen == 1) {
          curr = ind + itemLen;
        } else {
          curr = ind + itemLen - 1;
        }
        var temp = line.substring(curr);
        while (temp.includes(item) && !(temp.trim() == item)) {
          curr += temp.indexOf(item, 0);
          indices.push(curr);
          if (itemLen == 1) {
            curr += itemLen;
            temp = temp.substring(temp.indexOf(item, 0) + itemLen);
          } else {
            curr += itemLen - 1;
            temp = temp.substring(temp.indexOf(item, 0) + itemLen - 1);
          }
        }
        return indices;
      }
    
      /*
       * Inspects a line and determines if the occurence of item is
       * a multiple (ex. item is "+", checks if the first occurence 
       * in line is "++" or "+="). Takes in the line and the item. 
       */
      checkMult(line, item) {
        var ind = line.indexOf(item);
        if (ind != 0 && ind != (line.length-1)) {
            //changing back to line.charAt(index)
            if ((item === "+" || item === "-" || item === "=")
            && (line.charAt(ind + 1) === "+" || line.charAt(ind + 1) === "-"
            || line.charAt(ind + 1) === "=")) {
            return true;
          } else if ((item === "+" && line.charAt(ind + 1) === "=") || item === "="
              && line.charAt(ind - 1) === "+") {
              return true;
          } else if (item === "/" && line.charAt(ind + 1) === "/") {
              return true;
          } else if (item === "/" && line.charAt(ind - 1) === "/") {
              return true;
          } else {
              return false;
          }
        } else if (ind ==0) {
          if ((item === "+" || item === "-" || item === "=")
            && (line.charAt(ind + 1) === "+" || line,charAt(ind + 1) === "-"
            || line.charAt(ind + 1) === "=")) {
            return true;
          } else if ((item === "+" && line.charAt(ind + 1) === "=")) {
              return true;
          } else if (item === "/" && line.charAt(ind + 1) === "/") {
              return true;
          } else {
              return false;
          }
          } else if (ind != (line.length-1)) {
              if (item === "="
                && line.charAt(ind - 1) === "+") {
                return true;
          } else if (item === "/" && line.charAt(ind - 1) === "/") {
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
        //changing back to line.charAt(index)
        } else if (ind != 0) {
            if (line.charAt(ind - 1) === '*') {
                return true; 
            }
        } else if (ind != line.length -1) {
            if (line.charAt(ind +1) === '*') {
                return true; 
            }
        } else if (ind != 0 && ind != line.length -1) {
            if (line.charAt(ind + 1) === '*' || line.charAt(ind - 1) === '*') {
                  return true;
            }
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
        } else if (ind != 0 && ind != line.length -1) {
          if (line.charAt(ind + 1) === '/' || line.charAt(ind - 1) === '/') {
          return true;
        } else if (line.charAt(ind + 1) === '*' || line.charAt(ind - 1) === '*') {
          return true; 
        }
        return false; 
        } else if (ind != line.length -1) {
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
        if (item.trim() === "*" && checkMultiStar(line, ind)) {
          return true;
        } else if (item.trim() === "/" && checkMultiSlash(line, ind)) {
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
        if (ind != line.length - 1 && (ind + itemLen) <= line.length - 1) {
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
        var lineNum = 1;
        var numLines = lines.length;
        for (i = 0; i < numLines; i++) {
            toWrite = line.trimRight();
            fileContent += toWrite;
            fileContent += "\n"; 
        }
      }
    
      //took out the manual 'charAt' method


}