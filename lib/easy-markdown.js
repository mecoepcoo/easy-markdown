/**
 * easy-markdown - a simple markdown to html parser
 * Copyright (c) 2017, Tianzhen(340349237@qq.com). (MIT License).
 */
var Reader = (function () {
    function Reader(id) {
        //获取全部原始文本
        this.reader = document.getElementById(id).value;
        //获取转移后的原始文本
        var temp = document.createElement("div");
        temp.innerText = this.reader;
        this.readerTransfer = temp.innerHTML;
        this.lines = this.getLines();
    }
    Reader.prototype.testLines = function (index) {
        return index < this.lines.length;
    };
    Reader.prototype.runParser = function () {
        var readerIndex = 0;
        var hasParse = [];
        var tempStr = "";
        var tempArr = [];
        var nextLine = null;
        while (this.testLines(readerIndex)) {
            //获取行文本
            this.parser = new Parser(this.getLineText(readerIndex));
            // console.dir(this.parser.line);
            //判断空白行
            if (this.parser.isEmptyLine()) {
                hasParse.push("<br>");
                readerIndex++;
                continue;
            }
            //判断标题
            if (this.parser.isHeading()) {
                var count = 0;
                tempArr = this.parser.line.split(" ");
                for (var i = 0; i < tempArr[0].length; i++) {
                    if (tempArr[0][i] == "#") {
                        count++;
                    }
                }
                tempStr = this.parser.line.replace(this.parser.heading, "");
                hasParse.push("<h" + count + ">" + tempStr + "</h" + count + ">\n");
                readerIndex++;
                continue;
            }
            //判断分隔符
            if (this.parser.isHr()) {
                hasParse.push("<hr>");
                readerIndex++;
                continue;
            }
            //判断引用区块
            if (this.parser.isBlockQuote()) {
                tempStr = this.parser.line.replace(this.parser.blockQuote, "");
                tempStr = "<p>" + tempStr + "</p>\n";
                //指针下移
                nextLine = new Parser(this.getLineText(readerIndex + 1));
                while (nextLine.isBlockQuote()) {
                    tempStr = tempStr + ("<p>" + nextLine.line.replace(nextLine.blockQuote, "") + "</p>\n");
                    readerIndex++;
                    nextLine = new Parser(this.getLineText(readerIndex + 1));
                }
                hasParse.push("<blockquote>" + tempStr + "</blockquote>");
                readerIndex++;
                continue;
            }
            //判断无序列表
            if (this.parser.isUnorderedList()) {
                tempStr = this.parser.line.replace(this.parser.unorderedList, "");
                tempStr = "<li>" + tempStr + "</li>\n";
                //指针下移
                nextLine = new Parser(this.getLineText(readerIndex + 1));
                while (nextLine.isUnorderedList()) {
                    tempStr = tempStr + ("<li>" + nextLine.line.replace(nextLine.unorderedList, "") + "</li>\n");
                    readerIndex++;
                    nextLine = new Parser(this.getLineText(readerIndex + 1));
                }
                tempStr = "<ul>" + tempStr + "</ul>\n";
                hasParse.push(tempStr);
                readerIndex++;
                continue;
            }
            //判断有序列表
            if (this.parser.isOrderedList()) {
                tempStr = this.parser.line.replace(this.parser.orderedList, "");
                tempStr = "<li>" + tempStr + "</li>\n";
                //指针下移
                nextLine = new Parser(this.getLineText(readerIndex + 1));
                while (nextLine.isOrderedList()) {
                    tempStr = tempStr + ("<li>" + nextLine.line.replace(nextLine.orderedList, "") + "</li>\n");
                    readerIndex++;
                    nextLine = new Parser(this.getLineText(readerIndex + 1));
                }
                tempStr = "<ol>" + tempStr + "</ol>\n";
                hasParse.push(tempStr);
                readerIndex++;
                continue;
            }
            //判断代码块
            if (this.parser.isCodeBlock()) {
                tempStr = this.parser.line.replace(this.parser.codeBlock, "");
                tempStr = "<pre><code class=\"" + tempStr + "\">";
                //指针下移
                nextLine = new Parser(this.getLineText(readerIndex + 1));
                while ((!nextLine.isCodeBlock()) && this.testLines(readerIndex + 1)) {
                    var temp = document.createElement("div");
                    temp.innerText = nextLine.line;
                    tempStr += temp.innerHTML + "\n";
                    readerIndex++;
                    nextLine = new Parser(this.getLineText(readerIndex + 1));
                }
                tempStr = "<div>" + tempStr + "</code></pre></div>\n";
                hasParse.push(tempStr);
                readerIndex += 2;
                continue;
            }
            tempStr = this.parser.inlineParse();
            tempStr = "<p>" + tempStr + "</p>";
            hasParse.push(tempStr);
            readerIndex++;
        }
        return hasParse;
    };
    /*获取文本，文本按html格式解析*/
    Reader.prototype.getHtml = function () {
        return this.runParser();
    };
    /**
     * 将解析后的字符串渲染到节点
     * @param elementId 要显示内容的节点id
     */
    Reader.prototype.showHtml = function (elementId) {
        var ele = document.getElementById(elementId);
        var tempStr = "";
        for (var _i = 0, _a = this.getHtml(); _i < _a.length; _i++) {
            var text = _a[_i];
            tempStr += text;
        }
        tempStr = "<div class=\"easy-markdown\">" + tempStr + "</div>";
        ele.innerHTML = tempStr;
    };
    /**
     * 获取一行文本
     * @param lineNum
     * @returns {string}
     */
    Reader.prototype.getLineText = function (lineNum) {
        this.oneLineText = this.getLines()[lineNum];
        return this.oneLineText;
    };
    Reader.prototype.getLines = function () {
        this.lines = this.reader.split("\n");
        return this.lines;
    };
    return Reader;
}());
var Parser = (function () {
    function Parser(line) {
        this.heading = /^(#{1,6}\s*)/;
        this.hr = /^(\*{3,}|-{3,})/;
        this.blockQuote = /^(\>\s+)/;
        this.unorderedList = /^((\*|-){1}\s+)/;
        this.orderedList = /^(\d{1}.\s+)/;
        this.codeBlock = /^(```)/;
        this.link = /\[(.*?)\]\((.*?)\)/g;
        this.image = /\!\[(.*?)\]\((.*?)\)/g;
        this.strongText = /\*{2}(.*?)\*{2}/g;
        this.emText = /\*{1}(.*?)\*{1}/g;
        this.codeLine = /\`{1}(.*?)\`{1}/g;
        this.line = line;
    }
    Parser.prototype.isLastLine = function () {
        return;
    };
    /**
     * 判断空行
     * @returns {boolean}
     */
    Parser.prototype.isEmptyLine = function () {
        return this.line == "";
    };
    Parser.prototype.isHeading = function () {
        return this.heading.test(this.line);
    };
    Parser.prototype.isUnorderedList = function () {
        return this.unorderedList.test(this.line);
    };
    Parser.prototype.isOrderedList = function () {
        return this.orderedList.test(this.line);
    };
    Parser.prototype.isHr = function () {
        return this.hr.test(this.line);
    };
    Parser.prototype.isBlockQuote = function () {
        return this.blockQuote.test(this.line);
    };
    Parser.prototype.isCodeBlock = function () {
        return this.codeBlock.test(this.line);
    };
    Parser.prototype.isImage = function () {
        return this.image.test(this.line);
    };
    Parser.prototype.parseImage = function (str) {
        return str.replace(this.image, function (result, str1, str2) {
            return "<img src=\"" + str2 + "\" alt=\"" + str1 + "\">";
        });
    };
    Parser.prototype.isLink = function () {
        return this.link.test(this.line);
    };
    Parser.prototype.parseLink = function (str) {
        return str.replace(this.link, function (result, str1, str2) {
            return "<a href=\"" + str2 + "\">" + str1 + "</a>";
        });
    };
    Parser.prototype.isStrongText = function () {
        return this.strongText.test(this.line);
    };
    Parser.prototype.parseStrongText = function (str) {
        return str.replace(this.strongText, function (result, str1) {
            return "<b>" + str1 + "</b>";
        });
    };
    Parser.prototype.isEmText = function () {
        return this.emText.test(this.line);
    };
    Parser.prototype.parseEmText = function (str) {
        return str.replace(this.emText, function (result, str1) {
            return "<em>" + str1 + "</em>";
        });
    };
    Parser.prototype.isCodeLine = function () {
        return this.codeLine.test(this.line);
    };
    Parser.prototype.parseCodeLine = function (str) {
        return str.replace(this.codeLine, function (result, str1) {
            return "<code>" + str1 + "</code>";
        });
    };
    Parser.prototype.inlineParse = function (str) {
        if (str === void 0) { str = this.line; }
        //代码行
        if (this.isCodeLine()) {
            str = this.parseCodeLine(str);
        }
        //图片
        if (this.isImage()) {
            str = this.parseImage(str);
        }
        //超链接
        if (this.isLink()) {
            str = this.parseLink(str);
        }
        //粗体
        if (this.isStrongText()) {
            str = this.parseStrongText(str);
        }
        //斜体
        if (this.isEmText()) {
            str = this.parseEmText(str);
        }
        return str;
    };
    return Parser;
}());
//todo 待添加：emoji表情功能，代码高亮，代码行号,自动目录生成，自动滚动条位置 
