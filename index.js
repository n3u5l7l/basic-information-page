const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res)=>{
    
    let filePath = path.join(__dirname, "projects", req.url === '/' ? "index.html": req.url);

    let extname = path.extname(filePath);

    let contentType = "text/html";

    switch (extname){
        case ".css":
            contentType="text/css";
            break;
        case ".js":
            contentType="text/javascript";
            break;
    }

  if(contentType === "text/html" && extname === ""){
    filePath += ".html";
  }

  fs.readFile(filePath, (err, content)=>{
    if(err){
        if(err.code=="ENOENT"){
            fs.readFile(path.join(__dirname, "projects", "404.html"),
            (err, content) => {
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end(content, "utf8");
            })
        }else{
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        }
    }else{
        res.writeHead(200, {"Content-Type": contentType});
        res.end(content, "utf8");
    }
  })
});

server.listen(process.env.PORT || 3000, ()=>{
    console.log("Server listening");
})