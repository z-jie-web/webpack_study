if (typeof window === "undefined") {
  global.window = {};
  global.self = {};
}

const express = require("express");
const fs = require("fs");
const path = require("path");
const { renderToString } = require("react-dom/server");
const SSR = require("../dist/search-serve");
// 设置端口

const data=require("./data.json")

const template=fs.readFileSync(path.join(__dirname,'../dist/search.html'),'utf8');

const server = (port) => {
  const app = express();
  // 设置静态目录
  app.use(express.static("dist"));
  // 设置路由
  app.get("/search", (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });
  app.listen(port, () => {
    console.log("server listening on port" , port);
  });
};

server(process.env.PORT || 3000);


const renderMarkup = (str) => {
  const dataStr=JSON.stringify(data)
  return template.replace('<!--HTML_REPLACE-->',str).replace('<!--DATA-->',`<script>window.__initial_data=${dataStr}</script>`);
};
