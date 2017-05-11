window.onload = function () {
    var markdown = new Reader("mark");
    console.log(markdown.getHtml());
    markdown.showHtml("preview");
    document.getElementById("mark").addEventListener("keyup", function (evt) {
        var e = evt || window.event;
        if (1) {
            var markdown_1 = new Reader("mark");
            markdown_1.showHtml("preview");
        }
    });
};
