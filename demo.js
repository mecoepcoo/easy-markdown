window.onload = function () {
    var markdown = new Reader("mark");
    // console.dir(markdown);
    markdown.getHtml();
    document.getElementById("test").onclick = function () {
        var markdown = new Reader("mark");
        markdown.getHtml();
    };
};
