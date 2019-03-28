const Vue = require("vue");
const server = require("express")();
// 模版文件
const render = require("vue-server-renderer").createRenderer({
  template: require("fs").readFileSync("./src/demo1/index.ssr.html", "utf-8")
});

server.get("*", (req, res) => {
  // 每个请求都创建一个Vue实例
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  });

  // 上下文
  const context = {
    title: "Hello",
    meta: `<meta charset="utf-8" />`
  };

  // render2String
  render.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end("Internal Server Error");
    }

    // 混合模版返回html
    res.end(html);
  });
});

server.listen(8080);
