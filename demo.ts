window.onload = function () {
    let markdown = new Reader("mark");
    console.log(markdown.getHtml());
    markdown.showHtml("preview");
    document.getElementById("mark").addEventListener("keyup", function(evt) {
        let e: any = evt || window.event;
        if (1) {
            let markdown = new Reader("mark");
            markdown.showHtml("preview");
        }
    })
};
