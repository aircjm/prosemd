const express = require('express');

const { Schema } = require("prosemirror-model");
const { defaultMarkdownParser } = require("prosemirror-markdown");


const bodyParser = require('body-parser')
 
const app = express()
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = 8095;

// 创建一个路径为/api/md2json的接口
app.get('/api/md2json', (req, res) => {
  // 在这里编写你的逻辑代码
  res.send('Hello, /api/md2json!');
});



app.post("/api/md", (req, res) => {
  let {md} = req.body;
  console.log(md)
  // 将Markdown转换为JSON结构
  const schema = new Schema({ nodes: defaultMarkdownParser.schema.nodes });
  const doc = defaultMarkdownParser.parse(md, { schema });
  const jsonOutput = doc.toJSON();
  
  // 返回JSON结构数据
  res.json(jsonOutput);
});


// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


