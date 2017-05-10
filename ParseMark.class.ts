/**
 * Created by tianzhen on 17-4-23.
 */
class Reader {
    reader: string;
    parser: any;

    lines: Array<string>;
    oneLineText: string;

    constructor(id: string) {
        //获取全部文本
        this.reader =  document.getElementById(id).value;

        this.lines = this.getLines();
    }

    private testLines(index) {
        return index < this.lines.length;
    }

    private runParser() {
        let readerIndex: number = 0;
        let hasParse: Array<string> = [];
        let tempStr = "";
        let tempArr = [];
        let nextLine = null;
        while (this.testLines(readerIndex)) {
            //获取行文本
            this.parser = new Parser(this.getLineText(readerIndex));
            // console.dir(this.parser.line);
            //判断空白行
            if(this.parser.isEmptyLine()) {
                hasParse.push("\n");
                readerIndex++;
                continue;
            }
            //判断标题
            if(this.parser.isHeading()) {
                let count = 0;
                tempArr = this.parser.line.split(" ");

                for(let i = 0; i < tempArr[0].length; i++){
                    if (tempArr[0][i] == "#") {
                        count++;
                    }
                }

                tempStr = this.parser.line.replace(this.parser.heading, "");

                hasParse.push(`<h${count}>${tempStr}</h${count}>\n`);
                readerIndex++;
                continue;
            }
            //判断分隔符
            if(this.parser.isHr()) {
                hasParse.push("<hr>");
                readerIndex++;
                continue;
            }
            //判断引用区块
            if(this.parser.isBlockQuote()) {
                tempStr = this.parser.line.replace(this.parser.blockQuote, "");
                tempStr = `<p>${tempStr}</p>\n`;
                //指针下移
                nextLine = new Parser(this.getLineText(readerIndex + 1));
                while(nextLine.isBlockQuote()) {
                    tempStr = tempStr + `<p>${nextLine.line.replace(nextLine.blockQuote, "")}</p>\n`;
                    readerIndex++;
                    nextLine = new Parser(this.getLineText(readerIndex + 1));
                }
                hasParse.push(`<blockquote>${tempStr}</blockquote>`);
                readerIndex++;
                continue;
            }

            //判断无序列表
            if(this.parser.isUnorderedList()) {
                tempStr = this.parser.line.replace(this.parser.unorderedList, "");
                tempStr = `<li>${tempStr}</li>\n`;
                //指针下移
                nextLine = new Parser(this.getLineText(readerIndex + 1));
                while (nextLine.isUnorderedList()) {
                    tempStr = tempStr + `<li>${nextLine.line.replace(nextLine.unorderedList, "")}</li>\n`;
                    readerIndex++;
                    nextLine = new Parser(this.getLineText(readerIndex + 1));
                }
                tempStr = `<ul>${tempStr}</ul>\n`;
                hasParse.push(tempStr);
                readerIndex++;
                continue;
            }

            //判断有序列表
            if(this.parser.isOrderedList()) {
                tempStr = this.parser.line.replace(this.parser.orderedList, "");
                tempStr = `<li>${tempStr}</li>\n`;
                //指针下移
                nextLine = new Parser(this.getLineText(readerIndex + 1));
                while (nextLine.isOrderedList()) {
                    tempStr = tempStr + `<li>${nextLine.line.replace(nextLine.orderedList, "")}</li>\n`;
                    readerIndex++;
                    nextLine = new Parser(this.getLineText(readerIndex + 1));
                }
                tempStr = `<ol>${tempStr}</ol>\n`;
                hasParse.push(tempStr);
                readerIndex++;
                continue;
            }

            //判断代码块
            if(this.parser.isCodeBlock()) {
                tempStr = this.parser.line.replace(this.parser.codeBlock, "");
                tempStr = `<pre language="${tempStr}">\n`;
                //指针下移
                nextLine = new Parser(this.getLineText(readerIndex + 1));
                while ((!nextLine.isCodeBlock()) && this.testLines(readerIndex)) {
                    tempStr += nextLine.line + "\n";
                    readerIndex++;
                    nextLine = new Parser(this.getLineText(readerIndex + 1));
                }
                tempStr = `<div>${tempStr}</pre></div>\n`;
                hasParse.push(tempStr);
                readerIndex += 2;
                continue;
            }

            tempStr = this.parser.inlineParse();


            tempStr = `<p>${tempStr}</p>`;

            hasParse.push(tempStr);

            readerIndex++;
        }
        console.log(hasParse);
        var test = "";
        for (var x = 0; x < hasParse.length; x++) {
            test += hasParse[x];
        }
        document.getElementById("text").innerHTML = test;
    }

    /*获取文本，文本按html格式解析*/
    public getHtml() {
        this.runParser();


    }

    /*获取文本，文本按字符串解析，特殊符号将被转义*/
    public getText() {

    }

    /**
     * 获取一行文本
     * @param lineNum
     * @returns {string}
     */
    public getLineText(lineNum: number): string {
        this.oneLineText = this.getLines()[lineNum];
        return this.oneLineText;
    }

    public getLines(): Array<string> {
        this.lines = this.reader.split("\n");
        return this.lines;
    }

}

class Parser {
    line: string;
    heading = /^(#{1,6}\s*)/;
    hr = /^(\*{3,}|-{3,})/;
    blockQuote = /^(\>\s+)/;
    unorderedList = /^((\*|-){1}\s+)/;
    orderedList = /^(\d{1}.\s+)/;
    codeBlock = /^(```)/;
    link = /\[(.*?)\]\((.*?)\)/g;
    image = /\!\[(.*?)\]\((.*?)\)/g;
    strongText = /\*{2}(.*?)\*{2}/g;
    emText = /\*{1}(.*?)\*{1}/g;
    codeLine = /\`{1}(.*?)\`{1}/g;



    constructor(line: string) {
        this.line = line;
    }

    protected isLastLine(): boolean {
        return;
    }

    /**
     * 判断空行
     * @returns {boolean}
     */
    public isEmptyLine(): boolean {
        return this.line == "";
    }

    public isHeading(): boolean {
        return this.heading.test(this.line);
    }

    public isUnorderedList(): boolean {
        return this.unorderedList.test(this.line);
    }

    public isOrderedList(): boolean {
        return this.orderedList.test(this.line);
    }

    public isHr(): boolean {
        return this.hr.test(this.line);
    }

    public isBlockQuote(): boolean {
        return this.blockQuote.test(this.line);
    }

    public isCodeBlock(): boolean {
        return this.codeBlock.test(this.line);
    }

    private isImage(): boolean {
        return this.image.test(this.line);
    }

    private parseImage(str: string): string {
        return str.replace(this.image, function(result, str1, str2) {
            return `<img src="${str2}" alt="${str1}">`;
        });
    }

    private isLink(): boolean {
        return this.link.test(this.line);
    }

    private parseLink(str: string): string {
        return str.replace(this.link, function(result, str1, str2) {
            return `<a href="${str2}">${str1}</a>`;
        });
    }

    private isStrongText(): boolean {
        return this.strongText.test(this.line);
    }

    private parseStrongText(str: string): string {
        return str.replace(this.strongText, function(result, str1) {
            return `<b>${str1}</b>`;
        });
    }

    private isEmText(): boolean {
        return this.emText.test(this.line);
    }

    private parseEmText(str: string): string {
        return str.replace(this.emText, function(result, str1) {
            return `<em>${str1}</em>`;
        });
    }

    private isCodeLine(): boolean {
        return this.codeLine.test(this.line);
    }

    private parseCodeLine(str: string): string {
        return str.replace(this.codeLine, function(result, str1) {
            return `<code>${str1}</code>`;
        });
    }



    public inlineParse(str: string = this.line): string {
        //代码行
        if(this.isCodeLine()) {
            str = this.parseCodeLine(str);
        }
        //图片
        if(this.isImage()) {
            str = this.parseImage(str);
        }
        //超链接
        if(this.isLink()) {
            str = this.parseLink(str);
        }
        //粗体
        if(this.isStrongText()) {
            str = this.parseStrongText(str);
        }
        //斜体
        if(this.isEmText()) {
            str = this.parseEmText(str);
        }

        return str;
    }


}

