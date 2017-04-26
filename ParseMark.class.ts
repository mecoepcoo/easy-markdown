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
        this.reader =  document.getElementById(id).innerHTML;
        this.lines = this.getLines();
        // this.parser = new Parser(this.getLineText(10));
    }

    private testLines(index) {
        return index < this.lines.length;
    }

    private runParser() {
        let readerIndex = 0;
        while (this.testLines(readerIndex)) {
            //获取行文本
            this.parser = new Parser(this.getLineText(readerIndex));
            if(!this.parser.isEmptyLine()){
                console.log(this.parser.line);
            } else {
                console.log("space");
            }




            readerIndex++;

        }
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

    constructor(line: string) {
        this.line = line;
    }

    protected isLastLine(): boolean {

    }

    public isEmptyLine(): boolean {
        return this.line == "";
    }

    public isHeading(): boolean {

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