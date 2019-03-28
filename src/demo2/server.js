// create Vue
const fs = require("fs");
const path = require("path");
const express = require("express");
const { createBundleRenderer } = require("vue-server-renderer");
const resolve = file => path.resolve(process.cwd(), file);

const server = express();

// 获取serverBundle和clientBundle
const serverBundle = require(resolve("dist/vue-ssr-server-bundle.json"));
const clientManifest = require(resolve("dist/vue-ssr-client-manifest.json"));

// render 模版
const templatePath = path.resolve(__dirname, "template/index.ssr.html");
const template = fs.readFileSync(templatePath, "utf-8");

function createRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      runInNewContext: false
    })
  );
}

const render = createRenderer(serverBundle, {
  clientManifest,
  template
});

// 托管静态文件
server.use("/dist", express.static(resolve("dist")));

const handleError = (res, err) => {
  if (err.url) {
    res.redirect(err.url);
  } else if(err.code === 404) {
    res.status(404).send('404 | Page Not Found');
  } else {
    // Render Error Page or Redirect
    res.status(500).send('500 | Internal Server Error');
    console.error(err.stack);
  }
}

server.get("*", (req, res) => {
  res.setHeader("Content-Type", "text/html");

  const context = {
    url: req.url,
    title: "Hello",
    meta: `<meta charset="utf-8" />`
  };
  // render2String
  render.renderToString(context, (err, html) => {
    if (err) {
      handleError(res, err)
    }

    // 混合模版返回html
    res.end(html);
  });
});

server.listen(8080);
