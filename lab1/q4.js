const fs=require("fs");
const path=require("path");

// IF YOU HARDCORE A PATH STYLE ,IT MIGHT BREAK ON ANOTHER SYSTEM.HENCE USE "path" module provided by Node.js

const filePath=path.join(__dirname,"data.txt");
// "path.join" SAFELY CONSTRUCTS THE CROSS-PLATFORM PATH.

// fs.access checks if the file is accessible.
fs.access(filePath,fs.constants.F_OK, (err)=>{
    if(err){
        console.error("FILE DOESNT EXIST.");
        return; //EXIT IF THE FILE IS MISSING.
    }
})
// CREATING READABLE STREAMS TO READ A FILE IN SMALL CHUNKS.
    const readableStream = fs.createReadStream(filePath, { encoding: "utf8" });

// SETTING UP THE EVENT.
    // .on("event-handeler,parameter for recall")
        readableStream.on("data", (small_data) => {
        console.log('Received data');
        console.log(small_data); // OUTPUT FILE CONTENT.
    });

    //HANDLE THE EVENT.
        readableStream.on("end", () => {
        console.log('FINISHED THE READING OF THE FILE.');
    });

        readableStream.on("error", (error) => {
        console.error('ERROR READING THE FILE', error.message);
    });
