const express = require("express")

const app = express()



app.get("/",(req,res)=>{
    res.send("Hello Tic WEB App Backend")

})

app.listen(4000,()=>{
    console.log("Server started at port 4000")
})