const Koa = require("koa2");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const HtmlToJsx = require("htmltojsx");

const converter = new HtmlToJsx({
  createClass: false,
});

// parse('<p>Hello, World!</p>'); // React.createElement('p', {}, 'Hello, World!')

// 使用ctx.body解析中间件
app.use(bodyParser());

app.use(async (ctx) => {
  if (ctx.url === "/" && ctx.method === "POST") {
    let postData = ctx.request.body;

    let result = converter.convert(postData.htmlStr);
    console.log({ jsx: result });
    ctx.set("Content-Type", "application/json");
    ctx.body = { jsx: result };
  } else {
    ctx.body = "<h1>404！！！ o(╯□╰)o</h1>";
  }
});

app.listen(3000, () => {
  console.log("[demo] request post is starting at port 3000");
});
