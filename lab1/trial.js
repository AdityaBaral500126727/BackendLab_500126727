const fs= require("fs");

const writeableStream= fs.createWriteStream("newWritten.txt");

const data="hello from the server created!!!";

writeableStream.write(data,function(err)
{
    if(err)
    {
        console.error("the following is the error:",err.message);
    }else{
        console.log("written data succesfully!!!!.")
    }
});
writeableStream.end();