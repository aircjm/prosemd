const express = require('express');

const {Schema} = require("prosemirror-model");
const {defaultMarkdownParser} = require("prosemirror-markdown");
const TurndownService = require('turndown')
const mdit = require('markdown-it')();

const bodyParser = require('body-parser');
const {generateHTML, generateJSON} = require('@tiptap/html');

const { Document } = require("@tiptap/extension-document");
const { Paragraph } = require("@tiptap/extension-paragraph");
const { Image } = require("@tiptap/extension-image");
const { Text } = require("@tiptap/extension-text");
const { Bold } = require("@tiptap/extension-bold");
const { Blockquote } = require("@tiptap/extension-blockquote");
const { OrderedList } = require("@tiptap/extension-ordered-list");
const { BulletList } = require("@tiptap/extension-bullet-list");
const { ListItem } = require("@tiptap/extension-list-item");
const { Code } = require("@tiptap/extension-code");
const { CodeBlockLowlight } = require("@tiptap/extension-code-block-lowlight");
const { Dropcursor } = require("@tiptap/extension-dropcursor");
const { Gapcursor } = require("@tiptap/extension-gapcursor");
const { HardBreak } = require("@tiptap/extension-hard-break");
const { Heading } = require("@tiptap/extension-heading");
const { Highlight } = require("@tiptap/extension-highlight");
const { HorizontalRule } = require("@tiptap/extension-horizontal-rule");
const { Italic } = require("@tiptap/extension-italic");
const { Link } = require("@tiptap/extension-link");
const { Placeholder } = require("@tiptap/extension-placeholder");
const { Strike } = require("@tiptap/extension-strike");
const { TaskItem } = require("@tiptap/extension-task-item");
const { TaskList } = require("@tiptap/extension-task-list");
const { Underline } = require("@tiptap/extension-underline");
const { Table } = require("@tiptap/extension-table");
const { TableCell } = require("@tiptap/extension-table-cell");
const { TableRow } = require("@tiptap/extension-table-row");
const { TableHeader } = require("@tiptap/extension-table-header");
// const { Mention } = require("@tiptap/extension-mention");
// const { Typography } = require("@tiptap/extension-typography");
// const { Youtube } = require("@tiptap/extension-youtube");
// const { CharacterCount } = require("@tiptap/extension-character-count");



const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const PORT = 8095;


const extensions = [
    Document,
    Paragraph,
    Text,
    Bold,
    Blockquote,
    OrderedList,
    BulletList,
    ListItem,
    Code,
    Dropcursor,
    Gapcursor,
    HardBreak,
    Heading,
    Highlight,
    HorizontalRule,
    Italic,
    Link,
    Strike,
    TaskItem,
    TaskList,
    Underline,
    Table,
    TableRow,
    TableCell,
    TableHeader,
    Image];

// 创建一个路径为/api/md2json的接口
app.get('/', (req, res) => {
    // 在这里编写你的逻辑代码
    res.send('Hello, /api/md2json!');
});


app.post("/api/md2json", (req, res) => {
    let {md} = req.body;
    console.log(md)
    // 将Markdown转换为JSON结构
    // const schema = new Schema({nodes: defaultMarkdownParser.schema.nodes});
    // const doc = defaultMarkdownParser.parse(md, {schema});

    const htmlStr = mdit.render(md)
    console.log(htmlStr)
    const json = generateJSON(htmlStr, extensions)
    // 返回JSON结构数据
    res.json({
        code: 0,
        msg: "success",
        data: json
    });
});


app.post("/api/json2html/test", (req, res) => {
    let {md} = req.body;
    console.log(md)
    // 将Markdown转换为JSON结构
    // const schema = new Schema({nodes: defaultMarkdownParser.schema.nodes});
    // const doc = defaultMarkdownParser.parse(md, {schema});

    const htmlStr = mdit.render(md)
    console.log(htmlStr)
    const json = generateJSON(htmlStr, extensions)
    console.log(json)
    // 返回JSON结构数据
    res.json({
        code: 0,
        msg: "success",
        data: generateHTML(json, extensions)
    });
});

app.post("/api/json2html", (req, res) => {
    let {jsonStr} = req.body;
    console.log(jsonStr)
    // 返回JSON结构数据
    res.json({
        code: 0,
        msg: "success",
        data: generateHTML(JSON.parse(jsonStr), extensions)
    });
});


app.post("/api/html2md", (req, res) => {
    let {html} = req.body;
    console.log(html)
    const turndownService = new TurndownService();
    // var markdown = turndownService.turndown('<h1>Hello world!</h1>')
    // 返回JSON结构数据
    res.json({
        code: 0,
        msg: "success",
        data: turndownService.turndown(html)
    });
});


// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const context = [{
    "type": "heading",
    "attrs": {
        "level": 2
    },
    "content": [
        {
            "type": "text",
            "text": "信息系统战略规划"
        }
    ]
},
    {
        "type": "paragraph",
        "content": [
            {
                "type": "text",
                "text": "#todo ![[2023-10-16-14-38-39.png]]"
            }
        ]
    },
    {
        "type": "heading",
        "attrs": {
            "level": 2
        },
        "content": [
            {
                "type": "text",
                "text": "客户关系管理CRM"
            }
        ]
    }];

const md = "# 标题\n\n## 次级标题\n\n## 列表\n\n* 无序1\n* 无序2\n* 无序3\n\n有序列表：\n\n1. 有序1\nGithub Flavored markdown\n1. 有序2\n1. 有序3\n\n## 代码块\n\n```javascript\napp.post(\"/api/json2html\", (req, res) => {\n    let {jsonStr} = req.body;\n    console.log(jsonStr)\n    // 返回JSON结构数据\n    res.json({\n        code: 0,\n        msg: \"success\",\n        data: generateHTML(JSON.parse(jsonStr), [StarterKit,Image])\n    });\n});\n```\n## 表格\n\n搜索引擎|链接\n:---:|---\n百度|[百度](https://baidu.com)\n必应|[必应](https://bing.com)\n\n---\n\n分割线\n\n![](kernel_interface.png)"
