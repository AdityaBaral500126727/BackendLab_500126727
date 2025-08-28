const fs=require("fs");

//WILL CREATE A NEW TXT FILE WITH WRITABLE STREAM, IF THE NAMED FILE DO EXIST THEN WIL CREATE IT WITH THE SAME NAME.
const writeableStream=fs.createWriteStream("writestream.txt");


// STRING WE WANT TO WRITE.
const data="HELLO,NODE JS!!!!!";

// WRITING THE DATA INTO THE SAID FILE.

writeableStream.write(data,function(err)
{
    if(err){
        console.error("error writing the file",err.message);
    }else{
        console.log("DATA WRITTEN SUCCEFULLY!");
    }
}

);

writeableStream.end();
