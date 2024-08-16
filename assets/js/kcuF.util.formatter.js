(function(kcuF, $) {
	"use strict";
	
	/**
	 * @namespace
	 * @name kcuF.util.formatter
	 */
	var formatter = kcuF.ns("util.formatter");
	
	$.extend(formatter, /** @lends kcuF.util.formatter */{
		formatHTML: function(htmlSource, indentSize, indentChar, maxChar) {
			// Wrapper function to invoke all the necessary constructors and deal with the output.
			var Parser = function() {
				this.tags = {
					parent: "parent1",
					parentcount: 1,
					parent1: ""
				};
			};
			$.extend(Parser, {
				WHITESPACE: "\n\r\t ".split(""),
				SINGLE_TOKEN: "br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed".split(","),// all the single tags for HTML
				EXTRA_LINERS: "head,body,/html".split(","),
				
				inArray: function(what, arr) {
					return $.inArray(what, arr) >= 0;
				}
			});
			$.extend(Parser.prototype, {
				pos: 0,// Parser position
				token: "",
				currentMode: "CONTENT",
				tags: null,// An object to hold tags, their position, and their parent-tags, initiated with default values
				tagType: "",
				tokenText: "",
				lastToken: "",
				lastText: "",
				tokenType: "",
				
				/**
				 * capture regular content between tags
				 */
				getContent: function() {
					var char = "",
						contBuff = [],
						space = false;// if a space is needed
					
					while (this.input.charAt(this.pos) !== "<") {
						if (this.pos >= this.input.length) {
							return content.length ? contBuff.join("") : ["", "TK_EOF"];
						}
						
						char = this.input.charAt(this.pos);
						this.pos++;
						this.lineCharCount++;
						
						if (Parser.inArray(char, Parser.WHITESPACE)) {
							if (content.length) {
								space = true;
							}
							this.lineCharCount--;
							continue;// don't want to insert unnecessary space
						} else if (space) {
							if (this.lineCharCount >= this.maxChar) {// insert a line when the maxChar is reached
								contBuff.push("\n");
								for (var i = 0; i < this.indentLevel; i++) {
									contBuff.push(this.indentString);
								}
								this.lineCharCount = 0;
							} else {
								contBuff.push(" ");
								this.lineCharCount++;
							}
							space = false;
						}
						contBuff.push(char);// letter at-a-time (or string) inserted to an array
					}
					return content.length ? contBuff.join("") : "";
				},
				/**
				 * get the full content of a script to pass to formatJS
				 */
				getScript: function() {
					var char = "",
						contBuff = [],
						regMatch = new RegExp("\<\/script" + "\>", "igm");
					
					regMatch.lastIndex = this.pos;
					var regArr = regMatch.exec(this.input);
					var endScript = regArr ? regArr.index : this.input.length;// absolute end of script
					while (this.pos < endScript) {// get everything in between the script tags
						if (this.pos >= this.input.length) {
							return content.length ? contBuff.join("") : ["", "TK_EOF"];
						}
						
						char = this.input.charAt(this.pos);
						this.pos++;
						
						contBuff.push(char);
					}
					return content.length ? contBuff.join("") : "";// we might not have any content at all
				},
				/**
				 * function to record a tag and its parent in this.tags Object
				 * @param {String} tag
				 */
				recordTag: function(tag) {
					if (this.tags[tag + "count"]) {// check for the existence of this tag type
						this.tags[tag + "count"]++;
						this.tags[tag + this.tags[tag + "count"]] = this.indentLevel;// and record the present indent level
					} else {// otherwise initialize this tag type
						this.tags[tag + "count"] = 1;
						this.tags[tag + this.tags[tag + "count"]] = this.indentLevel;// and record the present indent level
					}
					this.tags[tag + this.tags[tag + "count"] + "parent"] = this.tags.parent;// set the parent (i.e. in the case of a div this.tags.div1parent)
					this.tags.parent = tag + this.tags[tag + "count"];// and make this the current parent (i.e. in the case of a div "div1")
				},
				/**
				 * retrieve the opening tag to the corresponding closer
				 * @param {String} tag
				 */
				retrieveTag: function(tag) {
					if (this.tags[tag + "count"]) {// if the opener is not in the Object we ignore it
						var temp_parent = this.tags.parent;// check to see if it's a closable tag.
						while (temp_parent) {// till we reach "" (the initial value);
							if (tag + this.tags[tag + "count"] === temp_parent) {// if this is it use it
								break;
							}
							temp_parent = this.tags[temp_parent + "parent"];// otherwise keep on climbing up the DOM Tree
						}
						if (temp_parent) {// if we caught something
							this.indentLevel = this.tags[tag + this.tags[tag + "count"]];// set the indentLevel accordingly
							this.tags.parent = this.tags[temp_parent + "parent"];// and set the current parent
						}
						delete this.tags[tag + this.tags[tag + "count"] + "parent"];// delete the closed tags parent reference...
						delete this.tags[tag + this.tags[tag + "count"]];// ...and the tag itself
						if (this.tags[tag + "count"] == 1) {
							delete this.tags[tag + "count"];
						} else {
							this.tags[tag + "count"]--;
						}
					}
				},
				/**
				 * get a full tag and parse its type
				 * @returns {Sting}
				 */
				getTag: function() {
					var char = "",
						contBuff = [],
						space = false;
					
					do {
						if (this.pos >= this.input.length) {
							return content.length ? contBuff.join("") : ["", "TK_EOF"];
						}
						
						char = this.input.charAt(this.pos);
						this.pos++;
						this.lineCharCount++;
						
						if (Parser.inArray(char, Parser.WHITESPACE)) {// don't want to insert unnecessary space
							space = true;
							this.lineCharCount--;
							continue;
						}
						
						if (char === "'" || char === "\"") {
							if (!contBuff[1] || contBuff[1] !== "!") {// if we're in a comment strings don't get treated specially
								char += this.getUnformatted(char);
								space = true;
							}
						}
						
						if (char === "=") {// no space before =
							space = false;
						}
						
						if (content.length && contBuff[content.length - 1] !== "=" && char !== ">" && space) {// no space after = or before >
							if (this.lineCharCount >= this.maxChar) {
								this.printNewline(false, contBuff);
								this.lineCharCount = 0;
							} else {
								contBuff.push(" ");
								this.lineCharCount++;
							}
							space = false;
						}
						contBuff.push(char);// inserts character at-a-time (or string)
					} while (char !== ">");
					
					var tag_complete = contBuff.join("");
					var tag_index;
					if (tag_complete.indexOf(" ") != -1) {// if there's whitespace, thats where the tag name ends
						tag_index = tag_complete.indexOf(" ");
					} else {// otherwise go with the tag ending
						tag_index = tag_complete.indexOf(">");
					}
					var tag_check = tag_complete.substring(1, tag_index).toLowerCase();
					if (tag_complete.charAt(tag_complete.length - 2) === "/" || Parser.inArray(tag_check, Parser.SINGLE_TOKEN)) {// if this tag name is a single tag type (either in the list or has a closing /)
						this.tagType = "SINGLE";
					} else if (tag_check === "script") {// for later script handling
						this.recordTag(tag_check);
						this.tagType = "SCRIPT";
					} else if (tag_check === "style") {// for future style handling (for now it just uses getContent)
						this.recordTag(tag_check);
						this.tagType = "STYLE";
					} else if (tag_check.charAt(0) === "!") {// peek for <!-- comment
						if (tag_check.indexOf("[if") != -1) {// peek for <!--[if conditional comment
							if (tag_complete.indexOf("!IE") != -1) {// this type needs a closing --> so...
								var comment = this.getUnformatted("-->", tag_complete);// ...delegate to getUnformatted
								contBuff.push(comment);
							}
							this.tagType = "START";
						} else if (tag_check.indexOf("[endif") != -1) {//peek for <!--[endif end conditional comment
							this.tagType = "END";
							this.unindent();
						} else if (tag_check.indexOf("[cdata[") != -1) {// if it's a <[cdata[comment...
							var comment = this.getUnformatted("]]>", tag_complete);// ...delegate to getUnformatted function
							contBuff.push(comment);
							this.tagType = "SINGLE";// <![CDATA[comments are treated like single tags
						} else {
							var comment = this.getUnformatted("-->", tag_complete);
							contBuff.push(comment);
							this.tagType = "SINGLE";
						}
					} else {
						if (tag_check.charAt(0) === "/") {// this tag is a double tag so check for tag-ending
							this.retrieveTag(tag_check.substring(1));// remove it and all ancestors
							this.tagType = "END";
						} else {// otherwise it's a start-tag
							this.recordTag(tag_check);// push it on the tag stack
							this.tagType = "START";
						}
						if (Parser.inArray(tag_check, Parser.EXTRA_LINERS)) {// check if this double needs an extra line
							this.printNewline(true, this.output);
						}
					}
					return contBuff.join("");// returns fully formatted tag
				},
				/**
				 * return unformatted content in its entirety
				 * @param {String} delimiter
				 * @param {String} orig_tag
				 * @returns {String}
				 */
				getUnformatted: function(delimiter, orig_tag) {
					if (orig_tag && orig_tag.indexOf(delimiter) != -1) {
						return "";
					}
					var char = "",
						contBuff = "",
						space = true;
					
					do {
						char = this.input.charAt(this.pos);
						this.pos++;
						
						if (Parser.inArray(char, Parser.WHITESPACE)) {
							if (!space) {
								this.lineCharCount--;
								continue;
							}
							if (char === "\n" || char === "\r") {
								contBuff += "\n";
								for (var i = 0; i < this.indentLevel; i++) {
									contBuff += this.indentString;
								}
								space = false;// ...and make sure other indentation is erased
								this.lineCharCount = 0;
								continue;
							}
						}
						contBuff += char;
						this.lineCharCount++;
						space = true;
						
					} while (contBuff.indexOf(delimiter) == -1);
					return contBuff;
				},
				/**
				 * initial handler for token-retrieval
				 * @returns {Array}
				 */
				getToken: function() {
					var token;
					
					if (this.lastToken === "TK_TAG_SCRIPT") {// check if we need to format JS
						var tmpToken = this.getScript();
						if (typeof tmpToken !== "string") {
							return tmpToken;
						}
						token = kcuF.formatJS(tmpToken, this.indentSize, this.indentCharacter, this.indentLevel);// call the JS Beautifier
						return [token, "TK_CONTENT"];
					}
					if (this.currentMode === "CONTENT") {
						token = this.getContent();
						if (typeof token !== "string") {
							return token;
						}
						return [token, "TK_CONTENT"];
					}
					
					if (this.currentMode === "TAG") {
						token = this.getTag();
						if (typeof token !== "string") {
							return token;
						}
						return [token, "TK_TAG_" + this.tagType];
					}
				},
				/**
				 * handles input/output and some other printing functions
				 * @param {String} jsSource
				 * @param {String} indentCharacter
				 * @param {Number} indentSize_
				 * @param {Number} maxChar_
				 */
				printer: function(jsSource, indentCharacter, indentSize_, maxChar_) {
					this.input = jsSource || "";// gets the input for the Parser
					this.output = [];
					this.indentCharacter = indentCharacter || " ";
					this.indentString = "";
					this.indentSize = indentSize_ || 2;
					this.indentLevel = 0;
					this.maxChar = maxChar_ || 70;// maximum amount of characters per line
					this.lineCharCount = 0;// count to see if maxChar was exceeded
					
					for (var i = 0; i < this.indentSize; i++) {
						this.indentString += this.indentCharacter;
					}
					
					this.printNewline = function(ignore, arr) {
						this.lineCharCount = 0;
						if (!arr || !arr.length) {
							return;
						}
						if (!ignore) {// we might want the extra line
							while (Parser.inArray(arr[arr.length - 1], Parser.WHITESPACE)) {
								arr.pop();
							}
						}
						arr.push("\n");
						for (var i = 0; i < this.indentLevel; i++) {
							arr.push(this.indentString);
						}
					};
					
					this.printToken = function(text) {
						this.output.push(text);
					};
					
					this.indent = function() {
						this.indentLevel++;
					};
					
					this.unindent = function() {
						if (this.indentLevel > 0) {
							this.indentLevel--;
						}
					};
				}
			});
			
			var parser = new Parser();// wrapping functions Parser
			parser.printer(htmlSource, indentChar, indentSize);// initialize starting values
			
			while (true) {
				var t = parser.getToken();
				parser.tokenText = t[0];
				parser.tokenType = t[1];
				
				if (parser.tokenType === "TK_EOF") {
					break;
				}
				
				switch (parser.tokenType) {
				case "TK_TAG_START":
				case "TK_TAG_SCRIPT":
				case "TK_TAG_STYLE":
					parser.printNewline(false, parser.output);
					parser.printToken(parser.tokenText);
					parser.indent();
					parser.currentMode = "CONTENT";
					break;
				case "TK_TAG_END":
					parser.printNewline(true, parser.output);
					parser.printToken(parser.tokenText);
					parser.currentMode = "CONTENT";
					break;
				case "TK_TAG_SINGLE":
					parser.printNewline(false, parser.output);
					parser.printToken(parser.tokenText);
					parser.currentMode = "CONTENT";
					break;
				case "TK_CONTENT":
					if (parser.tokenText !== "") {
						parser.printNewline(false, parser.output);
						parser.printToken(parser.tokenText);
					}
					parser.currentMode = "TAG";
					break;
				}
				parser.lastToken = parser.tokenType;
				parser.lastText = parser.tokenText;
			}
			return parser.output.join("");
		},
		
		formatJS: function(jsSourceText, indentSize, indentChar, indentLevel) {
			var input, output, tokenText, lastType, lastText, lastWord, currentMode, modes, indentString;
			var whitespace, wordchar, punct, parserPos, lineStarters, inCase;
			var prefix, tokenType, doBlockJustClosed, varLine, varLineTainted;
			
			function trimOutput() {
				while (output.length && (output[output.length - 1] === " " || output[output.length - 1] === indentString)) {
					output.pop();
				}
			}
			
			function printNewline(ignoreRepeated) {
				ignoreRepeated = typeof ignoreRepeated === "undefined" ? true : ignoreRepeated;
				
				trimOutput();
				
				if (!output.length) {
					return;// no newline on start of file
				}
				
				if (output[output.length - 1] !== "\n" || !ignoreRepeated) {
					output.push("\n");
				}
				for (var i = 0; i < indentLevel; i++) {
					output.push(indentString);
				}
			}
			
			function printSpace() {
				var lastOutput = output.length ? output[output.length - 1] : " ";
				if (lastOutput !== " " && lastOutput !== "\n" && lastOutput !== indentString) {// prevent occassional duplicate space
					output.push(" ");
				}
			}
			
			function printToken() {
				output.push(tokenText);
			}
			
			function indent() {
				indentLevel++;
			}
			
			function unindent() {
				if (indentLevel) {
					indentLevel--;
				}
			}
			
			function remove_indent() {
				if (output.length && output[output.length - 1] === indentString) {
					output.pop();
				}
			}
			
			function setMode(mode) {
				modes.push(currentMode);
				currentMode = mode;
			}
			
			function restoreMode() {
				doBlockJustClosed = currentMode === "DO_BLOCK";
				currentMode = modes.pop();
			}
			
			function in_array(what, arr) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] === what) {
						return true;
					}
				}
				return false;
			}
			
			function getNextToken() {
				var nNewlines = 0;
				var c = "";
				
				do {
					if (parserPos >= input.length) {
						return ["", "TK_EOF"];
					}
					c = input.charAt(parserPos);
					
					parserPos += 1;
					if (c === "\n") {
						nNewlines += 1;
					}
				} while (in_array(c, whitespace));
				
				if (nNewlines > 1) {
					for (var i = 0; i < 2; i++) {
						printNewline(i === 0);
					}
				}
				var wantedNewline = (nNewlines === 1);
				
				if (in_array(c, wordchar)) {
					if (parserPos < input.length) {
						while (in_array(input.charAt(parserPos), wordchar)) {
							c += input.charAt(parserPos);
							parserPos += 1;
							if (parserPos === input.length) {
								break;
							}
						}
					}
					
					// small and surprisingly unugly hack for 1E-10 representation
					if (parserPos !== input.length && c.match(/^[0-9]+[Ee]$/) && input.charAt(parserPos) === "-") {
						parserPos += 1;
						
						var t = getNextToken(parserPos);
						c += "-" + t[0];
						return [c, "TK_WORD"];
					}
					
					if (c === "in") {// hack for "in" operator
						return [c, "TK_OPERATOR"];
					}
					return [c, "TK_WORD"];
				}
				
				if (c === "(" || c === "[") {
					return [c, "TK_START_EXPR"];
				}
				
				if (c === ")" || c === "]") {
					return [c, "TK_END_EXPR"];
				}
				
				if (c === "{") {
					return [c, "TK_START_BLOCK"];
				}
				
				if (c === "}") {
					return [c, "TK_END_BLOCK"];
				}
				
				if (c === ";") {
					return [c, "TK_END_COMMAND"];
				}
				
				if (c === "/") {
					var comment = "";
					// peek for comment /* ... */
					if (input.charAt(parserPos) === "*") {
						parserPos += 1;
						if (parserPos < input.length) {
							while (!(input.charAt(parserPos) === "*" && input.charAt(parserPos + 1) && input.charAt(parserPos + 1) === "/") && parserPos < input.length) {
								comment += input.charAt(parserPos);
								parserPos += 1;
								if (parserPos >= input.length) {
									break;
								}
							}
						}
						parserPos += 2;
						return ["/*" + comment + "*/", "TK_BLOCK_COMMENT"];
					}
					// peek for comment// ...
					if (input.charAt(parserPos) === "/") {
						comment = c;
						while (input.charAt(parserPos) !== "\x0d" && input.charAt(parserPos) !== "\x0a") {
							comment += input.charAt(parserPos);
							parserPos += 1;
							if (parserPos >= input.length) {
								break;
							}
						}
						parserPos += 1;
						if (wantedNewline) {
							printNewline();
						}
						return [comment, "TK_COMMENT"];
					}
					
				}
				
				if (c === "'" || c === "\"" || (c === "/" && ((lastType === "TK_WORD" && lastText === "return") || (lastType === "TK_START_EXPR" || lastType === "TK_END_BLOCK" || lastType === "TK_OPERATOR" || lastType === "TK_EOF" || lastType === "TK_END_COMMAND")))) {// regexp
					var sep = c;
					var esc = false;
					c = "";
					
					if (parserPos < input.length) {
						while (esc || input.charAt(parserPos) !== sep) {
							c += input.charAt(parserPos);
							if (!esc) {
								esc = input.charAt(parserPos) === "\\";
							} else {
								esc = false;
							}
							parserPos += 1;
							if (parserPos >= input.length) {
								break;
							}
						}
						
					}
					
					parserPos += 1;
					if (lastType === "TK_END_COMMAND") {
						printNewline();
					}
					return [sep + c + sep, "TK_STRING"];
				}
				
				if (in_array(c, punct)) {
					while (parserPos < input.length && in_array(c + input.charAt(parserPos), punct)) {
						c += input.charAt(parserPos);
						parserPos += 1;
						if (parserPos >= input.length) {
							break;
						}
					}
					return [c, "TK_OPERATOR"];
				}
				
				return [c, "TK_UNKNOWN"];
			}
			
			indentChar = indentChar || " ";
			indentSize = indentSize || 4;
			
			indentString = "";
			while (indentSize--) {
				indentString += indentChar;
			}
			
			input = jsSourceText;
			
			lastWord = "";// last "TK_WORD" passed
			lastType = "TK_START_EXPR";// last token type
			lastText = "";// last token text
			output = [];
			
			doBlockJustClosed = false;
			varLine = false;
			varLineTainted = false;
			
			whitespace = "\n\r\t ".split("");
			wordchar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".split("");
			punct = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |=".split(" ");
			
			// words which should always start on new line.
			lineStarters = "continue,try,throw,return,var,if,switch,case,default,for,while,break,function".split(",");
			
			// states showing if we are currently in expression (i.e. "if" case) - "EXPRESSION", or in usual block (like, procedure), "BLOCK".
			// some formatting depends on that.
			currentMode = "BLOCK";
			modes = [currentMode];
			
			indentLevel = indentLevel || 0;
			parserPos = 0;// parser position
			inCase = false;// flag for parser that case/default has been processed, and next colon needs special attention
			while (true) {
				var t = getNextToken(parserPos);
				tokenText = t[0];
				tokenType = t[1];
				if (tokenType === "TK_EOF") {
					break;
				}
				
				switch (tokenType) {
				case "TK_START_EXPR":
					varLine = false;
					setMode("EXPRESSION");
					if (lastType === "TK_END_EXPR" || lastType === "TK_START_EXPR") {
						// do nothing on (( and )( and ][ and ](..
					} else if (lastType !== "TK_WORD" && lastType !== "TK_OPERATOR") {
						printSpace();
					} else if (in_array(lastWord, lineStarters) && lastWord !== "function") {
						printSpace();
					}
					printToken();
					break;
				case "TK_END_EXPR":
					printToken();
					restoreMode();
					break;
				case "TK_START_BLOCK":
					if (lastWord === "do") {
						setMode("DO_BLOCK");
					} else {
						setMode("BLOCK");
					}
					if (lastType !== "TK_OPERATOR" && lastType !== "TK_START_EXPR") {
						if (lastType === "TK_START_BLOCK") {
							printNewline();
						} else {
							printSpace();
						}
					}
					printToken();
					indent();
					break;
				case "TK_END_BLOCK":
					if (lastType === "TK_START_BLOCK") {
						trimOutput();
						unindent();
					} else {
						unindent();
						printNewline();
					}
					printToken();
					restoreMode();
					break;
				case "TK_WORD":
					if (doBlockJustClosed) {
						printSpace();
						printToken();
						printSpace();
						break;
					}
					
					if (tokenText === "case" || tokenText === "default") {
						if (lastText === ":") {// switch cases following one another
							remove_indent();
						} else {// case statement starts in the same line where switch
							unindent();
							printNewline();
							indent();
						}
						printToken();
						inCase = true;
						break;
					}
					
					prefix = "NONE";
					if (lastType === "TK_END_BLOCK") {
						if (!in_array(tokenText.toLowerCase(), ["else", "catch", "finally"])) {
							prefix = "NEWLINE";
						} else {
							prefix = "SPACE";
							printSpace();
						}
					} else if (lastType === "TK_END_COMMAND" && (currentMode === "BLOCK" || currentMode === "DO_BLOCK")) {
						prefix = "NEWLINE";
					} else if (lastType === "TK_END_COMMAND" && currentMode === "EXPRESSION") {
						prefix = "SPACE";
					} else if (lastType === "TK_WORD") {
						prefix = "SPACE";
					} else if (lastType === "TK_START_BLOCK") {
						prefix = "NEWLINE";
					} else if (lastType === "TK_END_EXPR") {
						printSpace();
						prefix = "NEWLINE";
					}
					
					if (lastType !== "TK_END_BLOCK" && in_array(tokenText.toLowerCase(), ["else", "catch", "finally"])) {
						printNewline();
					} else if (in_array(tokenText, lineStarters) || prefix === "NEWLINE") {
						if (lastText === "else") {// no need to force newline on else break
							printSpace();
						} else if ((lastType === "TK_START_EXPR" || lastText === "=") && tokenText === "function") {// no need to force newline on "function": (function
							// DO NOTHING
						} else if (lastType === "TK_WORD" && (lastText === "return" || lastText === "throw")) {// no newline between "return nnn"
							printSpace();
						} else if (lastType !== "TK_END_EXPR") {
							if ((lastType !== "TK_START_EXPR" || tokenText !== "var") && lastText !== ":") {// no need to force newline on "var": for (var x = 0...)
								if (tokenText === "if" && lastType === "TK_WORD" && lastWord === "else") {// no newline for } else if {
									printSpace();
								} else {
									printNewline();
								}
							}
						} else {
							if (in_array(tokenText, lineStarters) && lastText !== ")") {
								printNewline();
							}
						}
					} else if (prefix === "SPACE") {
						printSpace();
					}
					printToken();
					lastWord = tokenText;
					
					if (tokenText === "var") {
						varLine = true;
						varLineTainted = false;
					}
					
					break;
				case "TK_END_COMMAND":
					printToken();
					varLine = false;
					break;
				case "TK_STRING":
					if (lastType === "TK_START_BLOCK" || lastType === "TK_END_BLOCK") {
						printNewline();
					} else if (lastType === "TK_WORD") {
						printSpace();
					}
					printToken();
					break;
				case "TK_OPERATOR":
					var start_delim = true;
					var end_delim = true;
					if (varLine && tokenText !== ",") {
						varLineTainted = true;
						if (tokenText === ":") {
							varLine = false;
						}
					}
					
					if (tokenText === ":" && inCase) {
						printToken();// colon really asks for separate treatment
						printNewline();
						break;
					}
					
					inCase = false;
					
					if (tokenText === ",") {
						if (varLine) {
							if (varLineTainted) {
								printToken();
								printNewline();
								varLineTainted = false;
							} else {
								printToken();
								printSpace();
							}
						} else if (lastType === "TK_END_BLOCK") {
							printToken();
							printNewline();
						} else {
							if (currentMode === "BLOCK") {
								printToken();
								printNewline();
							} else {// EXPR or DO_BLOCK
								printToken();
								printSpace();
							}
						}
						break;
					} else if (tokenText === "--" || tokenText === "++") {// unary operators special case
						if (lastText === ";") {// space for (;; ++i)
							start_delim = true;
							end_delim = false;
						} else {
							start_delim = false;
							end_delim = false;
						}
					} else if (tokenText === "!" && lastType === "TK_START_EXPR") {// special case handling: if (!a)
						start_delim = false;
						end_delim = false;
					} else if (lastType === "TK_OPERATOR") {
						start_delim = false;
						end_delim = false;
					} else if (lastType === "TK_END_EXPR") {
						start_delim = true;
						end_delim = true;
					} else if (tokenText === ".") {// decimal digits or object.property
						start_delim = false;
						end_delim = false;
						
					} else if (tokenText === ":") {// zz: xx - can't differentiate ternary op, so for now it's a ? b: c; without space before colon
						if (lastText.match(/^\d+$/)) {// a little help for ternary a ? 1 : 0;
							start_delim = true;
						} else {
							start_delim = false;
						}
					}
					if (start_delim) {
						printSpace();
					}
					
					printToken();
					
					if (end_delim) {
						printSpace();
					}
					break;
				case "TK_BLOCK_COMMENT":
					printNewline();
					printToken();
					printNewline();
					break;
				case "TK_COMMENT":
					printSpace();
					printToken();
					printNewline();
					break;
				case "TK_UNKNOWN":
					printToken();
					break;
				}
				
				lastType = tokenType;
				lastText = tokenText;
			}
			
			return output.join("");
		}
	});
}(kcuF, $));