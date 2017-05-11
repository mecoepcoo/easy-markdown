window.onload = function () {
    let markdown = new Reader("mark");
    console.log(markdown.getHtml());
    markdown.showHtml("preview");
    document.getElementById("mark").addEventListener("keyup", function() {
        let markdown = new Reader("mark");
        markdown.showHtml("preview");
        console.log(markdown.getHtml());
    })
};
