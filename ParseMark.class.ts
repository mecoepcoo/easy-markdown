/**
 * Created by tianzhen on 17-4-23.
 */
class Reader {
    reader: string;
    parser: any;
    templine: string;



    lines: Array<string>;
    oneLineText: string;
    constructor(id: string) {
        //获取全部文本
        this.reader =  document.getElementById(id).innerHTML;

        this.lines = this.getLines();
        // this.parser = new Parser(this.getLineText(10));
    }

    private testLines(index) {
        return index < this.lines.length;
    }

    private runParser() {
        let readerIndex: number = 0;
        let hasParse: Array<string> = [];
        let tempStr = "";
        let tempArr = "";
        while (this.testLines(readerIndex)) {
            //获取行文本
            this.parser = new Parser(this.getLineText(readerIndex));

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

                tempStr = this.parser.line.replace(this.parser.heading,"");

                hasParse.push("<h" + count + ">" + tempStr + "</h" + count + ">");
                readerIndex++;
                continue;
            }





            readerIndex++;

        }
        console.log(hasParse);
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

    public analyse() {

    }


}

class Parser {
    line: string;
    heading = /^(#{1,6}\s*)/;

    constructor(line: string) {
        this.line = line;
    }

    protected isLastLine(): boolean {

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

    }

    public isOrderedList(): boolean {

    }

    public isText(): boolean {

    }

    public isHr(): boolean {

    }

    public isBlockQuote(): boolean {

    }

    public isCodeBlock(): boolean {

    }

    public isImage(): boolean {

    }

    public isLink(): boolean {

    }

    public isStrongText(): boolean {

    }

    public isEmText(): boolean {

    }

    public isCodeLine(): boolean {

    }
}