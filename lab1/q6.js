const fs=require("fs");

// CREATE A READABLE STREAM FOR SMOOTH PIPING(FLOW) BETWEEN BOTH THE FLOW.(OTHER IS writeStream)

const readableStream=fs.createReadStream("input.txt");
const writeableStream=fs.createWriteStream("outputpipe.txt");


// PIPE readable stream into writeable stream.
readableStream.pipe(writeableStream);


// LOG SUCCESS WHEN THE DATA IS SUCESSFULLY WRITTEN.
writeableStream.on("finish", ()=> {
    console.log("DATA PIPED SUCCESSFULLY FROM READABLE STREAM TO WRITEABLE STREAM.");
});
readableStream.on("error", ()=> {
    console.error("ERROR:\n",err.message);
});
writeableStream.on("error", ()=> {
    console.error("ERROR IN WRITING THE FILES.");
});

