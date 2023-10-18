const express = require('express');

const {Schema} = require("prosemirror-model");
const {defaultMarkdownParser} = require("prosemirror-markdown");
const TurndownService = require('turndown')
const mdit = require('markdown-it')();

const bodyParser = require('body-parser');
const {generateHTML, generateJSON} = require('@tiptap/html');
const {StarterKit} = require('@tiptap/starter-kit');
const {Image} = require('@tiptap/extension-image');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const PORT = 8095;

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
    const json = generateJSON(htmlStr, [StarterKit, Image])
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
    const json = generateJSON(htmlStr, [StarterKit, Image])
    console.log(json)
    // 返回JSON结构数据
    res.json({
        code: 0,
        msg: "success",
        data: generateHTML(json, [StarterKit, Image])
    });
});

app.post("/api/json2html", (req, res) => {
    let {jsonStr} = req.body;
    console.log(jsonStr)
    // 返回JSON结构数据
    res.json({
        code: 0,
        msg: "success",
        data: generateHTML(JSON.parse(jsonStr), [StarterKit, Image])
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
