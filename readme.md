# easy-markdown

> 极致简单的markdown编辑器，<a href="https://mecoepcoo.github.io/easy-markdown/demo.html" style="color: #ff5858;">查看DEMO</a>

# 安装
如果仅使用easy-markdown的解析功能，只需下载`/dist/easy-markdown.min.js`，否则应该下载dist中的全部文件。

# 使用
easy-markdown基于原生js开发，无需任何依赖，在页面中引入：
```html
<link rel="stylesheet" href="easy-markdown.min.js">
```
使用**默认样式**：
```html
<link rel="stylesheet" href="easy-markdown.min.css">
```
要使用代码高亮，可以配合**highlight.js**使用：
```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/default.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js"></script>
```
highlight.js文档：[https://highlightjs.org/usage/](https://highlightjs.org/usage/)

使用解释器：
```html
<textarea id="mark"></textarea>
<div id="preview"></div>
```
```javascript
window.onload = function () {
    var markdown = new Reader("mark");
    //获取原始文本
    markdown.reader;
    //获取转义后的原始文本
    markdown.readerTransfer;
    //以数组形式获得所有文本
    markdown.getHtml();
    //渲染文本到页面元素
    markdown.showHtml("preview");
    //获取指定行文本(示例为第0行)
    markdown.getLineText(0);
    //获取编辑器分组后的原始文本
    markdown.getLines();
};
```

监听键盘事件实现实时解析：
```javascript
document.getElementById("mark").addEventListener("keyup", function () {
    var markdown = new Reader("mark");
    markdown.showHtml("preview");
});
```

# 效果预览
标题：
# 标题1
## 标题2
### 标题3
#### 标题4
##### 标题5
###### 标题6

分割线：
---

区块引用：
> helloworld

列表：
- 无序列表
- 无序列表
- 无序列表

1. 有序列表
1. 有序列表
1. 有序列表

代码块：
```javascript
var x = "helloworld";
```

```html
<script>
    var x = "helloworld";
</script>
```

其他：

[超链接](https://mecoepcoo.github.io/easy-markdown/demo.html)

**粗体**，*斜体*，`代码行`

图片：
![图片](./lib/demo.jpg)

解析器也支持原生的html语法。

# 许可证
Copyright (c) 2017, Tianzhen(340349237@qq.com). (MIT License).