const serverbuild=require("http");
const fs=require("fs");

// USING THE "http.createServer()" WHICH USES THE CALLBACK FUNCTION"(req,res)"

const server=serverbuild.createServer(function(req,res){
    fs.readFile("data.txt","utf8",function(err,data){
        if(err){
            //BASICALLY THIS "writeHead method uses status code i.e 500(something wrong on server),and within braces modify the "Content-Type:" Key on res header stating that the res is having plain text . if html file to be rendered then use "text/html"
            res.writeHead(500,{"Content-Type":"text/plain"});   
            res.end("ERROR READING THE FILE!");
        }else{
            res.writeHead(200,{"Content-Type":"text/plain"});
            res.end(data);
        }
    });
});

server.listen(3002,()=>{
    console.log("Server running at http://localhost:3002/");
})