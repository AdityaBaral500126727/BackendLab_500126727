const fs=require("fs");

// asynchronous programming need a callback function to recall the processing opern.
fs.readFile("data.txt","utf8",(err,data)=>{     
    if(err)
    {
        // ENONT IS NODEJS CODE FOR FILE NOT FOUND.
        // err.code IS ERROR OBJECT PROPERTY.
        console.error(err.code === "ENOENT" ? "Error: File not found!" : "Some other error occurred:", err);
        return;
    }
    console.log("file contents:\n",data);
});
console.log("This line  runs  Before the file is read");