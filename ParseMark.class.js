/**
 * Created by tianzhen on 17-4-23.
 */
var Reader = (function () {
    function Reader(id) {
        //获取全部文本
        this.reader = document.getElementById(id).innerHTML;
        this.lines = this.getLines();
        // this.parser = new Parser(this.getLineText(10));
    }
    Reader.prototype.testLines = function (index) {
        return index < this.lines.length;
    };
    Reader.prototype.runParser = function () {
        var readerIndex = 0;
        var hasParse = [];
        var tempStr = "";
        var tempArr = "";
        while (this.testLines(readerIndex)) {
            //获取行文本
            this.parser = new Parser(this.getLineText(readerIndex));
            //判断空白行
            if (this.parser.isEmptyLine()) {
                hasParse.push("\n");
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
                hasParse.push("<h" + count + ">" + tempStr + "</h" + count + ">");
                readerIndex++;
                continue;
            }
            readerIndex++;
        }
        console.log(hasParse);
    };
    /*获取文本，文本按html格式解析*/
    Reader.prototype.getHtml = function () {
        this.runParser();
    };
    /*获取文本，文本按字符串解析，特殊符号将被转义*/
    Reader.prototype.getText = function () {
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
    Reader.prototype.analyse = function () {
    };
    return Reader;
}());
var Parser = (function () {
    function Parser(line) {
        this.heading = /^(#{1,6}\s*)/;
        this.line = line;
    }
    Parser.prototype.isLastLine = function () {
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
    };
    Parser.prototype.isOrderedList = function () {
    };
    Parser.prototype.isText = function () {
    };
    Parser.prototype.isHr = function () {
    };
    Parser.prototype.isBlockQuote = function () {
    };
    Parser.prototype.isCodeBlock = function () {
    };
    Parser.prototype.isImage = function () {
    };
    Parser.prototype.isLink = function () {
    };
    Parser.prototype.isStrongText = function () {
    };
    Parser.prototype.isEmText = function () {
    };
    Parser.prototype.isCodeLine = function () {
    };
    return Parser;
}());
